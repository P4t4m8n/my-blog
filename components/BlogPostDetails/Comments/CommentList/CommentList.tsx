"use client";
import { CommentModel } from "@/models/comment.model";
import CommentPreview from "./CommentPreview.tsx/CommentPreview";
import CommentEdit from "../CommentEdit/CommentEdit";
import { useAuthStore } from "@/store/auth.store";
import { useState } from "react";

interface Props {
  comments: CommentModel[];
  saveCommentServer: (content: string, userId: string) => Promise<CommentModel>;
}
export default function CommentList({ comments, saveCommentServer }: Props) {
  const [commentsState, setCommentsState] = useState<CommentModel[]>(comments);
  const { user } = useAuthStore();

  const onSaveComment = async (content: string) => {
    if (!user || !user.id)
      return console.log("You must be logged in to comment");
    const updateComment = await saveCommentServer(content, user.id);

    setCommentsState((prev) => {
      const idx = prev.findIndex((comment) => comment.id === updateComment.id);
      if (idx < 0) return [...prev, updateComment];
      return prev.splice(idx, 1, updateComment);
    });
  };
  return (
    <ul className="my-12 flex flex-col gap-4 ">
      <h1 className="text-4xl mt-8">Comments</h1>
      <li className="mt-8 ">
        <CommentEdit onSaveComment={onSaveComment} />
      </li>
      {commentsState.map((comment) => (
        <li className="border p-4 rounded-lg flex flex-col gap-2" key={comment.id}>
          <CommentPreview comment={comment} loginUserId={user?.id} />
        </li>
      ))}
    </ul>
  );
}
