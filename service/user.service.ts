import { UserDTO } from "@/models/user.model";
import Cookies from "js-cookie";
import { z } from "zod";


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
  return userData ? JSON.parse(userData) : null;
};

export const signupSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  username: z.string().min(4, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
