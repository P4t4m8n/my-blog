"use client";
import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../../store/auth.store";
import { updateLike } from "@/server/like.server";
import LikeSVG from "../svgs/LikeSVG";

interface Props {
  blogId: string;
}

export default function LikeButton({ blogId }: Props) {
  const [isLiked, setIsLiked] = useState(false);
  const likeIdRef = useRef<string>("");

  const user = useAuthStore.getState().user;

  useEffect(() => {
    onGetLike();
  });

  const onGetLike = async () => {
    if (!user?.likes?.length) return;
    const idx = user.likes.findIndex((like) => like.blogPostId === blogId);
    if (idx < 0) return;
    likeIdRef.current = user.likes[idx].id;
    setIsLiked(true);
  };

  const onLike = async (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    ev.stopPropagation();
    if (!user) return alert("Please login to like");
    //Optimistic update
    setIsLiked((prev) => !prev);

    try {
      const response = await updateLike(likeIdRef.current, blogId, user.id);
      likeIdRef.current = response?.id || "";
    } catch (error) {
      console.error("error:", error);
    } finally {
      //Make sure to update the state if the like was not successful
      if (!likeIdRef.current && isLiked) setIsLiked(false);
      if (likeIdRef.current && !isLiked) setIsLiked(true);
    }
  };

  return (
    <button
      className="w-8 h-8 p-1 absolute bg-text stroke-[40] shadow-md border rounded-full  right-4"
      onClick={onLike}
    >
      <LikeSVG isLiked={isLiked} />
    </button>
  );
}
