import BlogHomeLayout from "@/components/BlogHomeLayout/BlogHomeLayout";

export default async function Home() {
  return (
    <section className="overflow-auto hide-scrollbar   ">
      <BlogHomeLayout />
    </section>
  );
}
