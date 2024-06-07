import ProfileDetails from "@/components/Profile/ProfileDetails/ProfileDetails";
import { getUserById } from "@/server/user.server";
import { cookies } from "next/headers";
export default async function details() {
  const cookieStore = cookies();
  const cookieUserString = cookieStore.get("user");

  if (!cookieUserString || !cookieUserString.value)
    throw new Error("User not found");

  const parsedValue = JSON.parse(cookieUserString.value);
  const { id } = parsedValue.user;
  if (!id) {
    throw new Error("User not found");
  }

  const user = await getUserById(id);

  return <ProfileDetails user={user} />;
}
