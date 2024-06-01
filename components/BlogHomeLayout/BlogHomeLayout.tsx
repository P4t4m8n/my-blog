import BlogHomeList from "./BlogHomeList/BlogHomeList";
import { getBlogPosts } from "@/service/blog.server";
export default async function BlogHomeLayout() {
  const blogs = await getBlogPosts({ orderBy: "desc" });

  return (
    <section className="hide-scrollbar">
      <BlogHomeList blogPosts={blogs} />
    </section>
  );
}
