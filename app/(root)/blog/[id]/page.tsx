import BlogPostDetails from "@/components/BlogPostDetails/BlogPostDetails";
import { getBlogById } from "@/service/blog.server";
import { Suspense } from "react";

interface Props {
  params: { id: string };
}

export default async function BlogDetails({ params }: Props) {
  const { id } = params;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogPostDetails BlogPostId={id} />
    </Suspense>
  );
}
