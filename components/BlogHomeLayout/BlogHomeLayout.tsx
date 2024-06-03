import { getSmallBlogPosts } from "@/server/blog.server";
import BlogHomeList from "./BlogHomeList/BlogHomeList";
export default async function BlogHomeLayout() {
  const blogs = await getSmallBlogPosts({ orderBy: "desc" });

  return (
    <section className="hide-scrollbar">
      <BlogHomeList blogPosts={blogs} />
    </section>
  );
}
