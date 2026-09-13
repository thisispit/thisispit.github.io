# Pitamber AI Chatbot — Free Serverless Proxy

This lightweight serverless edge proxy connects your static portfolio on GitHub Pages to Google Gemini (or Groq) while keeping your API key 100% secret and safe.

## Why use this?
GitHub Pages only hosts static files (`output: 'export'`). You cannot run dynamic server code on GitHub Pages, and putting your `GEMINI_API_KEY` in frontend code allows anyone to steal it. This proxy runs on Cloudflare's free tier (100,000 requests/day for free) to protect your key and stream AI responses back to your site.

---

## 🚀 2-Minute Deployment Guide (Cloudflare Workers)

### 1. Get a Free Gemini API Key
- Go to [Google AI Studio](https://aistudio.google.com/)
- Click **"Get API key"** and create a free key.

### 2. Install Wrangler CLI & Login
Open your terminal and run:
```bash
npm install -g wrangler
wrangler login
```

### 3. Deploy the Worker
From inside the `serverless-proxy` folder:
```bash
cd serverless-proxy

# Store your Gemini API key securely in Cloudflare secrets:
wrangler secret put GEMINI_API_KEY
# (Paste your API key when prompted)

# Deploy to Cloudflare:
wrangler deploy
```

After deployment, Wrangler will print your live worker URL, for example:
`https://pitamber-ai-chat-proxy.<your-subdomain>.workers.dev`

### 4. Connect to Your Portfolio
In the root portfolio directory, add (or create) `.env.local`:
```env
NEXT_PUBLIC_CHAT_PROXY_URL=https://pitamber-ai-chat-proxy.<your-subdomain>.workers.dev
```

If you deploy your portfolio via GitHub Actions, add `NEXT_PUBLIC_CHAT_PROXY_URL` to your **GitHub Repository Secrets / Variables**:
- Go to: **Repository Settings -> Secrets and variables -> Actions -> Variables**
- Add `NEXT_PUBLIC_CHAT_PROXY_URL` with your worker URL.

---

## ⚡ Fallback Behavior
If `NEXT_PUBLIC_CHAT_PROXY_URL` is not set (e.g. during local offline development), the chatbot automatically uses its built-in local knowledge engine to answer questions about projects, skills, contact, and resume!
