import { getBlogById } from "@/service/blog.server";

interface Props {
  params: { id: string };
}

export default async function BlogDetails({ params }: Props) {
  const { id } = params;
  const blogPost = await getBlogById(id);
  return <section></section>;
}
