import CommentEdit from "@/components/BlogPostDetails/Comments/CommentEdit/CommentEdit";
import CommentPreview from "@/components/BlogPostDetails/Comments/CommentList/CommentPreview.tsx/CommentPreview";
import { CommentModel, CommentSaveModel } from "@/models/comment.model";
import { useState } from "react";

interface Props {
  comment: CommentModel;
  userId: string;
  onSaveComment: (commentToSave: CommentSaveModel) => void;
  onDeleteComment: (commentId: string) => void;
}
export default function ProfileCommentPreview({
  comment,
  userId,
  onSaveComment,
  onDeleteComment,
}: Props) {
  const [isEdit, setIsEdit] = useState(false);

  const saveComment = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const content = ev.currentTarget.value;

    onSaveComment({
      content,
      userId: comment.userId,
      blogPostId: comment.blogPostId,
      id: comment.id,
    });
  };
  return (
    <div>
      {isEdit ? (
        <CommentEdit onSaveComment={saveComment} comment={comment} />
      ) : (
        <CommentPreview comment={comment} loginUserId={userId} />
      )}
      {comment.userId === userId && (
        <div>
          <button className="highlight-theme-background p-2 rounded-lg " onClick={() => setIsEdit(!isEdit)}>Edit</button>
          <button className="highlight-theme-background p-2 rounded-lg " onClick={() => onDeleteComment(comment.id!)}>Delete</button>
        </div>
      )}
    </div>
  );
}
