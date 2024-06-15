import { MinimumBlogPostModel } from "@/models/blogPost.model";
import { DictionaryModel } from "@/models/dictionary.model";
import { getFixedDateAStr } from "@/service/blog.service";
import ProfileBlogPostActionsModel from "./ProfileBlogPostPreview/ProfileBlogPostActionsModel/ProfileBlogPostActionsModel";

interface Props {
  post: MinimumBlogPostModel;
  onUpdatePost: (
    blogPostId: string,
    updateData: { [key: string]: any }
  ) => void;
  onDeletePost: (blogPostId: string) => void;
  dict: DictionaryModel;
}

export default function ProfileBlogPostPreview({
  post,
  onUpdatePost,
  dict,
  onDeletePost,
}: Props) {
  const { id, title, mainTag, accessibleBy, published } = post;
  console.log("published:", published);
  const createdAt = getFixedDateAStr(post.createdAt);
  const updatedAt = post?.updatedAt ? getFixedDateAStr(post.updatedAt) : null;

  return (
    <li className=" grid grid-cols-posts border-b gap-4 w-full rounded items-center  p-4">
      <h3 title={id}>#</h3>
      <h3>{title}</h3>
      <h3>{published ? "true" : "false"}</h3>
      <h3>{mainTag}</h3>
      <h3>{accessibleBy}</h3>
      <h3>{createdAt}</h3>
      <h3>{updatedAt}</h3>
      <ProfileBlogPostActionsModel
        onDeletePost={onDeletePost}
        post={post}
        onUpdatePost={onUpdatePost}
        dict={dict}
      />
    </li>
  );
}
