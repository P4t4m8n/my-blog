import BlogHomeLayout from "@/components/BlogHomeLayout/BlogHomeLayout";
import BlogHomeSkeleton from "@/components/Skeletons/BlogHomeSkeleton/BlogHomeSkeleton";
import { Suspense } from "react";

export default async function Home() {
  return (
    <section className="max-h-screen-minus-sticky overflow-auto hide-scrollbar ">
      <Suspense fallback={<BlogHomeSkeleton />}>
        <BlogHomeLayout />
      </Suspense>
    </section>
  );
}
