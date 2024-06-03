export const useTextEditor = () => {};

export const handleBold = (range: Range, element: HTMLElement) => {
  const parentElement = range.commonAncestorContainer.parentElement; // Get the parent element of the selection
  const currentFontWeight = window.getComputedStyle(parentElement!).fontWeight; // Get the current font weight of the parent element
  if (currentFontWeight === "bold" || parseInt(currentFontWeight) >= 700) {
    // If the text is already bold, remove the bold formatting
    element.style.fontWeight = "normal";
  } else {
    // If the text is not bold, apply bold formatting
    element.style.fontWeight = "bold";
  }
};


