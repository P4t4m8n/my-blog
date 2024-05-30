export default function TextDirSVG({
  textDirection,
}: {
  textDirection: "ltr" | "rtl";
}) {
  const left = textDirection === "rtl" ? "rotate-180" : "";

  return (
    <svg className={"w-4 h-4 fill-none " + left} viewBox="0 0 24 24">
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M3 10H16M3 14H21M3 18H16M3 6H21"
          stroke="#000000"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </g>
    </svg>
  );
}
