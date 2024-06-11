import dynamic from "next/dynamic";
const TextEditor = dynamic(
  () => import("../../../../../components/TextEditor/Texteditor"),
  {
    ssr: false,
  }
);

import { BlogPostModel } from "@/models/blogPost.model";
import { prisma } from "@/prisma/prismaClient";
import { calculateReadingTime, getEmptyBlogPost } from "@/service/blog.service";
import { getBlogById } from "@/server/blog.server";

export default async function BlogEdit({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const handleGenerateDescription = async (content: string) => {
    'use server'
    try {
      const response = await fetch("http://localhost:3000/api/generateDescription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      const data = await response.json();
      return data
    } catch (error) {
      console.error("Error generating description:", error);
    }
  };
  const onSaveBlogPost = async (blogPost: BlogPostModel) => {
    "use server";
    const {description} =   await handleGenerateDescription(blogPost.content)
    if (blogPost.id) {
      const savedBlog = await prisma.blogPost.update({
        where: { id: blogPost.id },
        data: {
          title: blogPost.title,
          content: blogPost.content,
          description: blogPost.description,
          readTime: calculateReadingTime(blogPost.content),
          imgs: blogPost.imgs || [],
          mainTag: blogPost.mainTag,
          tags: {
            connectOrCreate: blogPost.tags.map((tag) => ({
              where: { name: tag },
              create: { name: tag },
            })),
          },
        },
      });
      return savedBlog;
    } else {
      await prisma.blogPost.create({
        data: {
          title: blogPost.title,
          content: blogPost.content,
          description: description,
          readTime: calculateReadingTime(blogPost.content),
          imgs: blogPost.imgs || [],
          mainTag: blogPost.mainTag,

          published: false,
          tags: {
            connectOrCreate: blogPost.tags.map((tag) => ({
              where: { name: tag },
              create: { name: tag },
            })),
          },
        },
      });
    }
  };

  let blog;
  const { id } = searchParams;
  if (id) blog = await getBlogById(id);
  else blog = getEmptyBlogPost();

 
  return (
    <section className=" min-h-screen-minus-sticky">
      <TextEditor blogPost={blog} onSaveBlogPost={onSaveBlogPost} />
    </section>
  );
}