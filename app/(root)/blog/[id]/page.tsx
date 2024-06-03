import BlogPostDetails from "@/components/BlogPostDetails/BlogPostDetails";
import BlogDetailsSkeleton from "@/components/Skeletons/BlogDetailsSkeleton/BlogDetailsSkeleton";
import { Suspense } from "react";

interface Props {
  params: { id: string };
}

export default async function BlogDetails({ params }: Props) {
  const { id } = params;
  return (
      <BlogPostDetails BlogPostId={id} />
  );
}
