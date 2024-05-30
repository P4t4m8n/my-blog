import React from "react";

export default function Footer() {
  return (
    <footer className=" sticky bottom-0 pb-4 max-h-16  flex justify-between items-center ">
      <div className=" space-y-1">
        <h3>Contact me</h3>
        <h3>lifeinabox@gmail.com</h3>
      </div>
      <div className="flex gap-16">
        <h3>Follow me</h3>
        <h3>Twitter</h3>
        <h3>Instagram</h3>
      </div>
    </footer>
  );
}
