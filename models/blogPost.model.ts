export interface BlogPostModel {
  id?: string;
  title: string;
  content: string;
  description: string;
  imgs: string[];
  readTime: number;
  published: boolean;
  mainTag: string;
  createdAt: Date;
  updatedAt?: Date|null;
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
