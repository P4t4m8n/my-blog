import { getLikesByUserId } from "@/server/like.server";
import { cookies } from "next/headers";

export default async function savedPosts() {
  const cookieStore = cookies();
  const user = cookieStore.get("user");
  if(!user) throw new Error("User not found in cookies");
  const likes = await getLikesByUserId('');

  return <div>savedPosts</div>;
}
