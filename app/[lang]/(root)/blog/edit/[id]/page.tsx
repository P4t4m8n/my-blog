
import { getEmptyBlogPost } from "@/service/blog.service";
import { getBlogById } from "@/server/blog.server";
import { getDictionary } from "@/app/[lang]/dictionaries";
import TextEditor from "@/components/TextEditor/Texteditor";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "he" }];
}

interface Props {
  searchParams: { id: string };
  params: { lang: string };
}

export default async function BlogEdit({ searchParams, params }: Props) {
  let blog;
  const { id } = searchParams;
  const { lang } = params;
  if (id) blog = await getBlogById(id);
  else blog = getEmptyBlogPost();

  const dict = await getDictionary(lang);

  return (
    <section className=" min-h-screen-minus-sticky">
      <TextEditor blogPost={blog} dict={dict} />
    </section>
  );
}
