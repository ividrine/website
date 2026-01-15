import { getPosts } from "@/lib/posts";
import Link from "next/link";
export default function Blog() {
  const posts = getPosts();

  const postsContent = posts?.map((post, index) => (
    <li key={index}>
      <Link href={`/blog/${post.id}`}>{post.title}</Link>
    </li>
  ));

  return (
    <div className="flex items-center justify-center">
      <main className="w-full max-w-3xl py-12 px-12">
        <h1 className="text-center">Blog</h1>
        {postsContent?.length === 0 && (
          <p className="text-center">No blog posts yet :/</p>
        )}
        {postsContent?.length > 0 && (
          <ul className="text-center list-disc list-inside">{postsContent}</ul>
        )}
      </main>
    </div>
  );
}
