import fs from "fs";
import path from "path";
import matter from "gray-matter";

const notesDirectory = path.join(process.cwd(), "content");

export function getNoteSlugs() {
  return fs
    .readdirSync(notesDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getNote(slug: string) {
  const fullPath = path.join(notesDirectory, `${slug}.mdx`);

  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: data,
    content,
  };
}
