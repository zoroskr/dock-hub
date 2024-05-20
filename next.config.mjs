/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost:3000', 'localhost', 'imgur.com', 'i.imgur.com'],
  },
  env: {
    MAILGUN_API_KEY: process.env.MAILGUN_API_KEY,
    MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN,
  },
};

export default nextConfig;
