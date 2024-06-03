import { SmallBlogPostModel } from "@/models/blogPost.model";
import BlogHomePreview from "../BlogHomePreview/BlogHomePreview";

interface Props {
  blogPosts: SmallBlogPostModel[];
}

export default function BlogHomeList({ blogPosts }: Props) {
  return (
    <ul className="flex flex-wrap overflow-auto text-customDark gap-4 font-bitter hide-scrollbar ">
      {blogPosts.map((blog, idx) => (
        <li
          className="rounded-2xl  basis-[20rem] relative min-h-[23rem]  flex-1 p-4 zoom-hover-container"
          key={blog.id}
        >
          <BlogHomePreview blogPost={blog} isFirst={!idx} />
        </li>
      ))}
    </ul>
  );
}
