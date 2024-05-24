/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode:true,
  async headers() {
    return [
      {
        source: '/(.*)?', // Matches all routes
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,HEAD,PUT,PATCH,POST,DELETE' },
          // Add other headers as needed
        ],
      },
    ];
  },
}

export default nextConfig;
