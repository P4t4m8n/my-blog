import { Role } from "@prisma/client";
import { CommentModel, commentDTO } from "./comment.model";

export interface MinimumBlogPostModel {
  id?: string;
  title: string;
  published: boolean;
  mainTag: string;
  createdAt: Date;
  updatedAt?: Date | null;
  accessibleBy?: Role;
}

export interface SmallBlogPostModel extends MinimumBlogPostModel {
  description: string;
  readTime: number;
  img?: string;
}
export interface SmallBlogPostDTO {
  id?: string;
  title: string;
  description: string;
  readTime: number;
  mainTag: string;
  createdAt: Date;
  imgs: string[];
  published: boolean;

}

export interface BlogPostModel extends SmallBlogPostModel {
  content: string;
  imgs: string[];
  updatedAt?: Date | null;
  tags: string[];
  comments?: CommentModel[];
}

export interface BlogPostDTO {
  id: string;
  title: string;
  content: string;
  description: string;
  published: boolean;
  imgs: string[];
  readTime: number;
  accessibleBy: Role;
  mainTag: string;
  createdAt: Date;
  updatedAt: Date | null;
  tags: {
    name: string;
  }[];
  comments: commentDTO[];
}
