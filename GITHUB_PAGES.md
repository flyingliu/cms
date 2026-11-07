# 📦 GitHub Pages 部署完整指南

## ✅ 已完成配置

| 文件 | 作用 | 状态 |
|------|------|------|
| `next.config.js` | 静态导出配置 | ✅ 已配置 |
| `.github/workflows/deploy.yml` | 自动部署工作流 | ✅ 已创建 |
| `src/app/dashboard-static/page.tsx` | 静态版本 Dashboard | ✅ 已创建 |
| `deploy.sh` | 快速部署脚本 | ✅ 已创建 |

---

## 🚀 3 步部署

### 第 1 步：运行部署脚本

```bash
cd /Users/mac/code/cms
./deploy.sh
```

脚本会提示你输入仓库名（例如：`cms` 或 `ai-test`）

### 第 2 步：推送到 GitHub

```bash
git push -u origin main
```

### 第 3 步：配置 GitHub Pages

1. 访问 https://github.com/YOUR_USERNAME/YOUR_REPO/settings/pages
2. **Source** 选择：**GitHub Actions**
3. 等待 2-3 分钟，Actions 会自动运行

---

## 📁 项目结构（部署版本）

```
cms/
├── src/
│   ├── app/
│   │   ├── dashboard/          # 完整版（带 API，本地开发用）
│   │   ├── dashboard-static/   # 静态版（GitHub Pages 用）
│   │   ├── products/           # 产品列表（静态，可直接用）
│   │   └── admin/              # CMS 后台（静态，仅 UI）
│   └── ...
├── .github/
│   └── workflows/
│       └── deploy.yml          # 自动部署
├── out/                        # 构建输出（部署这个）
└── ...
```

---

## 🌐 访问地址

部署成功后访问：

```
https://YOUR_USERNAME.github.io/cms/
```

可用页面：

| 页面 | 路径 | 说明 |
|------|------|------|
| 首页 | `/` | 项目介绍 |
| Dashboard（静态） | `/dashboard-static` | ✅ 可用（数据直读） |
| Dashboard（API） | `/dashboard` | ❌ API 不工作 |
| 产品列表 | `/products` | ✅ 可用（静态） |
| 产品详情 | `/products/datavision-pro` | ✅ 可用（静态） |
| CMS 后台 | `/admin/products` | ✅ 可用（仅 UI） |

---

## ⚠️ 重要说明

### API 限制

**GitHub Pages 是静态托管，不支持 Next.js API Routes！**

解决方案：

1. **使用静态版本** - `dashboard-static` 页面直接读取 JSON 数据
2. **或部署到 Vercel** - 支持完整 API 功能

### 推荐方案

**录屏演示：** 使用本地开发服务器 (`pnpm dev`)
- API 正常工作
- 功能完整

**在线分享：** 使用 GitHub Pages
- 静态版本可访问
- 标注"静态演示版"

**最佳体验：** 部署到 Vercel
- 完整功能
- 自动 HTTPS
- 专业域名

---

## 🔄 更新部署

每次推送到 main 分支都会自动重新部署：

```bash
git add .
git commit -m "Update dashboard styles"
git push
```

查看部署状态：
- 访问仓库的 **Actions** 标签
- 查看最新工作流运行

---

## 📊 部署到 Vercel（推荐）

如果希望 API 正常工作，推荐部署到 Vercel：

### 方式 1: Web 界面

1. 访问 https://vercel.com/new
2. 导入 GitHub 仓库
3. 点击 Deploy（自动完成）

### 方式 2: CLI

```bash
# 安装 Vercel CLI
pnpm i -g vercel

# 部署
vercel

# 生产部署
vercel --prod
```

### Vercel 优势

| 特性 | GitHub Pages | Vercel |
|------|-------------|--------|
| API Routes | ❌ 不支持 | ✅ 支持 |
| 自动 HTTPS | ❌ | ✅ |
| 自定义域名 | ✅ | ✅ |
| 预览部署 | ❌ | ✅ |
| 免费额度 | 无限 | 100GB/月 |
| 部署速度 | ~3 分钟 | ~1 分钟 |

---

## 🎯 Demo 录屏方案

### 方案 A: 本地录屏（推荐）

```bash
pnpm dev
# 访问 http://localhost:3001
```

**优点：**
- ✅ 完整功能（包括 API）
- ✅ 无需等待部署
- ✅ 可以解释"这是本地开发环境"

**录屏开场白：**
> "我现在运行在本地开发环境，接下来演示完整功能..."

### 方案 B: GitHub Pages 静态版

```
https://YOUR_USERNAME.github.io/cms/dashboard-static
```

**优点：**
- ✅ 真实在线链接
- ✅ 便于分享

**缺点：**
- ❌ API 不工作（使用静态数据）
- ⚠️ 需要说明"这是静态演示版"

**录屏开场白：**
> "这是部署在 GitHub Pages 的静态演示版本，数据直接读取自 JSON 文件..."

### 方案 C: Vercel 完整版（最佳）

```
https://your-project.vercel.app
```

**优点：**
- ✅ 完整功能
- ✅ 专业域名
- ✅ 自动 HTTPS

**录屏开场白：**
> "这是部署在 Vercel 的完整版本，所有 API 功能正常工作..."

---

## ✅ 部署检查清单

部署前确认：

- [ ] 修改 `basePath` 为实际仓库名
- [ ] 修改 `assetPrefix` 为实际仓库名
- [ ] 运行 `./deploy.sh` 自动配置
- [ ] 在 GitHub 创建仓库
- [ ] 推送代码：`git push -u origin main`
- [ ] 配置 GitHub Pages Source 为 GitHub Actions
- [ ] 等待 Actions 完成（2-3 分钟）
- [ ] 访问预览链接验证功能
- [ ] 更新 README 添加在线演示链接

---

## 📧 提交材料

完成部署后，在提交邮件中添加：

```markdown
## 在线演示

- GitHub Pages: https://YOUR_USERNAME.github.io/cms/
- GitHub 仓库：https://github.com/YOUR_USERNAME/cms
- 录屏链接：[YouTube/B 站链接]

## 本地运行

pnpm install
pnpm dev
# 访问 http://localhost:3001
```

---

## 🎉 完成！

部署成功后，你可以：

1. ✅ 将在线链接加入 README
2. ✅ 将在线链接加入简历
3. ✅ 分享给面试官
4. ✅ 在 Demo 录屏中展示

**祝部署顺利！** 🚀
