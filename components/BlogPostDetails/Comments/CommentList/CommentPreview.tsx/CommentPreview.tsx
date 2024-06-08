import { CommentModel } from "@/models/comment.model";
import { getFixedDateAStr } from "@/service/blog.service";

interface Props {
  comment: CommentModel;
}
export default function CommentPreview({ comment }: Props) {
  const { username, content, createdAt, updatedAt } = comment;
  const fixedDate = getFixedDateAStr(createdAt);
  let updatedDate = "";
  if (updatedAt) {
    updatedDate = getFixedDateAStr(updatedAt);
  }
  return (
    <>
      <h3>{username}</h3>
      <p>{content}</p>
      <div>
        <p>Created at: {fixedDate}</p>
        {updatedDate && <p>Updated at: {updatedDate}</p>}
      </div>
    </>
  );
}
