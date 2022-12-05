/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/source',
        destination: '/destination',
        permanent: true, // triggers 308
      }
    ]
  }
}

module.exports = nextConfig
