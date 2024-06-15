import { MinimumBlogPostModel } from "@/models/blogPost.model";
import { DictionaryModel } from "@/models/dictionary.model";
import ProfileBlogPostPreview from "./ProfileBlogPostPreview/ProfileBlogPostPreview";

interface Props {
  posts: MinimumBlogPostModel[];
  onUpdatePost: (
    blogPostId: string,
    updateData: { [key: string]: any }
  ) => void;
  dict: DictionaryModel;
  onDeletePost: (blogPostId: string) => void;
}

export default function ProfileBlogPostList({
  posts,
  onUpdatePost,
  dict,
  onDeletePost,
}: Props) {
  return (
    <ul className="max-w-full">
      <li className="grid grid-cols-posts gap-4 border-b w-full rounded-t-lg  p-4">
        <h3>{dict.settings.id}</h3>
        <h3>{dict.form.title}</h3>
        <h3>{dict.settings.publish}</h3>
        <h3>{dict.settings.main_Tag}</h3>
        <h3>{dict.settings.accessibleBy}</h3>
        <h3>{dict.settings.create_at}</h3>
        <h3>{dict.settings.update_at}</h3>
        <h3>{dict.settings.actions}</h3>
      </li>

      {posts.map((post) => (
        <ProfileBlogPostPreview
          key={post.id}
          post={post}
          dict={dict}
          onUpdatePost={onUpdatePost}
          onDeletePost={onDeletePost}
        />
      ))}
    </ul>
  );
}
