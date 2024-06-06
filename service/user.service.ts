import { UserDTO } from "@/models/user.model";
import Cookies from "js-cookie";

export const getEmptyUser = (): UserDTO => {
  return {
    id: "",
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "public",
    createdAt: new Date(),
  };
};

export const getUserDataFromCookies = () => {
  const userData = Cookies.get("user");
  console.log("userData:", userData);
  return userData ? JSON.parse(userData) : null;
};
