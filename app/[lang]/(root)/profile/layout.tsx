import ProfileNav from "@/components/Profile/ProfileNav/ProfileNav";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section  className="font-workSans grid">
      <ProfileNav />
      {children}
    </section>
  );
}
