import nextPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

const withPWA = nextPWA({
  dest: "public",
})(nextConfig);

export default withPWA;
