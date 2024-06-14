import ProfileUsers from "@/components/Profile/ProfileUsers/ProfileUsers";
import { getUsers } from "@/server/user.server";

export default async function users() {
  const users = await getUsers();

  return <ProfileUsers users={users} />;
}
