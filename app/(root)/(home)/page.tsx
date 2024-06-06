import BlogHomeLayout from "@/components/BlogHomeLayout/BlogHomeLayout";

export default async function Home() {
  return (
    <section className="max-h-screen-minus-sticky overflow-auto hide-scrollbar  ">
      <BlogHomeLayout />
    </section>
  );
}
