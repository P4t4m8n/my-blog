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

export const calculateReadingTime = (text: string): number => {
  // Average reading speed
  const wordsPerMinute = 225;
  // Split text by whitespace to get word count
  const words = text.split(/\s+/).length;
  // Calculate reading time
  const readingTimeMinutes = words / wordsPerMinute;

  return readingTimeMinutes;
};
