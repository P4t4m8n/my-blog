import { getCommentsByUserId } from "@/server/comment.server";
import { cookies } from "next/headers";

export default async function comments() {
  const cookieStore = cookies()

  const comments = await getCommentsByUserId("userId");
  
  return (
    <div>comments</div>
  )
}
