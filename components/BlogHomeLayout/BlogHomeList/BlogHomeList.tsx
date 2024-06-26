import { SmallBlogPostModel } from "@/models/blogPost.model";
import BlogHomePreview from "../BlogHomePreview/BlogHomePreview";
import Link from "next/link";

interface Props {
  blogPosts: SmallBlogPostModel[];
  lang: string;
}

export default function BlogHomeList({ blogPosts, lang }: Props) {
  return (
    <ul className="flex flex-wrap overflow-auto  gap-4 font-bitter hide-scrollbar ">
      {blogPosts.map((blog, idx) => (
        <Link
          href={`/blog/${blog.id}`}
          className="rounded-2xl basis-[20rem] relative min-h-[22rem] flex-1 p-4 zoom-hover-container mobile:min-h-screen-minus-sticky-mobile mobile:my-4"
          key={blog.id}
        >
          <BlogHomePreview blogPost={blog} isFirst={!idx} lang={lang} />
        </Link>
      ))}
    </ul>
  );
}
