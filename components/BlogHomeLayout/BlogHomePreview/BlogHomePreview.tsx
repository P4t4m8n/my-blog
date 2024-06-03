import { SmallBlogPostModel } from "@/models/blogPost.model";
import { getBlurDataURL } from "@/service/images.service";
import Image from "next/image";
import Link from "next/link";

interface Props {
  blogPost: SmallBlogPostModel;
  isFirst: boolean;
}
export default function BlogHomePreview({ blogPost, isFirst }: Props) {
  const { title, description, img, readTime, createdAt, mainTag, id } =
    blogPost;
  // const placeholder = getBlurDataURL(img || "");
  return (
    <Link href={`/blog/${id}`}>
      <Image
        className="rounded-2xl shadow-md hover:bac"
        src={img || "/images/placeholder.jpg"}
        alt={title}
       
        fill={true}
      />
      <div className="  p-2 absolute bottom-4 left-0 ">
        {isFirst && (
          <div className="bg-white relative card-curve-before p-4 w-fit rounded-t-2xl">
            <h3 className="bg-black w-fit p-1 px-2 rounded-3xl text-white text-center">
              LATEST
            </h3>
          </div>
        )}
        <div
          className={` grid gap-1   bg-white w-fit p-2 rounded-e-2xl ${
            !isFirst ? "rounded-t-2xl" : ""
          } `}
        >
          <h3 className="font-bold text-2xl z-10  ">{title}</h3>
          <p className=" font-semibold z-10  ">{description}</p>
        </div>
        <div className="bg-white w-[90%] font-medium card-curve-after relative p-4 flex items-center gap-4 rounded-b-2xl">
          <h4 className="  bg-gray-300 rounded-2xl min-w-fit px-4 py-1">
            {mainTag}
          </h4>
          <h4>{createdAt.toDateString()}</h4>
          <h4>{readTime + " min read"} </h4>
        </div>
      </div>
    </Link>
  );
}
