import { getNote, getNoteSlugs } from "@/lib/articles";
import { MDXRemote } from "next-mdx-remote/rsc";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getNoteSlugs().map((slug) => ({ slug }));
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params;

  const note = getNote(slug);

  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-bold">
        {note.frontmatter.title}
      </h1>

      <p className="mt-3 text-sm text-neutral-500">
        {note.frontmatter.date} · By Pitamber Singh
      </p>

      <article className="prose prose-neutral dark:prose-invert mt-12 max-w-none">
        <MDXRemote source={note.content} />
      </article>
    </main>
  );
}
