import ProfileNav from "@/components/Profile/ProfileNav/ProfileNav";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className=" min-h-screen-minus-sticky font-workSans text-customLight">
      <ProfileNav />
      {children}
    </section>
  );
}
