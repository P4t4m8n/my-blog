import BlogHomeLayout from "@/components/BlogHomeLayout/BlogHomeLayout";
import { Suspense } from "react";

export default async function Home() {
  return (
    <section className="max-h-screen-minus-sticky overflow-auto hide-scrollbar ">
      <Suspense fallback={<div>Loading...</div>}>
        <BlogHomeLayout />
      </Suspense>
    </section>
  );
}
