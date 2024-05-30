import TextEditor from "@/components/TextEditor/TextEditor";
import { BlogPostModel } from "@/models/blogPost.model";
import { prisma } from "@/prisma/prismaClient";
import { getBlogById } from "@/service/blog.server";
import { getEmptyBlogPost } from "@/service/blog.service";

export default async function BlogEdit({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const onSaveBlogPost = async (blogPost: BlogPostModel) => {
    "use server";
    const savedBlog = await prisma.blogPost.create({
      data: {
        title: blogPost.title,
        content: blogPost.content,
        published: false,
        tags: {
          connectOrCreate: blogPost.tags.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
    });
    console.log("savedBlog:", savedBlog);
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
