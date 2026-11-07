# 📋 GitHub Pages 部署检查清单

## 快速部署（3 分钟）

### ✅ 步骤 1: 运行部署脚本

```bash
cd /Users/mac/code/cms
./deploy.sh
```

输入你的 GitHub 仓库名（例如：`cms`）

### ✅ 步骤 2: 推送到 GitHub

```bash
git push -u origin main
```

### ✅ 步骤 3: 在 GitHub 创建仓库

访问 https://github.com/new

- Repository name: `cms`（与脚本中输入的一致）
- Visibility: Public
- 不要初始化 README

### ✅ 步骤 4: 配置 GitHub Pages

1. 进入仓库 → Settings → Pages
2. Source 选择：**GitHub Actions**
3. 等待 2-3 分钟

### ✅ 步骤 5: 验证部署

访问：
```
https://YOUR_USERNAME.github.io/cms/
```

---

## 📊 部署状态检查

### GitHub Actions 状态

访问：https://github.com/YOUR_USERNAME/cms/actions

- ✅ 绿色勾 = 部署成功
- 🟡 黄色 = 正在运行
- ❌ 红色 X = 失败（点击查看详情）

### 常见错误

| 错误 | 原因 | 解决方案 |
|------|------|---------|
| 404 Not Found | 部署未完成 | 等待 2-3 分钟 |
| basePath 错误 | 仓库名不匹配 | 修改 next.config.js |
| 白屏 | JS 加载失败 | 检查 assetPrefix 配置 |

---

## 🔧 手动配置（如果脚本失败）

### 1. 修改 next.config.js

```javascript
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/cms',        // ← 改为你的仓库名
  assetPrefix: '/cms/',    // ← 改为你的仓库名
}
```

### 2. 修改页面链接

```typescript
// src/app/dashboard-static/page.tsx
// 将所有 /cms/ 替换为 /你的仓库名/
```

### 3. 提交并推送

```bash
git add .
git commit -m "fix: 更新 basePath 配置"
git push
```

---

## 🎯 录屏方案选择

### 方案 A: 本地录屏（推荐）

```bash
pnpm dev
# http://localhost:3001
```

**优点：**
- ✅ 完整功能（API 正常）
- ✅ 无需等待部署
- ✅ 稳定可靠

**开场白：**
> "我现在运行在本地开发环境，接下来演示完整功能..."

### 方案 B: GitHub Pages

```
https://YOUR_USERNAME.github.io/cms/dashboard-static
```

**优点：**
- ✅ 真实在线链接
- ✅ 便于分享

**缺点：**
- ⚠️ API 不工作（静态数据）

**开场白：**
> "这是部署在 GitHub Pages 的静态演示版本..."

### 方案 C: Vercel（最佳）

```bash
pnpm i -g vercel
vercel
```

**优点：**
- ✅ 完整功能
- ✅ 专业域名
- ✅ 1 分钟部署

---

## 📧 提交邮件模板

```markdown
主题：AI 全栈工程师笔试提交 - 刘飞来

您好，

我是刘飞来，15 年 + 前端开发经验，现任真才 AI 全栈工程师。

## 项目信息

- GitHub 仓库：https://github.com/YOUR_USERNAME/cms
- 在线演示：https://YOUR_USERNAME.github.io/cms/
- 录屏链接：[YouTube/B 站链接]

## 技术亮点

1. Next.js 14 + TypeScript 完整类型系统
2. ECharts 数据可视化
3. REST API 设计
4. SEO 优化（JSON-LD）
5. 响应式设计（Tailwind CSS）

## 本地运行

pnpm install
pnpm dev
# 访问 http://localhost:3001

## 关于我

- 15 年 + 前端开发经验
- Vue3/TypeScript/Node.js 全栈
- 真才 AI 项目技术合伙人
- 擅长 AI 应用集成与数据可视化

期待您的反馈！

刘飞来
[你的电话]
[你的邮箱]
```

---

## ✅ 最终检查

提交前确认：

- [ ] GitHub 仓库已创建
- [ ] 代码已推送
- [ ] GitHub Pages 部署成功
- [ ] 在线演示可访问
- [ ] Demo 录屏完成
- [ ] README 已更新链接
- [ ] 邮件模板准备好

---

## 🎉 完成！

所有步骤完成后，你就可以：

1. ✅ 发送邮件提交
2. ✅ 等待面试通知
3. ✅ 准备下一轮面试

**祝你好运！** 🚀
