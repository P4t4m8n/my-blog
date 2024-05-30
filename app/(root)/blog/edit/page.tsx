import TextEditor from "@/components/TextEditor/TextEditor";
import { BlogPostModel } from "@/models/blogPost.model";
import { getBlogById } from "@/service/blog.server";
import { getEmptyBlogPost } from "@/service/blog.service";
import React from "react";

export default async function BlogEdit({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const onSaveBlogPost = async (blogPost: BlogPostModel) => {
    "use server";
  };

  let blog;
  const { id } = searchParams;
  if (id) blog = await getBlogById(id);
  else blog = getEmptyBlogPost();
  return (
    <section className=" min-h-screen-minus-sticky">
      <TextEditor saveBlogPost={onSaveBlogPost} blog={blog} />
    </section>
  );
}
