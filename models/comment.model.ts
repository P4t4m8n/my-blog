export interface CommentModel {
  id?: string;
  content: string;
  username: string;
  userId: string;
  blogPostId: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface commentDTO {
  user: {
    username: string;
  };
  id: string;
  content: string;
  userId: string;
  blogPostId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommentSaveModel {
  id?: string;
  content: string;
  userId: string;
  blogPostId: string;
}
