export default function PlusSVG({ isRemove }: { isRemove: boolean }) {
  const add = isRemove ? "rotate-45" : "";
  return (
    <svg viewBox="0 0 24 24" className={" w-4 h-4 " + add}>
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M6 12H18M12 6V18"
          className="stroke-black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
      </g>
    </svg>
  );
}
