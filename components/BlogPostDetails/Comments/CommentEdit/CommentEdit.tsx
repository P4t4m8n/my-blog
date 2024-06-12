"use client";
interface Props {
  onSaveComment: (content: string) => void;
}
export default function CommentEdit({ onSaveComment }: Props) {
  const saveContent = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const comment = event.currentTarget.comment.value;
    onSaveComment(comment);
  };

  return (
    <form onSubmit={saveContent} className="flex flex-col gap-2">
      <textarea
        className="text-customLight h-40 resize-none rounded-lg p-4 bg-gray-300"
        id="comment"
        name="comment"
        rows={4}
        cols={50}
      ></textarea>
      <button
        className="highlight-theme-background p-2 rounded-lg self-end"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
