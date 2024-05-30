import { BlogPostModel } from "@/models/blogPost.model";
export const getEmptyBlogPost = (): BlogPostModel => {
  return {
    id: "",
    title: "",
    content: "",
    published: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: [],
  };
};

export const getTags = (): string[] => {
  return ["personal", "tech", "travel", "food", "music", "other"];
};
