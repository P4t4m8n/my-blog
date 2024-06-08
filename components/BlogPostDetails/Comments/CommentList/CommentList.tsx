import { CommentModel } from "@/models/comment.model";
import CommentPreview from "./CommentPreview.tsx/CommentPreview";
import CommentEdit from "../CommentEdit/CommentEdit";

interface Props {
  comments: CommentModel[];
}
export default function CommentList({ comments }: Props) {
  return (
    <ul className="my-12 " >
      <h1 className="text-4xl text-customTeal mt-8">Comments</h1>
      <li className="mt-8 ">
        <CommentEdit />
      </li>
      {comments.map((comment) => (
        <li key={comment.id}>
          <CommentPreview comment={comment} />
        </li>
      ))}
    </ul>
  );
}
