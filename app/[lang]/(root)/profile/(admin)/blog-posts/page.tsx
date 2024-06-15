import { getDictionary } from "@/app/[lang]/dictionaries";
import ProfileBlogPosts from "@/components/Profile/ProfileBlogPosts/ProfileBlogPosts";
import { getMinimumBlogPosts } from "@/server/blog.server";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "he" }];
}

interface Props {
  params: { lang: string };
}

export default async function BlogPosts({ params }: Props) {
  const posts = await getMinimumBlogPosts({ orderBy: "desc", take: 9999 });
  const dict = await getDictionary(params.lang);

  return <ProfileBlogPosts posts={posts} dict={dict} />;
}
