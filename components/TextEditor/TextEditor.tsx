"use client";
import { useState, useEffect, ChangeEvent } from "react";
import ReactQuill, { Quill, UnprivilegedEditor } from "react-quill";
import "react-quill/dist/quill.snow.css"; 
import "highlight.js/styles/monokai-sublime.css"; 
import { BlogPostModel } from "@/models/blogPost.model";
import { isHebrew } from "@/service/blog.service";
import { saveBlog } from "@/server/blog.server";
import { DictionaryModel } from "@/models/dictionary.model";
import DeltaStatic from "quill";
import Sources from "quill";

interface Props {
  blogPost: BlogPostModel;
  dict: DictionaryModel;
}

// Custom fonts
const fonts = [
  "Arial",
  "Courier",
  "Garamond",
  "Tahoma",
  "Times New Roman",
  "Verdana",
];
const Font = Quill.import("formats/font") as any;
Font.whitelist = fonts;
Quill.register(Font, true);
// Register Syntax module
Quill.register("modules/syntax", true);
// Register History module
const History = Quill.import("modules/history");
Quill.register("modules/history", History, true);

const TextEditor = ({ blogPost, dict }: Props) => {
  const [blogPostState, setBlogPostState] = useState<BlogPostModel>(blogPost);

  // useEffect(() => {
  //   setBlogPostState(blogPost);
  // }, [blogPost]);

  const handleContentChange = (
    value: string,
    delta: DeltaStatic,
    source: Sources,
    editor: UnprivilegedEditor
  ) => {};

  const handleTitleDescriptionChange = (ev: ChangeEvent) => {};

  const handleSave = async () => {
    try {
      const savedBlog = await saveBlog(blogPostState!);
      setBlogPostState(savedBlog);
    } catch (error) {
      console.error("error:", error);
    }
  };

  const titleClass = isHebrew(blogPostState?.title)
    ? "text-right direction-rtl"
    : "text-left direction-ltr";

  return (
    <>
      <div className={`${titleClass}`} id="toolbar-container">
        <span className="ql-formats text-customLight fill-customLight">
          <select className="ql-font  text-customLight fill-customLight  ">
            {fonts.map((font) => (
              <option value={font} key={font}>
                {font}
              </option>
            ))}
          </select>
          <select className="ql-size "></select>
        </span>
        <span className="ql-formats">
          <button className="ql-bold"></button>
          <button className="ql-italic"></button>
          <button className="ql-underline"></button>
          <button className="ql-strike"></button>
        </span>
        <span className="ql-formats">
          <select className="ql-color"></select>
          <select className="ql-background"></select>
        </span>
        <span className="ql-formats">
          <button className="ql-script" value="sub"></button>
          <button className="ql-script" value="super"></button>
        </span>
        <span className="ql-formats">
          <button className="ql-header" value="1"></button>
          <button className="ql-header" value="2"></button>
          <button className="ql-blockquote"></button>
          <button className="ql-code-block"></button>
        </span>
        <span className="ql-formats">
          <button className="ql-list" value="ordered"></button>
          <button className="ql-list" value="bullet"></button>
          <button className="ql-indent" value="-1"></button>
          <button className="ql-indent" value="+1"></button>
        </span>
        <span className="ql-formats">
          <button className="ql-direction" value="rtl"></button>
          <select className="ql-align"></select>
        </span>
        <span className="ql-formats">
          <button className="ql-link"></button>
          <button className="ql-image"></button>
          <button className="ql-video"></button>
          <button className="ql-formula"></button>
        </span>
        <span className="ql-formats">
          <button className="ql-clean"></button>
        </span>
      </div>
      <input
        type="text"
        value={blogPost.title}
        name="title"
        onChange={handleTitleDescriptionChange}
        placeholder={dict.form.title}
        className={`bg-customDark text-customLight p-4 pl-8 w-full border-2 border-customLight ${titleClass}`}
      />
      <textarea
        value={blogPost.description}
        name="description"
        placeholder={dict.article.description}
        onChange={handleTitleDescriptionChange}
        className="bg-customDark text-customLight p-4 border-2 border-customLight w-full h-32"
      />
      <ReactQuill
        className="bg-customDark text-customLight p-4 border-2  border-customLight min-h-text-editor max-w-editor outline-none"
        value={blogPost.content}
        onChange={handleContentChange}
        modules={TextEditor.modules}
        formats={TextEditor.formats}
        theme="snow"
      />
      <button
        className=" float-right p-4 mt-2 rounded font-workSans bg-customTeal"
        onClick={handleSave}
      >
        {dict.form.save}
      </button>
    </>
  );
};

// Configure Quill modules (toolbar, clipboard, syntax, history, etc.)
TextEditor.modules = {
  toolbar: {
    container: "#toolbar-container",
  },
  clipboard: {
    matchVisual: false,
  },

  history: {
    delay: 2000,
    maxStack: 500,
    userOnly: true,
  },
};

// Configure Quill formats
TextEditor.formats = [
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "script",
  "header",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "indent",
  "direction",
  "align",
  "link",
  "image",
  "video",
  "formula",
  "clean",
];

export default TextEditor;
