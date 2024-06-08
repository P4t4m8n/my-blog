import { UserModel } from "@/models/user.model";
import { getFixedDateAStr } from "@/service/blog.service";
import { Role } from "@prisma/client";
import React from "react";

interface Props {
  user: UserModel;
  onChangeRole: (role: Role, userId: string) => void;
  onEditUser: (user: UserModel) => void;
}
export default function ProfileUsersPreview({
  user,
  onChangeRole,
  onEditUser,
}: Props) {
  const {
    id,
    username,
    email,
    firstName,
    lastName,
    role,
    createdAt,
    updatedAt,
  } = user;

  const fixedCreatedAt = getFixedDateAStr(createdAt!);
  const fixedUpdatedAt = getFixedDateAStr(updatedAt || createdAt!);
  return (
    <>
      <h3>{id}</h3>
      <h3>{username}</h3>
      <h3>{email}</h3>
      <h3>{firstName}</h3>
      <h3>{lastName}</h3>
      <h3>{role}</h3>
      <h3>{fixedCreatedAt}</h3>
      <h3>{fixedUpdatedAt}</h3>
      <button onClick={() => onEditUser(user)}>Edit</button>
      <select className="bg-customDark" onChange={(e) => onChangeRole(e.target.value as Role, id!)}>
        <option value={Role.PUBLIC}>Public</option>
        <option value={Role.USER}>User</option>
        <option value={Role.ADMIN}>Admin</option>
      </select>
    </>
  );
}
