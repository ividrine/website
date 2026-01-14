import { getPostData } from "@/lib/posts";
import { TableOfContents } from "@/components/ui/table-of-contents";

const BlogPost = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const data = await getPostData(slug);
  return (
    <div className="flex justify-center">
      <main className="w-full max-w-3xl py-12 px-12">
        <h1 className="text-center">{data.title}</h1>
        <p className="text-center text-sm text-muted-foreground">{data.date}</p>
        <article
          className="blog-post"
          dangerouslySetInnerHTML={{ __html: data.contentHtml }}
        />
      </main>
      <aside className="fixed left-[calc(50%+22rem)] top-24 hidden lg:block px-4">
        <TableOfContents items={data.toc} />
      </aside>
    </div>
  );
};

export default BlogPost;
