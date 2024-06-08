export interface CommentModel {
  id?: string;
  content: string;
  username: string;
  userId: string;
  blogPostId: string;
  createdAt: Date;
  updatedAt: Date | null;
}
