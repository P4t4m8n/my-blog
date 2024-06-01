/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dpnevk8db/image/upload/**",
      },
    ],
  },
};

export default nextConfig;
