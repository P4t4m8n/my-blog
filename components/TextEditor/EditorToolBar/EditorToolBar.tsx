
export default function EditorToolBar() {
  const formatText = (command: string, value = null) => {};
  return (
    <section>
      {" "}
      <div>
        <button onClick={() => formatText("bold")}>Bold</button>
        <button onClick={() => formatText("italic")}>Italic</button>
        <button onClick={() => formatText("underline")}>Underline</button>
        <button onClick={() => formatText("insertUnorderedList")}>
          Bulleted List
        </button>
        <button onClick={() => formatText("insertOrderedList")}>
          Numbered List
        </button>
        <button onClick={() => formatText("justifyLeft")}>Left Align</button>
        <button onClick={() => formatText("justifyCenter")}>
          Center Align
        </button>
        <button onClick={() => formatText("justifyRight")}>Right Align</button>
        {/* <button
          onClick={() =>
            formatText("createLink", prompt("Enter URL:", "http://"))
          }
        >
          Insert Link
        </button> */}
      </div>
    </section>
  );
}
