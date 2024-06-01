export const getBlurDataURL = (src: string): string => {
  // Use Cloudinary transformations to create a small, blurred version of the image
  const url = new URL(src);
  url.searchParams.append("w", "400"); // Width of 10 pixels
  url.searchParams.append("q", "10"); // Quality of 10%
  url.searchParams.append("blur", "50"); // Blur effect
  return url.toString();
};
