/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'akfwbtcocmcrpjigpclj.supabase.co',
        port: '', // If the URL does not have a port, you can leave it as an empty string
        pathname: '/storage/v1/object/public/cabin-images/**', // Adjust the pathname to match your specific needs
      },
    ],
  },
};

export default nextConfig;
