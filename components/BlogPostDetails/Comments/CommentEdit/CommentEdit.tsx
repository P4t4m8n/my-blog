"use client";

import { CommentModel } from "@/models/comment.model";

interface Props {
  onSaveComment: (content: React.FormEvent<HTMLFormElement>) => void;
  comment?: CommentModel;
}
export default function CommentEdit({ onSaveComment, comment }: Props) {
  return (
    <form onSubmit={onSaveComment} className="flex flex-col gap-2 ">
      <textarea
        className="text-customLight h-40 resize-none rounded-lg p-4 bg-gray-300"
        name="comment"
        value={comment?.content}
        rows={4}
        cols={50}
      ></textarea>
      <button
        className="highlight-theme-background p-2 rounded-lg self-end"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
