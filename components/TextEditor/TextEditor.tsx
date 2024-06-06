"use client";
import { useState, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css"; // Import Highlight.js styles

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
/////////////*******************//////////////////
const TextEditor = () => {
  const [content, setContent] = useState("");

  // Load content from localStorage when the component mounts
  useEffect(() => {
    const savedContent = localStorage.getItem("quill-content");
    if (savedContent) {
      setContent(savedContent);
    }
  }, []);

  // Save content to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("quill-content", content);
  }, [content]);

  const handleChange = (value: string) => {
    setContent(value);
  };

  const handleSave = () => {
    console.log("Editor content:", content);
    // Here you can add the code to save the content to the database
  };

  return (
    <>
      <div className="" id="toolbar-container">
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
      <ReactQuill
      className="bg-customDark text-customLight p-4 min-h-text-editor max-w-editor"
        value={content}
        onChange={handleChange}
        modules={TextEditor.modules}
        formats={TextEditor.formats}
        theme="snow"
      />
      <button className=" float-right p-4 mt-2 rounded font-workSans bg-customTeal" onClick={handleSave}>Save Content</button>
     
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
