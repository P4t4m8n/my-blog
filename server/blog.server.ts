"use server";

import {
  BlogPostModel,
  MinimumBlogPostModel,
  SmallBlogPostModel,
} from "@/models/blogPost.model";
import {
  calculateReadingTime,
  convertBlogPostDTOsToModels,
  convertSmallBlogPostDTOsToSmallModels,
} from "../service/blog.service";
import { FilterSortBy } from "@/models/filterSortBy";
import { prisma } from "@/prisma/prismaClient";

export const getBlogById = async (id: string): Promise<BlogPostModel> => {
  try {
    const dbBlogPost = await prisma.blogPost.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        tags: {
          select: {
            name: true,
          },
        },
        comments: {
          include: {
            user: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });

    const blog = convertBlogPostDTOsToModels([dbBlogPost])[0];
    return blog;
  } catch (error) {
    throw new Error(`Error fetching blog post: ${error}`);
  } finally {
    prisma.$disconnect();
  }
};

export const getSmallBlogPosts = async (
  criteria: FilterSortBy
): Promise<SmallBlogPostModel[]> => {
  const { orderBy } = criteria;
  try {
    const dbBlogPosts = await prisma.blogPost.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        readTime: true,
        mainTag: true,
        createdAt: true,
        imgs: true,
        published: true,
      },
      orderBy: {
        createdAt: orderBy || "desc",
      },
      take: criteria.take || 10,
    });

    const blogs = convertSmallBlogPostDTOsToSmallModels(dbBlogPosts);
    return blogs;
  } catch (error) {
    console.error(error);
    throw new Error(`Error fetching blog posts: ${error}`);
  } finally {
    prisma.$disconnect();
  }
};

export const getMinimumBlogPosts = async (
  criteria: FilterSortBy
): Promise<MinimumBlogPostModel[]> => {
  try {
    const blogs = await prisma.blogPost.findMany({
      select: {
        id: true,
        title: true,
        mainTag: true,
        accessibleBy: true,
        createdAt: true,
        updatedAt: true,
        published: true,
      },
      orderBy: {
        createdAt: criteria.orderBy || "desc",
      },
      take: criteria.take || 99999,
    });

    return blogs;
  } catch (error) {
    console.error(error);
    throw new Error(`Error fetching blog posts: ${error}`);
  } finally {
    prisma.$disconnect();
  }
};

export const updateBlogStatus = async (
  blogPostId: string,
  updateData: { [key: string]: any }
): Promise<MinimumBlogPostModel> => {
  try {
    const blogPost = await prisma.blogPost.update({
      where: { id: blogPostId },
      data: updateData,
      select: {
        id: true,
        title: true,
        mainTag: true,
        accessibleBy: true,
        createdAt: true,
        updatedAt: true,
        published: true,
      },
    });
    return blogPost;
  } catch (error) {
    throw new Error(`Error updating blog post: ${error}`);
  } finally {
    prisma.$disconnect();
  }
};

export const saveBlog = async (
  blogPost: BlogPostModel
): Promise<BlogPostModel> => {
  if (blogPost.id) {
    return await updateBlogPost(blogPost);
  }
  return await createBlogPost(blogPost);
};

export const deleteBlog = async (id: string): Promise<void> => {
  try {
    await prisma.blogPost.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    throw new Error(`Error deleting blog post: ${error}`);
  } finally {
    prisma.$disconnect();
  }
};

const createBlogPost = async (blogPost: BlogPostModel) => {
  const { description } = await handleGenerateDescription(blogPost.content);
  const blogData = await prisma.blogPost.create({
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
    include: {
      tags: {
        select: {
          name: true,
        },
      },
      comments: {
        include: {
          user: {
            select: {
              username: true,
            },
          },
        },
      },
    },
  });
  const savedBlog = convertBlogPostDTOsToModels([blogData])[0];
  return savedBlog;
};

const updateBlogPost = async (blogPost: BlogPostModel) => {
  const blogData = await prisma.blogPost.update({
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
    include: {
      tags: {
        select: {
          name: true,
        },
      },
      comments: {
        include: {
          user: {
            select: {
              username: true,
            },
          },
        },
      },
    },
  });
  const savedBlog = convertBlogPostDTOsToModels([blogData])[0];
  return savedBlog;
};

const handleGenerateDescription = async (content: string) => {
  "use server";
  try {
    const response = await fetch(
      "http://localhost:3000/api/generateDescription",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error generating description:", error);
  }
};
