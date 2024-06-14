
import { getSmallBlogPosts } from "@/server/blog.server";
import BlogHomeList from "@/components/BlogHomeLayout/BlogHomeList/BlogHomeList";
interface Props {
  params: { lang: string };
}
export default async function Home({ params }: Readonly<Props>) {
  const { lang } = params;
  const blogs = await getSmallBlogPosts({ orderBy: "desc" });

  return (
    <section className="hide-scrollbar">
      <BlogHomeList blogPosts={blogs} lang={lang} />
    </section>
  );
}
