import { CommentModel } from "@/models/comment.model";
import CommentList from "./CommentList/CommentList";

interface Props {
  comments: CommentModel[];
}
export default function CommentsIndex({ comments }: Props) {
  return <CommentList comments={comments} />;
}
