import { LikeModel } from "@/models/like.model";
import { getFixedDateAStr } from "@/service/blog.service";

interface Props {
  like: LikeModel;
  onDislike: (likeId: string) => void;
  index: number;
}
export default function ProfileLikePreview({ like, onDislike, index }: Props) {
  const { title, createdAt, id } = like;
  const fixedDate = getFixedDateAStr(createdAt);
  return (
    <>
      <h3>{index + 1}</h3>
      <h3>{title}</h3>
      <h3>{fixedDate}</h3>
      <button
        className="bg-customCardBgOrange text-white px-2 py-1 rounded"
        onClick={() => onDislike(id)}
      >
        Dislike
      </button>
    </>
  );
}
