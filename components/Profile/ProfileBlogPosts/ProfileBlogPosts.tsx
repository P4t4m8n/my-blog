import {  useState, useCallback } from "react";
import { MinimumBlogPostModel } from "@/models/blogPost.model";
import { DictionaryModel } from "@/models/dictionary.model";
import { deleteBlog, updateBlogStatus } from "@/server/blog.server";
import ProfileBlogPostList from "./ProfileBlogPostList/ProfileBlogPostList";

interface Props {
  posts: MinimumBlogPostModel[];
  dict: DictionaryModel;
}

export default function ProfileBlogPosts({ posts, dict }: Props) {
  const [blogPosts, setBlogPosts] = useState<MinimumBlogPostModel[]>(posts);

  const onUpdatePost = useCallback(
    async (blogPostId: string, updateData: { [key: string]: any }) => {
      try {
        const updatedBlogPost = await updateBlogStatus(blogPostId, updateData);
        setBlogPosts((prev) => {
          const idx = prev.findIndex((post) => post.id === blogPostId);
          return prev.toSpliced(idx, 1, updatedBlogPost);
        });
      } catch (error) {
        console.error("error:", error);
      }
    },
    []
  );

  const onDeletePost = useCallback(async (blogPostId: string) => {
    try {
      await deleteBlog(blogPostId);
      setBlogPosts((prev) => {
        const idx = prev.findIndex((post) => post.id === blogPostId);
        return prev.toSpliced(idx, 1);
      });
    } catch (error) {
      console.error("error:", error);
    }
  }, []);

  return (
    <ProfileBlogPostList
      posts={blogPosts}
      onUpdatePost={onUpdatePost}
      dict={dict}
      onDeletePost={onDeletePost}
    />
  );
}
