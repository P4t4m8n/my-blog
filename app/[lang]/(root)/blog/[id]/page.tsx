import { getDictionary } from "@/app/[lang]/dictionaries";
import BlogPostDetails from "@/components/BlogPostDetails/BlogPostDetails";
import { LanguageType } from "@/models/dictionary.model";

interface Props {
  params: { id: string; lang: LanguageType };
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "he" }];
}

export default async function BlogDetails({ params }: Props) {
  const { id, lang } = params;
  return <BlogPostDetails lang={lang} blogPostId={id} />;
}
