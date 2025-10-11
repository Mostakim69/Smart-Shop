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
    ],
  },
};

export default nextConfig;
