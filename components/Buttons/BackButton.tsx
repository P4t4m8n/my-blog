"use client";
import { useRouter } from "next/navigation";
import BackSVG from "../svgs/BackSVG";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className=" bg-customTeal rounded-full mr-32"
    >
      <BackSVG />
    </button>
  );
}
