/**
 * Cloudflare Worker / Serverless Edge Proxy for Pitamber's Portfolio AI Chat
 *
 * Deployment (Free tier Cloudflare Workers):
 * 1. npm install -g wrangler
 * 2. wrangler login
 * 3. wrangler secret put GEMINI_API_KEY
 * 4. wrangler deploy
 */

export interface Env {
  GEMINI_API_KEY: string;
}

const ALLOWED_ORIGINS = [
  "https://pitamber.site",
  "https://thisispit.github.io",
  "http://localhost:3000",
];

function getCorsHeaders(request: Request): HeadersInit {
  const origin = request.headers.get("Origin") || "";
  const isAllowed = ALLOWED_ORIGINS.includes(origin) || origin.endsWith(".pages.dev") || origin.endsWith(".github.io");

  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : "https://pitamber.site",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const corsHeaders = getCorsHeaders(request);

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders, status: 204 });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers: corsHeaders });
    }

    try {
      const { messages, systemPrompt } = await request.json() as {
        messages: Array<{ role: "user" | "assistant" | "system"; content: string }>;
        systemPrompt?: string;
      };

      if (!messages || !Array.isArray(messages)) {
        return new Response(JSON.stringify({ error: "Invalid messages payload" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const apiKey = env.GEMINI_API_KEY;
      if (!apiKey) {
        return new Response(JSON.stringify({ error: "GEMINI_API_KEY not configured on server" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Format messages into Gemini format
      const geminiContents = messages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

      // Call Gemini 3.5 Flash streaming endpoint
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:streamGenerateContent?alt=sse&key=${apiKey}`;

      const geminiResponse = await fetch(geminiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: geminiContents,
          systemInstruction: systemPrompt ? { parts: [{ text: systemPrompt }] } : undefined,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 600,
          },
        }),
      });

      if (!geminiResponse.ok || !geminiResponse.body) {
        const errorText = await geminiResponse.text();
        return new Response(JSON.stringify({ error: "Gemini API error", details: errorText }), {
          status: geminiResponse.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Transform Gemini's SSE stream into plain text stream for the client
      const { readable, writable } = new TransformStream();
      const writer = writable.getWriter();
      const reader = geminiResponse.body.getReader();
      const decoder = new TextDecoder();
      const encoder = new TextEncoder();

      (async () => {
        let buffer = "";
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                try {
                  const json = JSON.parse(line.substring(6));
                  const candidate = json.candidates?.[0];
                  const text = candidate?.content?.parts?.[0]?.text;
                  if (text) {
                    await writer.write(encoder.encode(text));
                  }
                } catch {
                  // Ignore JSON parse errors for incomplete chunks
                }
              }
            }
          }
        } catch (err) {
          console.error("Streaming error:", err);
        } finally {
          await writer.close();
        }
      })();

      return new Response(readable, {
        headers: {
          ...corsHeaders,
          "Content-Type": "text/plain; charset=utf-8",
          "Transfer-Encoding": "chunked",
        },
      });
    } catch (err: unknown) {
      return new Response(JSON.stringify({ error: (err as Error)?.message || "Internal server error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  },
};

export default worker;
