# 📦 部署到 GitHub Pages 指南

## ✅ 已完成配置

- [x] `next.config.js` - 静态导出配置
- [x] `.github/workflows/deploy.yml` - GitHub Actions 自动部署1
- [x] 构建脚本 - `pnpm build`

---

## 🚀 部署步骤

### 第 1 步：创建 GitHub 仓库

```bash
# 进入项目目录
cd /Users/mac/code/cms

# 初始化 Git（如果还没有）
git init

# 添加所有文件
git add .

# 首次提交
git commit -m "Initial commit: AI Engineer Test Project"
```

### 第 2 步：创建 GitHub 仓库

访问 https://github.com/new

- **Repository name**: `cms`（必须与 basePath 一致）
- **Visibility**: Public（GitHub Pages 免费）或 Private（需要 Pro）
- **不要** 初始化 README/.gitignore（已有）

### 第 3 步：关联远程仓库

```bash
# 替换为你的 GitHub 用户名
git remote add origin https://github.com/YOUR_USERNAME/cms.git

# 推送到 main 分支
git branch -M main
git push -u origin main
```

### 第 4 步：配置 GitHub Pages

1. 访问仓库的 **Settings** → **Pages**
2. **Source** 选择：**GitHub Actions**（不是 Deploy from a branch）
3. 等待 Actions 自动运行（约 2-3 分钟）

### 第 5 步：查看部署状态

1. 访问仓库的 **Actions** 标签
2. 查看最新的工作流运行状态
3. 成功后会显示绿色 ✓

### 第 6 步：访问在线预览

部署成功后，访问：

```
https://YOUR_USERNAME.github.io/cms/
```

---

## 📝 重要配置说明

### next.config.js

```javascript
const nextConfig = {
  output: 'export',        // 静态导出（关键！）
  basePath: '/cms',        // 仓库名（必须修改！）
  assetPrefix: '/cms/',    // 资源路径前缀
  images: {
    unoptimized: true,     // 禁用图片优化（GitHub Pages 不支持）
  },
}
```

### ⚠️ 必须修改

**将 `basePath` 和 `assetPrefix` 改为你实际的仓库名！**

如果你的仓库名是 `ai-test`：

```javascript
basePath: '/ai-test',
assetPrefix: '/ai-test/',
```

---

## 🔄 更新部署

每次推送到 main 分支都会自动部署：

```bash
# 日常开发
git add .
git commit -m "Update dashboard styles"
git push

# GitHub Actions 会自动：
# 1. 安装依赖
# 2. 构建项目
# 3. 部署到 GitHub Pages
```

---

## 🎯 本地测试静态版本

在部署前，可以在本地测试静态版本：

```bash
# 构建静态文件
pnpm build

# 预览构建结果（需要安装 serve）
pnpm install -g serve
serve out

# 访问 http://localhost:3000/cms/
```

---

## 📁 输出目录结构

构建后生成 `out/` 目录：

```
cms/
├── out/                    # 静态文件（部署这个）
│   ├── index.html
│   ├── dashboard/
│   │   └── index.html
│   ├── products/
│   │   ├── index.html
│   │   └── datavision-pro/
│   │       └── index.html
│   └── _next/              # JS/CSS 资源
├── .github/
│   └── workflows/
│       └── deploy.yml      # 自动部署脚本
└── src/                    # 源代码
```

---

## ⚠️ 注意事项

### 1. API Routes 限制

**GitHub Pages 是静态托管，不支持 Next.js API Routes！**

你的项目中的 API 需要改用以下方式：

**方案 A: 直接在组件中读取 JSON**（推荐用于演示）

```typescript
// src/app/dashboard/page.tsx
import dashboardData from '@/data/dashboard_data.json'

// 直接在组件中使用数据，不需要 API
const questions = dashboardData.questions
```

**方案 B: 使用客户端 API**（如果必须）

- 部署到 Vercel/Netlify（支持 Serverless Functions）
- 或使用后端服务（Railway/Render）

### 方案 A 修改示例

创建静态数据版本：

```typescript
// src/lib/static-data.ts
import dashboardData from '@/data/dashboard_data.json'
import brandKnowledge from '@/data/brand_knowledge.json'

export { dashboardData, brandKnowledge }
```

然后在组件中直接使用：

```typescript
import { dashboardData } from '@/lib/static-data'

// 不再调用 /api/dashboard/summary
// 直接使用 dashboardData.summary
```

---

## 🆚 部署平台对比

| 平台 | API 支持 | 免费额度 | 推荐度 |
|------|---------|---------|--------|
| **GitHub Pages** | ❌ 静态 | 无限 | ⭐⭐⭐ 适合演示 |
| **Vercel** | ✅ Serverless | 100GB/月 | ⭐⭐⭐⭐⭐ 最佳 |
| **Netlify** | ✅ Functions | 100GB/月 | ⭐⭐⭐⭐ 很好 |
| **Cloudflare Pages** | ✅ Workers | 无限 | ⭐⭐⭐⭐ 很好 |

### 推荐：使用 Vercel（最简单）

```bash
# 安装 Vercel CLI
pnpm i -g vercel

# 部署
vercel

# 按提示操作，3 步完成
```

Vercel 优势：
- ✅ 支持 API Routes
- ✅ 自动 HTTPS
- ✅ 自定义域名免费
- ✅ 预览部署（每个 PR）

---

## 📺 Demo 录屏建议

### 方案 1: 本地演示（推荐）

```bash
pnpm dev
# 访问 http://localhost:3001
```

**优点：**
- API 正常工作
- 功能完整
- 无需等待部署

### 方案 2: GitHub Pages 演示

```
https://YOUR_USERNAME.github.io/cms/
```

**优点：**
- 真实在线链接
- 便于分享

**缺点：**
- API 不工作（需改用静态数据）
- 需要修改代码

### 方案 3: Vercel 演示（最佳）

```
https://your-project.vercel.app
```

**优点：**
- 完整功能（包括 API）
- 自动 HTTPS
- 专业域名

---

## ✅ 快速检查清单

部署前确认：

- [ ] 修改 `basePath` 为实际仓库名
- [ ] 修改 `assetPrefix` 为实际仓库名
- [ ] 创建 GitHub 仓库
- [ ] 推送代码到 main 分支
- [ ] 配置 GitHub Pages Source 为 GitHub Actions
- [ ] 等待 Actions 完成（2-3 分钟）
- [ ] 访问预览链接验证

---

## 🎯 下一步

1. **修改配置** - 将 `cms` 改为你实际的仓库名
2. **创建仓库** - 在 GitHub 创建新仓库
3. **推送代码** - `git push -u origin main`
4. **等待部署** - 查看 Actions 标签
5. **分享链接** - 将预览链接加入 README 和简历

**祝部署顺利！🚀**
