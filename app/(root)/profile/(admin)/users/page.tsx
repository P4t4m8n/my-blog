import ProfileList from "@/components/Profile/ProfileList/ProfileList";
import { getUsers } from "@/server/user.server";

export default async function users() {
  const users = await getUsers();
  return <ProfileList data={users} />;
}
