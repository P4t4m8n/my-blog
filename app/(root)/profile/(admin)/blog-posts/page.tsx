import ProfileList from "@/components/Profile/ProfileList/ProfileList";
import { prisma } from "@/prisma/prismaClient";
import { getMinimumBlogPosts, getSmallBlogPosts } from "@/server/blog.server";
import { redirect } from "next/navigation";

export default async function blogPosts() {
  const blogs = await getMinimumBlogPosts({ orderBy: "desc", take: 9999 });
  console.log("blogs:", blogs);

  const changeToPublic = async (blogPost: Record<string, any>) => {
    "use server";
    try {
      const updatedBlogPost = prisma.blogPost.update({
        where: {
          id: blogPost.id,
        },
        data: {
          accessibleBy: "PUBLIC",
        },
      });

      return updatedBlogPost;
    } catch (error) {
      throw new Error(`Error updating blog post: ${error}`);
    }
  };

  const changeToPrivate = async (blogPost: Record<string, any>) => {
    "use server";
    try {
      const updatedBlogPost = prisma.blogPost.update({
        where: {
          id: blogPost.id,
        },
        data: {
          accessibleBy: "ADMIN",
        },
      });

      return updatedBlogPost;
    } catch (error) {
      throw new Error(`Error updating blog post: ${error}`);
    }
  };

  const changeToUser = async (blogPost: Record<string, any>) => {
    "use server";
    try {
      const updatedBlogPost = prisma.blogPost.update({
        where: {
          id: blogPost.id,
        },
        data: {
          accessibleBy: "USER",
        },
      });

      return updatedBlogPost;
    } catch (error) {
      throw new Error(`Error updating blog post: ${error}`);
    }
  };

  const deleteBlogPost = async (blogPost: Record<string, any>) => {
    "use server";
    try {
      const deletedBlogPost = prisma.blogPost.delete({
        where: {
          id: blogPost.id,
        },
      });

      return deletedBlogPost;
    } catch (error) {
      throw new Error(`Error deleting blog post: ${error}`);
    }
  };

  const publishBlogPost = async (blogPost: Record<string, any>) => {
    "use server";
    try {
      const publishedBlogPost = prisma.blogPost.update({
        where: {
          id: blogPost.id,
        },
        data: {
          published: true,
        },
      });

      return publishedBlogPost;
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

  return <ProfileList data={blogs} actions={actions} />;
}
