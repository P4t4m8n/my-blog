import BlogHomeList from "./BlogHomeList/BlogHomeList";
import { getSmallBlogPosts } from "@/service/blog.server";
export default async function BlogHomeLayout() {
  const blogs = await getSmallBlogPosts({ orderBy: "desc" });

  return (
    <section className="hide-scrollbar">
      <BlogHomeList blogPosts={blogs} />
    </section>
  );
}
