export interface SmallBlogPostModel {
  id?: string;
  title: string;
  description: string;
  readTime: number;
  mainTag: string;
  createdAt: Date;
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
}

export interface BlogPostModel extends SmallBlogPostModel {
  content: string;
  imgs: string[];
  published: boolean;
  updatedAt?: Date | null;
  tags: string[];
}

export interface BlogPostDTO {
  tags: {
    name: string;
  }[];
  id: string;
  title: string;
  content: string;
  description: string;
  published: boolean;
  imgs: string[];
  readTime: number;
  bgColor: string;
  mainTag: string;
  createdAt: Date;
  updatedAt: Date | null;
}
