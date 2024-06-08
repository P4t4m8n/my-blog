import { UserModel } from "@/models/user.model";
import { Role } from "@prisma/client";
import ProfileUsersPreview from "../ProfileUsersPreview/ProfileUsersPreview";
import { on } from "events";

interface Props {
  users: UserModel[];
  onChangeRole: (role: Role, userId: string) =>void;
  onEditUser: (user: UserModel) => void;
}
export default function ProfileUsersList({
  users,
  onChangeRole,
  onEditUser,
}: Props) {
  return (
    <ul className="  bg-customGray h-profile-minus overflow-auto flex flex-col  rounded">
      <li className=" grid grid-flow-col border-b w-full rounded-t-lg place-items-center p-4">
        <h3>ID</h3>
        <h3>Username</h3>
        <h3>Email</h3>
        <h3>First Name</h3>
        <h3>Last Name</h3>
        <h3>Role</h3>
        <h3>Created At</h3>
        <h3>Updated At</h3>
        <h3>Actions</h3>
      </li>
      {users.map((user) => (
        <li className=" grid grid-flow-col border-b w-full rounded-t-lg place-items-center p-4" key={user.id}>
          <ProfileUsersPreview
            user={user}
            onChangeRole={onChangeRole}
            onEditUser={onEditUser}
          />
        </li>
      ))}
    </ul>
  );
}
