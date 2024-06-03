"use server";

import { BlogPostModel, SmallBlogPostModel } from "@/models/blogPost.model";
import {
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
      },
      orderBy: {
        createdAt: orderBy,
      },
      take: 10,
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
