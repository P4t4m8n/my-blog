import { BlogPostDTO, BlogPostModel } from "@/models/blogPost.model";

export const getEmptyBlogPost = (): BlogPostModel => {
  return {
    id: "",
    title: "",
    content: "",
    description: "",
    published: false,
    readTime: 0,
    mainTag: "",
    imgs: [],
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

export const blogPostDTOtoModel = (dto: BlogPostDTO[]): BlogPostModel[] => {
  return dto.map((post) => {
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      description: post.description,
      imgs: post.imgs,
      readTime: post.readTime,
      published: post.published,
      mainTag: post.mainTag,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      tags: post.tags.map((tag) => tag.name),
    };
  });
};
