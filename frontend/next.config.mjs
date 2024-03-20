/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: 'vibz.s3.eu-central-1.amazonaws.com',
        pathname: "**"
      }

    ]
    //domains: ['vibz.s3.eu-central-1.amazonaws.com'],
     },
  };


  export default nextConfig;
