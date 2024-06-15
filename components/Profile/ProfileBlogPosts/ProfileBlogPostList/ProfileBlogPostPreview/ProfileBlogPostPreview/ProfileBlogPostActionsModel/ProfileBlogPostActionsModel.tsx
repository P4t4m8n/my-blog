import { useModal } from "@/hooks/useModal";
import { MinimumBlogPostModel } from "@/models/blogPost.model";
import { DictionaryModel } from "@/models/dictionary.model";
import { Role } from "@prisma/client";
import { useRouter } from "next/navigation";
import { MouseEvent, useRef } from "react";

interface Props {
  post: MinimumBlogPostModel;
  onUpdatePost: (
    blogPostId: string,
    updateData: { [key: string]: any }
  ) => void;
  dict: DictionaryModel;
  onDeletePost: (blogPostId: string) => void;
}
export default function ProfileBlogPostActionsModel({
  post,
  onUpdatePost,
  dict,
  onDeletePost,
}: Props) {
  const router = useRouter();
  const modelRef = useRef<HTMLDivElement>(null);
  const modelAccessibleRef = useRef<HTMLDivElement>(null);
  const { id } = post;
  const [isMainModelOpen, setIsMainModelOpen] = useModal(modelRef, null);
  const [isAccessibleModelOpen, setIsAccessibleModelOpen] = useModal(
    modelAccessibleRef,
    null
  );

  const handleClicked = (
    ev: MouseEvent,
    blogPostId: string,
    type: string,
    value?: Role
  ) => {
    ev.stopPropagation();
    ev.preventDefault();
    switch (type) {
      case "edit":
        router.push(`/blog/edit/${blogPostId}`);
        break;
      case "delete":
        onDeletePost(blogPostId);
        break;
      case "publish":
        onUpdatePost(blogPostId, { published: !post.published });
        break;
      case "access":
        onUpdatePost(blogPostId, { accessibleBy: value });
        break;
    }
  };

  return (
    <div className=" relative">
      <button
        className="background-theme-1 p-2 rounded-md"
        onClick={() => setIsMainModelOpen(true)}
      >
        {dict.settings.actions}
      </button>
      {isMainModelOpen && (
        <div
          className="background-theme-2 absolute top-0 right-[110%] flex flex-col gap-2 items-start p-2 rounded-md "
          ref={modelRef}
        >
          <button
            className=" hover:text-red-500 hover:scale-105"
            onClick={(ev) => handleClicked(ev, id!, "edit")}
          >
            {dict.settings.edit}
          </button>
          <button
            className=" hover:text-red-500 hover:scale-105"
            onClick={(ev) => handleClicked(ev, id!, "delete")}
          >
            {dict.settings.delete}
          </button>
          <button
            className=" hover:text-red-500 hover:scale-105"
            onClick={(ev) => handleClicked(ev, id!, "publish")}
          >
            {dict.settings.publish}
          </button>
          <button
            className=" hover:text-red-500 hover:scale-105"
            onClick={() => setIsAccessibleModelOpen(true)}
          >
            Access
          </button>
          <div className=" relative">
            {isAccessibleModelOpen && (
              <div
                className="highlight-theme-background absolute -top-8 right-4 flex flex-col gap-2 items-start p-2 rounded-md "
                ref={modelAccessibleRef}
              >
                {post.accessibleBy !== Role.ADMIN && (
                  <button
                    className=" hover:text-red-700 hover:scale-105"
                    onClick={(ev) => handleClicked(ev, id!, "access", "PUBLIC")}
                  >
                    {dict.settings.public}
                  </button>
                )}
                {post.accessibleBy !== Role.PRIVATE && (
                  <button
                    className=" hover:text-red-700 hover:scale-105"
                    onClick={(ev) =>
                      handleClicked(ev, id!, "access", "PRIVATE")
                    }
                  >
                    {dict.settings.private}
                  </button>
                )}
                {post.accessibleBy !== Role.USER && (
                  <button
                    className=" hover:text-red-700 hover:scale-105"
                    onClick={(ev) => handleClicked(ev, id!, "access", "USER")}
                  >
                    {dict.settings.user}
                  </button>
                )}
                {post.accessibleBy !== Role.ADMIN && (
                  <button
                    className=" hover:text-red-700 hover:scale-105"
                    onClick={(ev) => handleClicked(ev, id!, "access", "ADMIN")}
                  >
                    {dict.settings.admin}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
