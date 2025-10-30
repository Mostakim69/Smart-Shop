/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Remote images allow করার জন্য
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.postimg.cc",
        pathname: "/**", // সব path allow করবে
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc", // Optional: যদি pravatar.cc use করো
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
      }
    ],
  },
};

export default nextConfig;
