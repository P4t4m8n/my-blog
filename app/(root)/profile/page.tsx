import ProfileDetails from "@/components/Profile/ProfileDetails/ProfileDetails";
import { getUserById } from "@/server/user.server";
import { cookies } from "next/headers";
export default async function details() {


  return <ProfileDetails />;
}
