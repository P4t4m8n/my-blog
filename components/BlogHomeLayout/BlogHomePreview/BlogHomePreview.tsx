import LikeButton from "@/components/Buttons/LikeButton";
import { SmallBlogPostModel } from "@/models/blogPost.model";
import { getFixedDateAStr, isHebrew } from "@/service/blog.service";
import { getBlurDataURL } from "@/service/images.service";
import Image from "next/image";

interface Props {
  blogPost: SmallBlogPostModel;
  isFirst: boolean;
}
export default function BlogHomePreview({ blogPost, isFirst }: Props) {
  const { title, description, img, readTime, createdAt, mainTag, id } =
    blogPost;
  const placeholder = getBlurDataURL(
    img ||
      "https://res.cloudinary.com/dpnevk8db/image/upload/v1716540633/samples/bearbnb/inside-weather-Uxqlfigh6oE-unsplash_lunru1.jpg"
  );
  const date = getFixedDateAStr(createdAt);
  const directionClass = isHebrew(title)
    ? "text-right direction-rtl"
    : "text-left direction-ltr";
  return (
    <>
      <Image
        className="rounded-2xl shadow-md hover:bac "
        src={img || "/images/placeholder.jpg"}
        alt={title}
        fill
        placeholder="blur"
        blurDataURL={placeholder}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <LikeButton blogId={id!} />
      <div className="   p-2 absolute -bottom-6 left-0 w-full ">
        {isFirst && (
          <div className=" background-theme relative card-curve-before p-4 w-fit rounded-t-2xl">
            <h3 className=" w-fit p-1 px-2 rounded-3xl text-center">
              LATEST
            </h3>
          </div>
        )}
        <div
          className={` grid gap-1 min-w-[90%] p-2 rounded-e-2xl  background-theme  ${directionClass} ${
            !isFirst ? "rounded-t-2xl" : ""
          } `}
        >
          <h3 className="font-bold text-2xl z-10 background-theme  ">{title}</h3>
          <p className=" font-semibold z-10 background-theme truncate-multiline  ">{description}</p>
        </div>
        <div className=" w-[80%] font-medium card-curve-after justify-evenly background-theme relative p-4 flex items-center  rounded-b-2xl mobile:flex-col mobile:items-start">
          <h4 className="  300 rounded-2xl min-w-fit  ">
            {mainTag}
          </h4>
          <h4>{date}</h4>
          <h4>{readTime + " min read"} </h4>
        </div>
        ֱ
      </div>
    </>
  );
}
