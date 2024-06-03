import BlogHomeLayout from "@/components/BlogHomeLayout/BlogHomeLayout";
import BlogHomeSkeleton from "@/components/Skeletons/BlogHomeSkeleton/BlogHomeSkeleton";
import { delay } from "@/service/util.service";
import { Suspense } from "react";

export default async function Home() {
  await delay(1000);
  return (
    <section className="max-h-screen-minus-sticky overflow-auto hide-scrollbar ">
      {/* <BlogHomeSkeleton/> */}
      <BlogHomeLayout />
    </section>
  );
}
