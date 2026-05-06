/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Desabilita a otimização em dev para evitar erro de "private ip" com localhost
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
      },
      {
        protocol: 'https',
        hostname: 'orquideaprofissional.com.br',
      },
      {
        protocol: 'https',
        hostname: '*.orquideaprofissional.com.br',
      },
    ],
  },
};

export default nextConfig;
