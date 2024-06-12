import {
  BlogPostDTO,
  BlogPostModel,
  SmallBlogPostDTO,
  SmallBlogPostModel,
} from "@/models/blogPost.model";
import { commentDTOToCommentModel } from "./comment.service";

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
export const convertSmallBlogPostDTOsToSmallModels = (
  dto: SmallBlogPostDTO[]
): SmallBlogPostModel[] => {
  return dto.map((post) => {
    return {
      id: post.id,
      title: post.title,
      description: post.description,
      img: post.imgs[0],
      readTime: post.readTime,
      mainTag: post.mainTag,
      createdAt: post.createdAt,
    };
  });
};
export const convertBlogPostDTOsToModels = (
  dto: BlogPostDTO[]
): BlogPostModel[] => {
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
      comments: post.comments.map((comment) =>
        commentDTOToCommentModel(comment)
      ),
    };
  });
};
export const isHebrew = (text: string): boolean => {
  const hebrewPattern = /[\u0590-\u05FF]/;
  return hebrewPattern.test(text);
};

export const getFixedDateAStr = (date: Date): string => {
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
};
