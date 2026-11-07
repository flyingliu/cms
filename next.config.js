/** @type {import('next').NextConfig} */
const nextConfig = {
  // 静态导出到 GitHub Pages
  output: 'export',
  
  // 禁用图像优化（GitHub Pages 不支持）
  images: {
    unoptimized: true,
  },
  
  // 基础路径（替换为你的仓库名）
  basePath: '/cms',
  
  // 资源前缀
  assetPrefix: '/cms/',
}

module.exports = nextConfig
