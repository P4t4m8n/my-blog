import dynamic from "next/dynamic";
const TextEditor = dynamic(
  () => import("../../../../components/TextEditor/Texteditor"),
  {
    ssr: false,
  }
);

import { BlogPostModel } from "@/models/blogPost.model";
import { prisma } from "@/prisma/prismaClient";
import { getBlogById } from "@/service/blog.server";
import { calculateReadingTime, getEmptyBlogPost } from "@/service/blog.service";

export default async function BlogEdit({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const handleGenerateDescription = async (content: string) => {
    try {
      const response = await fetch("/api/generateDescription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      const data = await response.json();
    } catch (error) {
      console.error("Error generating description:", error);
    }
  };
  const onSaveBlogPost = async (blogPost: BlogPostModel) => {
    "use server";

    if (blogPost.id) {
      const savedBlog = await prisma.blogPost.update({
        where: { id: blogPost.id },
        data: {
          title: blogPost.title,
          content: blogPost.content,
          description: blogPost.description,
          bgColor: "#fff",
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
          description: blogPost.description,
          bgColor: "#fff",
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

  const defaultSettings = {
    id: "",
    defParagraphSeparator: "p",
    parentSelector: "body",
    actions: {
      bold: {
        type: "strong",
        icon: "bold",
        format: "inline",
        command: "bold",
      },
      italic: {
        type: "em",
        icon: "italic",
        format: "inline",
        command: "italic",
      },
      underline: {
        type: "u",
        icon: "underline",
        format: "inline",
        command: "underline",
      },
      highlight: {
        type: "mark",
        icon: "highlight",
        format: "inline",
        command: "hiliteColor",
        value: "#ffe066",
      },
      olist: {
        type: "ol",
        icon: "list-ol",
        format: "block",
        command: "insertOrderedList",
      },
      ulist: {
        type: "ul",
        icon: "list-ul",
        format: "block",
        command: "insertUnorderedList",
      },
      link: {
        type: "a",
        icon: "link",
        format: "inline",
        command: "createLink",
      },
    },
    inlineActionKeys: ["bold", "italic", "underline", "link"],
    blockActionKeys: ["olist", "ulist"],
  };
  return (
    <section className=" min-h-screen-minus-sticky">
      <TextEditor/>
    </section>
  );
}
