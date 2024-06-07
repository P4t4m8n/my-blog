export interface CommentModel {
  id?: string;
  userId: string;
  blogPostId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
