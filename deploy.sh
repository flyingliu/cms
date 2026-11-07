#!/bin/bash

# 🚀 快速部署脚本 - GitHub Pages

echo "📦 准备部署到 GitHub Pages..."

# 检查 Git 状态
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    echo "❌ 错误：不在 Git 仓库中"
    echo "运行：git init"
    exit 1
fi

# 检查远程仓库
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "❌ 错误：未配置远程仓库"
    echo "运行：git remote add origin https://github.com/YOUR_USERNAME/cms.git"
    exit 1
fi

echo "✅ Git 配置检查通过"

# 询问仓库名
read -p "📁 输入你的 GitHub 仓库名 (例如: cms): " REPO_NAME

if [ -z "$REPO_NAME" ]; then
    echo "❌ 仓库名不能为空"
    exit 1
fi

echo "📝 更新配置文件..."

# 更新 next.config.js
cat > next.config.js << EOF
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/${REPO_NAME}',
  assetPrefix: '/${REPO_NAME}/',
}

module.exports = nextConfig
EOF

# 更新 dashboard-static 页面的返回链接
sed -i '' "s|/cms/|/${REPO_NAME}/|g" src/app/dashboard-static/page.tsx
sed -i '' "s|/cms/|/${REPO_NAME}/|g" src/app/page.tsx

echo "✅ 配置更新完成"

# 提交更改
echo "📝 提交更改..."
git add .
git commit -m "chore: 配置 GitHub Pages 部署 ($REPO_NAME)"

echo ""
echo "✅ 配置完成！下一步："
echo ""
echo "1️⃣  推送到 GitHub:"
echo "   git push -u origin main"
echo ""
echo "2️⃣  在 GitHub 创建仓库: https://github.com/new"
echo "   仓库名：$REPO_NAME"
echo ""
echo "3️⃣  配置 GitHub Pages:"
echo "   Settings → Pages → Source: GitHub Actions"
echo ""
echo "4️⃣  访问预览:"
echo "   https://YOUR_USERNAME.github.io/$REPO_NAME/"
echo ""
echo "🎉 部署成功！"
