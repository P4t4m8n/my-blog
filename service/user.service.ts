import { UserModel } from "@/models/user.model";

export const getEmptyUser = (): UserModel => {
  return {
    id: "",
    username: "",
    email: "",
    password: "",
    role: "public",
    createdAt: new Date(),
  };
};
