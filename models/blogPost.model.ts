export interface BlogPostModel {
  id?: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}
