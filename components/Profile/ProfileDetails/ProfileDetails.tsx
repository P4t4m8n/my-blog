"use client";
import { UserModel } from "@/models/user.model";
import { useAuthStore } from "@/store/auth.store";
interface Props {
  user: UserModel;
}
export default function ProfileDetails() {
  const { user } = useAuthStore();

  if (!user) return null;
  const { firstName, lastName, email, username, role } = user;

  return (
    <section className="bg-customDark text-2xl min-h-[90%] my-4 p-4 rounded">
      <div className="flex gap-4">
        <h3>First name:</h3>
        <h3>{firstName}</h3>
      </div>
      <div className="flex gap-4">
        <h3>Last name:</h3>
        <h3>{lastName}</h3>
      </div>
      <div className="flex gap-4">
        <h3>Email:</h3>
        <h3>{email}</h3>
      </div>
      <div className="flex gap-4">
        <h3>User-Name:</h3>
        <h3>{username}</h3>
      </div>
      <div className="flex gap-4">
        <h3>Role:</h3>
        <h3>{role}</h3>
      </div>
    </section>
  );
}
