import { Post, TocItem } from "@/types";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { unified } from "unified";
import remarkRehype from "remark-rehype";
import remarkParse from "remark-parse";
import rehypeStringify from "rehype-stringify";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeRaw from "rehype-raw";
import rehypePrism from "rehype-prism-plus";
import dayjs from "dayjs";
import { visit } from "unist-util-visit";
import type { Element, Root } from "hast";

const postDir = path.join(process.cwd(), "data/posts");

export const getPosts = (): Post[] => {
  if (!fs.existsSync(postDir)) {
    return [];
  }

  return fs
    .readdirSync(postDir)
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postDir, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const matterResult = matter(fileContents);
      return {
        id,
        title: matterResult.data.title,
        date: matterResult.data.date,
        category: matterResult.data.category,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Plugin to extract table of contents
function rehypeExtractToc(toc: TocItem[]) {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (["h2", "h3", "h4"].includes(node.tagName)) {
        const level = parseInt(node.tagName.substring(1));
        const id = node.properties?.id as string;

        // Extract text from all descendant text nodes
        let text = "";
        visit(node, "text", (textNode) => {
          if ("value" in textNode) {
            text += textNode.value;
          }
        });

        if (id && text) {
          toc.push({ id, text, level });
        }
      }
    });
  };
}

export const getPostData = async (id: string) => {
  const fullPath = path.join(postDir, `${id}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  const toc: TocItem[] = [];

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypePrism)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "wrap",
    })
    .use(rehypeExternalLinks, {
      target: "_blank",
      rel: ["noopener", "noreferrer"],
    })
    .use(() => rehypeExtractToc(toc))
    .use(rehypeStringify)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    toc,
    title: matterResult.data.title,
    category: matterResult.data.category,
    date: dayjs(matterResult.data.date).format("MMMM D, YYYY"),
  };
};
