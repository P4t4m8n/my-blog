export const Toolbar: React.FC<{ editor: Editor }> = ({ editor }) => {
  return (
    <div className="toolbar">
      <button
        onMouseDown={(event) => {
          event.preventDefault();
          const isActive = isFormatActive(editor, "bold");
          toggleFormat(editor, "bold");
        }}
      >
        Bold
      </button>
      <button
        onMouseDown={(event) => {
          event.preventDefault();
          const isActive = isFormatActive(editor, "italic");
          toggleFormat(editor, "italic");
        }}
      >
        Italic
      </button>
      <button
        onMouseDown={(event) => {
          event.preventDefault();
          const isActive = isFormatActive(editor, "underline");
          toggleFormat(editor, "underline");
        }}
      >
        Underline
      </button>
      <button
        onMouseDown={(event) => {
          event.preventDefault();
          toggleBlock(editor, "heading");
        }}
      >
        Heading
      </button>
      <button
        onMouseDown={(event) => {
          event.preventDefault();
          toggleBlock(editor, "list-item");
        }}
      >
        List
      </button>
    </div>
  );
};

const isFormatActive = (editor: Editor, format: string) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n[format] === true,
    universal: true,
  });
  return !!match;
};

const toggleFormat = (editor: Editor, format: string) => {
  const isActive = isFormatActive(editor, format);
  Transforms.setNodes(
    editor,
    { [format]: isActive ? null : true },
    { match: (n) => Text.isText(n), split: true }
  );
};

const toggleBlock = (editor: Editor, format: string) => {
  const isActive = isBlockActive(editor, format);
  const isList = format === "list-item";

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      n.type === "list-item",
    split: true,
  });

  const newProperties: Partial<SlateElement> = {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  };
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: "bulleted-list", children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const isBlockActive = (editor: Editor, format: string) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === format,
  });

  return !!match;
};
