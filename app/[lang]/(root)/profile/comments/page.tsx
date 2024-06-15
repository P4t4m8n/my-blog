import ProfileComments from "@/components/Profile/ProfileComments/ProfileComments";
import { getCommentsBySession } from "@/server/comment.server";

export default async function comments() {
  const comments = (await getCommentsBySession()) || [];

  return <ProfileComments comments={comments} />;
}
