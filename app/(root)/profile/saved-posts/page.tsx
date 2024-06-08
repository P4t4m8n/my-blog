export const dynamic = "force-dynamic";
import ProfileLikes from "@/components/Profile/ProfileLikes/ProfileLikes";
import ProfileList from "@/components/Profile/ProfileList/ProfileList";
import { getLikesBySession, updateLike } from "@/server/like.server";

export default async function savedPosts() {
  const likes = await getLikesBySession();
  if (!likes) return <div>no likes</div>;

  const onDislike = async (like: Record<string, any>): Promise<null> => {
    "use server";
    await updateLike(like.id);
    return null;
  };

  const actions = [
    {
      name: "Dislike",
      handler: onDislike,
    },
  ];

  return <ProfileLikes likes={likes} />;
}
