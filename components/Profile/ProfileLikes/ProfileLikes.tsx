"use client";

import { LikeModel } from "@/models/like.model";
import { useAuthStore } from "@/store/auth.store";
import { useCallback, useEffect, useState } from "react";
import ProfileList from "../ProfileList/ProfileList";
import { updateLike } from "@/server/like.server";
import ProfileLikeList from "./ProfileLikesList/ProfileLikeList";

interface Props {
  likes: LikeModel[];
}
export default function ProfileLikes({ likes }: Props) {
  const [userLikes, setUserLikes] = useState<LikeModel[]>([]);
  const { setUserNoRender } = useAuthStore();
  const user = useAuthStore.getState().user;

  useEffect(() => {
    setUserNoRender({ ...user!, likes });
    setUserLikes(likes);
  }, []);

  const onDislike = useCallback(
    async (likeId: string): Promise<void> => {
      await updateLike(likeId);
      setUserLikes((prev) => prev.filter((_like) => _like.id !== likeId));
      setUserNoRender({ ...user!, likes: userLikes });
    },
    [user, setUserNoRender, userLikes]
  );

  return <ProfileLikeList likes={userLikes} onDislike={onDislike} />;
}
