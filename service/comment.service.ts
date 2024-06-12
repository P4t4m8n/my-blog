import { CommentModel, commentDTO } from "@/models/comment.model";

export const commentDTOToCommentModel = (commentDTO: commentDTO): CommentModel => {
    return {
      id: commentDTO.id,
      content: commentDTO.content,
      createdAt: commentDTO.createdAt,
      updatedAt: commentDTO.updatedAt || null,
      userId: commentDTO.userId,
      username: commentDTO.user.username,
      blogPostId: commentDTO.blogPostId,
    };
  };