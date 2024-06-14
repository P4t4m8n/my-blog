import Image from "next/image";
import SocialMediaSVGS from "../svgs/SocialMediaSVGS";
import BackButton from "../Buttons/BackButton";
import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";
import { getBlogById } from "@/server/blog.server";
import parse from "html-react-parser";
import { isHebrew } from "@/service/blog.service";
import CommentList from "./Comments/CommentList/CommentList";
import { saveComment } from "@/server/comment.server";
import { CommentModel } from "@/models/comment.model";
import { LanguageType } from "@/models/dictionary.model";
import { getDictionary } from "@/app/[lang]/dictionaries";

interface Props {
  blogPostId: string;
  lang: LanguageType;
}

export default async function BlogPostDetails({ blogPostId, lang }: Props) {
  const blogPost = await getBlogById(blogPostId);
  const dict = await getDictionary(lang);

  const {
    title,
    content,
    tags,
    description,
    imgs,
    readTime,
    createdAt,
    updatedAt,
    comments,
  } = blogPost;

  const window = new JSDOM("").window;
  const purify = DOMPurify(window);
  const sanitizedContent = purify.sanitize(content);

  const saveCommentServer = async (
    content: string,
    userId: string
  ): Promise<CommentModel> => {
    "use server";
    const comment = {
      content,
      userId,
      blogPostId,
    };
    const updatedComment = await saveComment(comment);
    return updatedComment;
  };

  const titleClass = isHebrew(dict.article.create_At)
    ? "text-right direction-rtl"
    : "text-left direction-ltr";

  return (
    <section
      className={
        "grid grid-cols-custom-lg grid-rows-custom-lg mobile:grid-cols-custom-sm details_breakpoint:grid-cols-custom-md  details_breakpoint:grid-rows-custom-md gap-x-4 gap-y-8 mobile:pt-4 rounded-lg font-bitter  " +
        titleClass
      }
    >
      <header className="  grid-area-details-header-lg details_breakpoint:grid-area-details-header-md">
        <div className="flex items-center">
          <BackButton />
          <h1 className="text-4xl font-bold">{title}</h1>
        </div>
        <div className="mt-[5%] flex items-center mobile:flex-col">
          <Image
            className="relative aspect-square rounded-3xl mr-16"
            src={imgs[0]}
            alt={title}
            width={128}
            height={128}
          />
          <h2 className={`text-3xl text-customTeal mobile:px-2 ${titleClass}`}>
            {description}
          </h2>
        </div>
      </header>

      <div className=" grid-area-details-info-lg details_breakpoint:grid-area-details-info-md details_breakpoint:flex  details_breakpoint:flex-wrap  relative">
        <div className="background-theme-1 sticky top-[27%] px-12 py-4 rounded-lg h-[13rem] font-light details_breakpoint:w-[50%]">
          <h3 className="text-xl font-light relative border-longer">
            {dict.article.details}
          </h3>
          <div>
            <span className="text-xs">{dict.article.create_At}</span>
            <h3 className="font-medium">{createdAt.toLocaleDateString()}</h3>
          </div>
          {updatedAt && (
            <div>
              <span className="text-xs">{dict.article.update_At}</span>
              <h3 className="font-medium">{updatedAt.toLocaleDateString()}</h3>
            </div>
          )}
          <div>
            <span className="text-xs">{dict.article.read_Time}</span>
            <h3 className="font-medium">
              {readTime} {dict.article.minutes}
            </h3>
          </div>
        </div>
        <div className="background-theme-2 flex flex-col sticky top-[58%] h-[13rem]  px-12 py-4 rounded-lg font-light details_breakpoint:w-[50%] mobile:flex mobile:flex-col mobile:items-center">
          <h3 className="text-xl font-light relative border-longer mb-1">
            {dict.article.share}
          </h3>
          <div>
            <button className="flex my-2  gap-4">
              <SocialMediaSVGS type="facebook" />
              <span className="">Facebook</span>
            </button>
            <button className="flex my-2 gap-4">
              <SocialMediaSVGS type="twitter" />
              <span>Twitter</span>
            </button>
            <button className="flex my-2 gap-4">
              <SocialMediaSVGS type="linkedin" />
              <span>Linkedin</span>
            </button>
            <button className="flex my-2 gap-4">
              <SocialMediaSVGS type="whatsapp" />
              <span>Whatsapp</span>
            </button>
          </div>
        </div>
      </div>
      <div className=" grid-area-details-content-lg details_breakpoint:grid-area-details-content-md flex flex-col gap-2">
        <article className="px-2">{parse(sanitizedContent)}</article>
        <h1 className="text-4xl my-8 text-customCardBgYellow mobile:text-center">
          {dict.article.thanks}
        </h1>
      </div>
      <div className=" grid-area-details-tags-lg details_breakpoint:grid-area-details-tags-md">
        <h3 className="text-4xl mt-8 mobile:text-center">Tags</h3>
        <ul className="mt-8 flex gap-4 flex-wrap mobile:justify-center">
          {tags.map((tag) => (
            <li
              className="highlight-theme-background text-xl font-medium p-4 rounded-lg"
              key={tag}
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <CommentList
        saveCommentServer={saveCommentServer}
        comments={comments || []}
      />
    </section>
  );
}
