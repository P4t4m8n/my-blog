import BlogHomeLayout from "@/components/BlogHomeLayout/BlogHomeLayout";

export default async function Home() {
  return (
    <section className=" px-20  overflow-auto hide-scrollbar  ">
      <BlogHomeLayout />
    </section>
  );
}
