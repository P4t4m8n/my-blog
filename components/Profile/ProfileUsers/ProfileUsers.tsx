"use client";
import { UserModel } from "@/models/user.model";
import { updateUser, updateUserRole } from "@/server/user.server";
import { Role } from "@prisma/client";
import { useState } from "react";
import ProfileUsersList from "./ProfileUsersList/ProfileUsersList";

interface Props {
  users: UserModel[];
}
export default function ProfileUsers({ users }: Props) {
  const [stateUsers, setStateUsers] = useState<UserModel[]>(users);

  const onChangeRole = async (role: Role, userId: string) => {
    try {
      const user = await updateUserRole(role, userId);
      setStateUsers((prev) => {
        return prev.map((_user) => (_user.id === userId ? user : _user));
      });
    } catch (error) {}
  };

  const onEditUser = async (user: UserModel) => {
    try {
      const updatedUser = await updateUser(user);
      setStateUsers((prev) => {
        return prev.map((_user) =>
          _user.id === user.id ? updatedUser : _user
        );
      });
    } catch (error) {}
  };
  return (
    <ProfileUsersList
      users={stateUsers}
      onChangeRole={onChangeRole}
      onEditUser={onEditUser}
    />
  );
}
