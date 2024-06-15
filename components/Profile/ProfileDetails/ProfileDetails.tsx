"use client";
import { useAuthStore } from "@/store/auth.store";
import { useState, useCallback, MouseEvent, useEffect } from "react";
import ProfileDetailsInput from "./ProfileDetailsInput/ProfileDetailsInput";
import { updateUser } from "@/server/user.server";

interface UserToEdit {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}
export default function ProfileDetails() {
  const { user } = useAuthStore();
  const [userToEdit, setUserToEdit] = useState<UserToEdit>({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
  });

  useEffect(() => {
    if (user) {
      setUserToEdit({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      });
    }
  }, [user]);

  const onChange = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    setUserToEdit((prevUserToEdit) => ({
      ...prevUserToEdit,
      [ev.target.name]: ev.target.value,
    }));
  }, []);

  const onSubmit = async (ev: MouseEvent) => {
    ev.preventDefault;

    const _user = { ...user, ...userToEdit,role:user!.role};

    try {
      const updatedUser = await updateUser(_user);
    } catch (error) {
      console.error("error:", error);
    }
  };
  const { firstName, lastName, email, username } = userToEdit;
  const inputs = [
    { label: "First name", value: firstName, name: "firstName" },
    { label: "Last name", value: lastName, name: "lastName" },
    { label: "Email", value: email, name: "email" },
    { label: "Username", value: username, name: "username" },
  ];

  return (
    <ul  className=" background-theme text-2xl border mt-4 p-4 rounded flex flex-col place-self-center max-w-fit gap-2 font-workSans">
      {inputs.map((input) => (
        <li  key={input.name} className="flex flex-col gap-4">
          <ProfileDetailsInput
            label={input.label}
            value={input.value||''}
            name={input.name}
            onChange={onChange}
          />
        </li>
      ))}
      <button onClick={onSubmit} className="border rounded p-1 w-fit self-end">
        Save
      </button>
    </ul>
  );
}
