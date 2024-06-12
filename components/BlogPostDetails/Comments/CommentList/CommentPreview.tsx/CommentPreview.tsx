import { CommentModel } from "@/models/comment.model";
import { getFixedDateAStr } from "@/service/blog.service";

interface Props {
  comment: CommentModel;
  loginUserId?: string;
}
export default function CommentPreview({ comment, loginUserId }: Props) {
  const { username, content, createdAt, updatedAt,userId } = comment;
  const fixedDate = getFixedDateAStr(createdAt);
  let updatedDate = null;
  if (
    updatedAt &&
    updatedAt.getMilliseconds() !== createdAt.getMilliseconds()
  ) {
    updatedDate = getFixedDateAStr(updatedAt);
  }
  return (
    <>
      <h3 className=" font-semibold">By: {username}</h3>
      <p className="bg-gray-300 rounded-lg p-4 h-40">{content}</p>
      <div>
        <h3 className=" font-semibold">Created at: {fixedDate}</h3>
        {updatedDate && <p>Updated at: {updatedDate}</p>}
      </div>
      {loginUserId === userId && (
        <button   className="highlight-theme-background p-2 rounded-lg self-end">Edit</button>
      )}
    </>
  );
}
