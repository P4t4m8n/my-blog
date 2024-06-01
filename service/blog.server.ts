"use server";

import { BlogPostModel } from "@/models/blogPost.model";
import { blogPostDTOtoModel, getEmptyBlogPost } from "./blog.service";
import { FilterSortBy } from "@/models/filterSortBy";
import { prisma } from "@/prisma/prismaClient";

export const getBlogById = async (id: string): Promise<BlogPostModel> => {
  return Promise.resolve(getEmptyBlogPost());
};

export const getBlogPosts = async (
  criteria: FilterSortBy
): Promise<BlogPostModel[]> => {
  const { orderBy } = criteria;
  try {
    const dbBlogPosts = await prisma.blogPost.findMany({
      include: {
        tags: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: orderBy,
      },
      take: 10,
    });

    const blogs = blogPostDTOtoModel(dbBlogPosts);
    return blogs;
  } catch (error) {
    console.error(error);
    throw new Error(`Error fetching blog posts: ${error}`);
  } finally {
    prisma.$disconnect();
  }
};
