export default function LikeSVG({ isLiked = false }) {
  const fill = isLiked ? "fill-customHighlight" : "fill-customGray";
  return (
    <svg
      viewBox="0 0 1024.00 1024.00"
      className="w-6 h-6 absolute stroke-customDark stroke-[40]  right-4"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          className={fill + " shadow-md "}
          d="M725.333333 192c-89.6 0-168.533333 44.8-213.333333 115.2C467.2 236.8 388.266667 192 298.666667 192 157.866667 192 42.666667 307.2 42.666667 448c0 253.866667 469.333333 512 469.333333 512s469.333333-256 469.333333-512c0-140.8-115.2-256-256-256z"
        ></path>
      </g>
      <g id="SVGRepo_iconCarrier">
        <path
          className={fill + " shadow-md "}
          d="M725.333333 192c-89.6 0-168.533333 44.8-213.333333 115.2C467.2 236.8 388.266667 192 298.666667 192 157.866667 192 42.666667 307.2 42.666667 448c0 253.866667 469.333333 512 469.333333 512s469.333333-256 469.333333-512c0-140.8-115.2-256-256-256z"
        ></path>
      </g>
    </svg>
  );
}
