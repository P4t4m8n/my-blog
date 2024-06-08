import { LikeModel } from "@/models/like.model";
import ProfileLikePreview from "./ProfileLikesPreview/ProfileLikesPreview";

interface Props {
  likes: LikeModel[];
  onDislike: (likeId: string) => Promise<void>;
}
export default function ProfileLikeList({ likes, onDislike }: Props) {
  return (
    <ul className="  bg-customGray h-profile-minus overflow-auto flex flex-col  rounded">
      <li className=" grid grid-flow-col border-b w-full rounded-t-lg place-items-center p-4">
        <h3>Number</h3>
        <h3>Title</h3>
        <h3>Date Liked</h3>
        <h3>Actions</h3>
      </li>
      {likes.map((like, index) => (
        <li className=" grid grid-flow-col border-b hover:bg-customCardBgMaroon w-full rounded place-items-center p-4" key={like.id}>
          <ProfileLikePreview like={like} onDislike={onDislike} index={index} />
        </li>
      ))}
    </ul>
  );
}
