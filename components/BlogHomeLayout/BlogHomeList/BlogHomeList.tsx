import { SmallBlogPostModel } from "@/models/blogPost.model";
import BlogHomePreview from "../BlogHomePreview/BlogHomePreview";
import Link from "next/link";

interface Props {
  blogPosts: SmallBlogPostModel[];
}

export default function BlogHomeList({ blogPosts }: Props) {
  return (
    <ul className="flex flex-wrap overflow-auto  gap-4 font-bitter hide-scrollbar  ">
      {blogPosts.map((blog, idx) => (
        <Link
          href={`/blog/${blog.id}`}
          className="rounded-2xl basis-[25rem] relative min-h-screen-minus-sticky flex-1 p-4 zoom-hover-container mobile:min-h-screen-minus-sticky-mobile mobile:my-4"
          key={blog.id}
        >
          <BlogHomePreview blogPost={blog} isFirst={!idx} />
        </Link>
      ))}
    </ul>
  );
}
