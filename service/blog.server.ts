"use server";

import { BlogPostModel } from "@/models/blogPost.model";
import { getEmptyBlogPost } from "./blog.service";

export const getBlogById = async (id: string): Promise<BlogPostModel> => {
  return Promise.resolve(getEmptyBlogPost());
};
