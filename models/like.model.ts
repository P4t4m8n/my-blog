export interface LikeSmallModel {
  id: string;
  userId: string;
  blogPostId: string;
}

export interface LikeModel extends LikeSmallModel {
  createdAt: Date;
  title: string;
}

export interface LikeDTO {
  blogPost: {
    title: string;
    imgs: string[];
  };
  id: string;
  userId: string;
  blogPostId: string;
  createdAt: Date;
}
