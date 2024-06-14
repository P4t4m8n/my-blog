import ProfileList from "@/components/Profile/ProfileList/ProfileList";
import { prisma } from "@/prisma/prismaClient";
import { getMinimumBlogPosts } from "@/server/blog.server";
import { getFixedDateAStr } from "@/service/blog.service";
import { redirect } from "next/navigation";

export default async function BlogPosts() {
  const blogs = await getMinimumBlogPosts({ orderBy: "desc", take: 9999 });

  const fixedDatesBlogs = blogs.map((blog) => ({
    ...blog,
    createdAt: getFixedDateAStr(blog.createdAt),
    updatedAt: getFixedDateAStr(blog?.updatedAt || blog.createdAt),
  }));

  const changeToPublic = async (blogPost: Record<string, any>) => {
    "use server";
    try {
      const updatedBlogPost = await prisma.blogPost.update({
        where: {
          id: blogPost.id,
        },
        data: {
          accessibleBy: "PUBLIC",
          updatedAt: new Date(),
        },
      });

      const blogPostWithFixedDates = {
        ...updatedBlogPost,
        createdAt: getFixedDateAStr(updatedBlogPost.createdAt),
        updatedAt: getFixedDateAStr(
          updatedBlogPost?.updatedAt || updatedBlogPost.createdAt
        ),
      };

      return blogPostWithFixedDates;
    } catch (error) {
      throw new Error(`Error updating blog post: ${error}`);
    }
  };

  const changeToPrivate = async (blogPost: Record<string, any>) => {
    "use server";
    try {
      const updatedBlogPost = await prisma.blogPost.update({
        where: {
          id: blogPost.id,
        },
        data: {
          accessibleBy: "ADMIN",
          updatedAt: new Date(),
        },
      });

      const blogPostWithFixedDates = {
        ...updatedBlogPost,
        createdAt: getFixedDateAStr(updatedBlogPost.createdAt),
        updatedAt: getFixedDateAStr(
          updatedBlogPost?.updatedAt || updatedBlogPost.createdAt
        ),
      };

      return blogPostWithFixedDates;
    } catch (error) {
      throw new Error(`Error updating blog post: ${error}`);
    }
  };

  const changeToUser = async (blogPost: Record<string, any>) => {
    "use server";
    try {
      const updatedBlogPost = await prisma.blogPost.update({
        where: {
          id: blogPost.id,
        },
        data: {
          accessibleBy: "USER",
          updatedAt: new Date(),
        },
      });

      const blogPostWithFixedDates = {
        ...updatedBlogPost,
        createdAt: getFixedDateAStr(updatedBlogPost.createdAt),
        updatedAt: getFixedDateAStr(
          updatedBlogPost?.updatedAt || updatedBlogPost.createdAt
        ),
      };

      return blogPostWithFixedDates;
    } catch (error) {
      throw new Error(`Error updating blog post: ${error}`);
    }
  };

  const deleteBlogPost = async (
    blogPost: Record<string, any>
  ): Promise<null> => {
    "use server";
    try {
      await prisma.blogPost.delete({
        where: {
          id: blogPost.id,
        },
      });
      return null;
    } catch (error) {
      throw new Error(`Error deleting blog post: ${error}`);
    }
  };

  const publishBlogPost = async (blogPost: Record<string, any>) => {
    "use server";
    try {
      const publishedBlogPost = await prisma.blogPost.update({
        where: {
          id: blogPost.id,
        },
        data: {
          published: true,
          updatedAt: new Date(),
        },
      });

      const blogPostWithFixedDates = {
        ...publishedBlogPost,
        createdAt: getFixedDateAStr(publishedBlogPost.createdAt),
        updatedAt: getFixedDateAStr(
          publishedBlogPost?.updatedAt || publishedBlogPost.createdAt
        ),
      };

      return blogPostWithFixedDates;
    } catch (error) {
      throw new Error(`Error publishing blog post: ${error}`);
    }
  };

  const navigateToEdit = async (blogPost: Record<string, any>) => {
    "use server";
    redirect(`/blog/edit${blogPost.id ? `/${blogPost.id}` : "/new"}`);
  };

  const actions = [
    { name: "Public", handler: changeToPublic },
    { name: "Private", handler: changeToPrivate },
    { name: "User", handler: changeToUser },
    { name: "Delete", handler: deleteBlogPost },
    { name: "Publish", handler: publishBlogPost },
    { name: "Edit", handler: navigateToEdit },
  ];

  return <ProfileList initialData={fixedDatesBlogs} actions={actions} />;
}
