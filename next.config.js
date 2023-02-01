/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    baseUrl: "http://localhost:3000",
    baseApiUrl: "https://jsonplaceholder.typicode.com",
  },
};

module.exports = nextConfig;
