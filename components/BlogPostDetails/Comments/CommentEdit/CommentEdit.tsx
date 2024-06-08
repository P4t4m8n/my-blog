export default function CommentEdit() {
  return (
    <form className="flex flex-col" >
      <textarea className="text-customLight h-40    bg-customGray" id="comment" name="comment" rows={4} cols={50}></textarea>
      <button type="submit">Submit</button>
    </form>
  );
}
