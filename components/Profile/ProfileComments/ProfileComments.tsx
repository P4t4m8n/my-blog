"use client";

import { CommentModel, CommentSaveModel } from "@/models/comment.model";
import { deleteComment, saveComment } from "@/server/comment.server";
import { useAuthStore } from "@/store/auth.store";
import { useCallback, useEffect, useState } from "react";
import ProfileCommentPreview from "./ProfileCommentPreview/ProfileCommentPreview";
interface Props {
  comments: CommentModel[];
}

export default function ProfileComments({ comments }: Props) {
  const [commentsState, setCommentsState] = useState<CommentModel[]>([]);
  const { user } = useAuthStore();
  useEffect(() => {
    if (comments) {
      setCommentsState(comments);
    }
  }, [comments]);

  const onSaveComment = useCallback(async (commentToSave: CommentSaveModel) => {
    if (!user?.id) return console.error("You must be logged in to comment");
    try {
      const updateComment = await saveComment(commentToSave);

      setCommentsState((prev) => {
        const idx = prev.findIndex(
          (comment) => comment.id === updateComment.id
        );
        if (idx < 0) return [...prev, updateComment];
        return prev.splice(idx, 1, updateComment);
      });
    } catch (error) {
      console.error("error:", error);
    }
  }, [user]);

  const onDeleteComment = useCallback(async (commentId: string) => {
    if (!user?.id)
      return console.error("You must be logged in to delete comment");
    try {
      await deleteComment(commentId);
      setCommentsState((prev) => {
        const idx = prev.findIndex((comment) => comment.id === commentId);
        if (idx < 0) return prev;
        return prev.toSpliced(idx, 1);
      });
    } catch (error) {}
  }, [user]);

  return (
    <ul>
      {commentsState.map((comment) => (
        <li key={comment.id}>
          <ProfileCommentPreview
            comment={comment}
            userId={user?.id!}
            onSaveComment={onSaveComment}
            onDeleteComment={onDeleteComment}
          />
        </li>
      ))}
    </ul>
  );
}
