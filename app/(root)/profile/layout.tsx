import ProfileNav from "@/components/Profile/ProfileNav/ProfileNav";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section suppressHydrationWarning className="font-workSans grid text-customLight">
      <ProfileNav />
      {children}
    </section>
  );
}
