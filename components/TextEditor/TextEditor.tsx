"use client";

import { BlogPostModel } from "@/models/blogPost.model";
import { getTags } from "@/service/blog.service";
import {
  ChangeEvent,
  DragEvent,
  FormEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useModal } from "../hooks/useModal";
import PlusSVG from "../svgs/PlusSVG";

interface Props {
  blog: BlogPostModel;
  saveBlogPost: (blogPost: BlogPostModel) => void;
}
type Direction = "ltr" | "rtl";
type Format = "bold" | "italic" | "underline" | "link";

export default function TextEditor({ blog, saveBlogPost }: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const tagsModelRef = useRef<HTMLUListElement>(null);
  const [blogPost, setBlogPost] = useState<BlogPostModel>(blog);
  const [isTagsModel, setTagsModelOpen] = useModal(tagsModelRef, null);
  const textDirection = useRef<Direction>("ltr");

  const tags = getTags();

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = blogPost.content;
    }
  }, []);

  const handleInput = (
    ev:
      | FormEvent<HTMLDivElement>
      | ChangeEvent<HTMLInputElement>
      | MouseEvent<HTMLButtonElement>,
    isRemove?: boolean,
    tag?: string
  ) => {
    ev.preventDefault();
    const { type } = ev;
    console.log("type:", type);
    if (type === "input") {
      const content = editorRef.current?.innerHTML || "";
      setBlogPost((prevState) => ({ ...prevState, content }));
    } else if (type === "change") {
      const title = (ev.target as HTMLInputElement).value;
      setBlogPost((prevState) => ({ ...prevState, title }));
    } else if (type === "click") {
      if (isRemove) {
        setBlogPost((prevState) => ({
          ...prevState,
          tags: prevState.tags.filter((_tag) => _tag !== tag),
        }));
      } else {
        setBlogPost((prevState) => ({
          ...prevState,
          tags: [...prevState.tags, tag!],
        }));
      }
    }
  };

  const applyFormat = (format: Format) => {
    const selection: Selection | null = window.getSelection();
    if (!selection || (selection && !selection.rangeCount)) return;
    const range: Range = selection.getRangeAt(0);

    let selectedText = range.extractContents();
    let span = document.createElement("span");

    switch (format) {
      case "bold":
        span.style.fontWeight = "bold";
        break;
      case "italic":
        span.style.fontStyle = "italic";
        break;
      case "underline":
        span.style.textDecoration = "underline";
        break;
        // case "link":
        //   const url = prompt("Enter URL:", "http://");
        //   if (url) {
        //     span = document.createElement("a");
        //     span.href = url;
        //     span.target = "_blank";
        //   }
        break;
      default:
        break;
    }

    span.appendChild(selectedText);
    range.insertNode(span);

    // Move the cursor after the inserted node
    range.setStartAfter(span);
    range.setEndAfter(span);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const handleDragOver = (ev: DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
  };

  const handleDrop = (ev: DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    const files = ev.dataTransfer.files;

    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          insertImageAtCursor(event.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const insertImageAtCursor = (imageUrl: string) => {
    const imgElement = document.createElement("img");
    imgElement.src = imageUrl;
    imgElement.style.maxWidth = "100%";

    const selection = window.getSelection();
    if (!selection?.rangeCount) return;

    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(imgElement);

    // Move the cursor after the image
    range.setStartAfter(imgElement);
    range.setEndAfter(imgElement);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const toggleDirection = () => {
    console.log("textDirection.current:", textDirection.current);
    textDirection.current = textDirection.current === "ltr" ? "rtl" : "ltr";
  };

  const onSaveBlogPost = (ev: MouseEvent<HTMLButtonElement>) => {};

  return (
    <section className="p-4 border border-gray-300 rounded text-black  bg-white">
      <div className="mb-2 flex space-x-2">
        <button
          onClick={() => applyFormat("bold")}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Bold
        </button>
        <button
          onClick={() => applyFormat("italic")}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Italic
        </button>
        <button
          onClick={() => applyFormat("underline")}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Underline
        </button>
        <button
          onClick={() => applyFormat("link")}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Insert Link
        </button>
        <button
          onClick={toggleDirection}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          {textDirection.current === "ltr" ? "Switch to RTL" : "Switch to LTR"}
        </button>
        <div onClick={() => setTagsModelOpen(true)} className=" relative">
          Tags
          {isTagsModel && (
            <ul
              ref={tagsModelRef}
              className=" absolute flex flex-col gap-4 top-full min-w-fit"
            >
              {tags.map((tag) => {
                const isRemoved = blogPost.tags.some((_tag) => tag === _tag);
                return (
                  <li
                    key={tag}
                    className=" items-center j flex justify-between gap-8 min-w-fit bg-slate-600"
                  >
                    <span>{tag}</span>
                    <button
                      onClick={(ev) => handleInput(ev, isRemoved, tag)}
                      className=" "
                    >
                      <PlusSVG isRemove={isRemoved} />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      <ul className="flex gap-4">
        {blogPost.tags.map((tag) => (
          <li key={tag} className="bg-gray-200 inline-block p-2 rounded">
            {tag}
          </li>
        ))}
      </ul>
      <input
        onChange={handleInput}
        type="text"
        value={blogPost.title}
        placeholder="Title"
        className="w-full  text-black  p-2 mb-2"
      />
      <div
        contentEditable
        className="p-4 outline-none min-h-[200px] text-black bg-gray-100"
        ref={editorRef}
        onInput={handleInput}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{ direction: textDirection.current }}
      ></div>
      <div>
        <h3 className=" text-black">{blogPost.content.length} - length</h3>
        <button
          onClick={onSaveBlogPost}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Save
        </button>
      </div>
    </section>
  );
}
