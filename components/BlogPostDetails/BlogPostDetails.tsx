import Image from "next/image";
import SocialMediaSVGS from "../svgs/SocialMediaSVGS";
import BackButton from "../Buttons/BackButton";
import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';
import { getBlogById } from "@/server/blog.server";
import parse from 'html-react-parser';
import { isHebrew } from "@/service/blog.service";

interface Props {
  BlogPostId: string;
}

export default async function BlogPostDetails({ BlogPostId }: Props) {
  const blogPost = await getBlogById(BlogPostId);

  const {
    title,
    content,
    tags,
    description,
    imgs,
    readTime,
    createdAt,
    updatedAt,
  } = blogPost;

  const window = new JSDOM('').window;
  const purify = DOMPurify(window);
  const sanitizedContent = purify.sanitize(content);


  const titleClass = isHebrew(title)
    ? "text-right direction-rtl"
    : "text-left direction-ltr";

  return (
    <section className={"flex flex-col gap-12 bg-customDark rounded-lg px-16 p-4  text-customLight font-bitter " + titleClass}>
      <header className="ml-detailsHeaderLeft">
        <div className="flex items-center">
          <BackButton />
          <h1 className="text-4xl font-bold">{title}</h1>
        </div>
        <div className="mt-[5%] flex items-center">
          <Image
            className="relative aspect-square rounded-3xl mr-16"
            src={imgs[0]}
            alt={title}
            width={128}
            height={128}
          />
          <h2 className={`text-3xl text-customTeal w-full ${titleClass}`} >{description}</h2>
        </div>
      </header>
      <div className="flex gap-4">
        <div className="min-w-[20%]">
          <div className="bg-customCardBgMaroon px-12 py-4 rounded-lg font-light mb-4">
            <h3 className="text-xl font-light relative border-longer">Details</h3>
            <div>
              <span className="text-xs">Created at</span>
              <h3 className="font-medium">{createdAt.toLocaleDateString()}</h3>
            </div>
            {updatedAt && (
              <div>
                <span className="text-xs">Updated at</span>
                <h3 className="font-medium">{updatedAt.toLocaleDateString()}</h3>
              </div>
            )}
            <div>
              <span className="text-xs">Read time</span>
              <h3 className="font-medium">{readTime} Minutes</h3>
            </div>
          </div>
          <div className="bg-customCardBgPurple px-12 py-4 rounded-lg font-light">
            <h3 className="text-xl font-light relative border-longer mb-1">Share On</h3>
            <div>
              <button className="flex gap-4">
                <SocialMediaSVGS type="facebook" />
                <span>Facebook</span>
              </button>
              <button className="flex gap-4">
                <SocialMediaSVGS type="twitter" />
                <span>Twitter</span>
              </button>
              <button className="flex gap-4">
                <SocialMediaSVGS type="linkedin" />
                <span>Linkedin</span>
              </button>
              <button className="flex gap-4">
                <SocialMediaSVGS type="whatsapp" />
                <span>Whatsapp</span>
              </button>
            </div>
          </div>
        </div>
        <main className={`prose prose-customLight ${titleClass}`}>
          <article >{parse(sanitizedContent)}</article>
          <div>
            <h3 className="text-4xl text-customTeal mt-8">Tags</h3>
            <ul className="mt-8 flex gap-4 flex-wrap">
              {tags.map((tag) => (
                <li className="bg-customGray text-xl font-medium p-4 rounded-lg" key={tag}>
                  {tag}
                </li>
              ))}
            </ul>
          </div>
          <h1 className="text-4xl my-8 text-customCardBgYellow">Thanks you for reading</h1>
        </main>
      </div>
    </section>
  );
}
