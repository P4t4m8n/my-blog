"use server";

import {
  CommentModel,
  CommentSaveModel,
  commentDTO,
} from "@/models/comment.model";
import { prisma } from "@/prisma/prismaClient";

export const getCommentsByUserId = async (
  userId: string
): Promise<CommentModel[]> => {
  try {
    const commentsDTO = await prisma.comments.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    const comments = commentsDTO.map((comment) =>
      _commentDTOToCommentModel(comment)
    );
    return comments;
  } catch (error) {
    throw new Error(`Error in getCommentsByUserId: ${error}`);
  } finally {
    await prisma.$disconnect();
  }
};

export const saveComment = async (
  comment: CommentSaveModel
): Promise<CommentModel> => {
  try {
    if (!comment.id) {
      return await _createComment(comment);
    } else {
      return await _updateComment(comment);
    }
  } catch (error) {
    throw new Error(`Error in saveComment: ${error}`);
  } finally {
    await prisma.$disconnect();
  }
};

//**************** Private function ****************/
const _createComment = async (
  comment: CommentSaveModel
): Promise<CommentModel> => {
  const { content, userId, blogPostId } = comment;
  try {
    const commentDTO = await prisma.comments.create({
      data: {
        content,
        userId,
        blogPostId,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    const comment = _commentDTOToCommentModel(commentDTO);
    return comment;
  } catch (error) {
    throw new Error(`Error in _createComment: ${error}`);
  }
};

const _updateComment = async (
  comment: CommentSaveModel
): Promise<CommentModel> => {
  try {
    const commentDTO = await prisma.comments.update({
      where: {
        id: comment.id,
      },
      data: {
        content: comment.content,
        updatedAt: new Date(),
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    const updatedComment = _commentDTOToCommentModel(commentDTO);
    return updatedComment;
  } catch (error) {
    throw new Error(`Error in _updateComment: ${error}`);
  }
};

const _commentDTOToCommentModel = (commentDTO: commentDTO): CommentModel => {
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
