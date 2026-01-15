import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
};

export default function Blog() {
  return (
    <div className="flex items-center justify-center">
      <main className="w-full max-w-3xl py-12 px-12">
        <h1 className="text-center">Blog</h1>
        <p className="text-center">No blog posts yet :/</p>
      </main>
    </div>
  );
}
