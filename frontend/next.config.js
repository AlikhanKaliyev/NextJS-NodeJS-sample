/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    domains:['localhost','blogserver.alikhankaliyev.site']
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
