# 万悉科技 AI 全栈工程师笔试题

**候选人**: 真才 AI 全栈工程师  
**技术栈**: Next.js 14 + TypeScript + Tailwind CSS + ECharts  
**完成时间**: 3 天

---

## 📁 项目结构

```
cms/
├── src/
│   ├── app/
│   │   ├── api/                    # API Routes
│   │   │   └── dashboard/
│   │   │       ├── summary/route.ts
│   │   │       ├── questions/route.ts
│   │   │       └── insight/route.ts
│   │   ├── dashboard/              # Project 1: AI Visibility Dashboard
│   │   │   └── page.tsx
│   │   ├── products/               # Project 2: Product Knowledge Center
│   │   │   ├── page.tsx            # 产品列表
│   │   │   └── [slug]/page.tsx     # 产品详情（动态路由）
│   │   ├── admin/
│   │   │   └── products/page.tsx   # CMS 后台管理
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx                # 首页
│   ├── components/
│   │   └── ui/card.tsx             # shadcn/ui 组件
│   ├── data/
│   │   ├── dashboard_data.json     # Project 1 测试数据
│   │   └── brand_knowledge.json    # Project 2 测试数据
│   ├── lib/
│   │   └── utils.ts                # 工具函数
│   └── types/
│       └── index.ts                # TypeScript 类型定义
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

---

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
# 或
npm install
```

### 开发模式

```bash
pnpm dev
```

访问 http://localhost:3000

### 构建生产版本

```bash
pnpm build
pnpm start
```

---

## 📊 Project 1: AI Visibility Dashboard

### 功能实现

✅ **Dashboard 首页**
- 4 个核心指标卡片（Visibility Score、Mentions、Recommendations、Avg Score）
- 趋势图表（ECharts 双轴：折线 + 柱状）
- 平台对比图表

✅ **问题分析**
- 问题列表展示（Question、Platform、Topic、Mentioned、Recommended）
- 2 个筛选条件：Platform 筛选 + Mentioned 状态筛选
- 详情展示（完整回答、引用来源）

✅ **数据流**
- API 1: `GET /api/dashboard/summary` - 获取摘要和平台数据
- API 2: `GET /api/dashboard/questions?platform=&mentioned=` - 获取问题列表（支持筛选）
- API 3: `POST /api/dashboard/insight` - 生成 AI 分析（Mock）

✅ **AI Insight**
- "Generate Analysis" 按钮
- Mock AI 返回分析和推荐
- 800ms 模拟延迟展示 Loading 状态

✅ **可视化**
- ECharts for React
- 趋势图（双轴：Visibility Score + Mentions）
- 平台对比图（多系列柱状图）

### 技术亮点

- **TypeScript 类型安全**: 完整的数据类型定义
- **组件拆分**: Card 组件复用，UI 与逻辑分离
- **Loading/Error 状态**: 完善的用户体验
- **响应式设计**: Tailwind CSS 响应式布局

---

## 📚 Project 2: AI Product Knowledge Center

### 功能实现

✅ **产品列表页** (`/products`)
- 按 Series 分组展示
- 全部产品网格视图
- Series 筛选功能
- SEO Meta 标签（Title、Description、OpenGraph）

✅ **产品详情页** (`/products/[slug]`)
- 动态路由实现
- Overview、Features、BestFor、FAQ 完整展示
- JSON-LD 结构化数据（Product + FAQPage Schema）

✅ **SEO/GEO**
- Next.js Metadata API
- OpenGraph 社交分享优化
- JSON-LD Schema.org 结构化数据：
  - `ItemList` (列表页)
  - `Product` (详情页)
  - `FAQPage` (详情页)
  - `Organization` (品牌信息)

✅ **AskAI**
- 产品列表页通用问答入口
- 产品详情页上下文相关问答
- Mock 回答展示（可接入真实 RAG/LLM）

✅ **CMS 后台管理** (`/admin/products`)
- 产品列表展示
- 新增产品表单
- 编辑产品功能
- 删除确认
- 表单验证

### 数据模型

```
Brand
├── name
├── description
└── website

ProductSeries
├── id
├── name
├── description
└── products[]

Product
├── id
├── seriesId (FK)
├── name
├── slug
├── description
├── keyFeatures[]
├── bestFor[]
└── faqs[]

FAQ
├── question
└── answer
```

---

## 🤖 AI 工具使用说明

### 使用的 AI 工具

| 工具 | 用途 | 使用比例 |
|------|------|----------|
| **Cursor** | 代码生成、类型定义、组件模板 | ~40% |
| **Claude** | 架构设计、JSON-LD Schema、SEO 方案 | ~20% |
| **v0.dev** | Dashboard 布局灵感、UI 组件参考 | ~10% |
| **ECharts Official** | 图表配置生成 | ~10% |
| **人工编写** | 核心逻辑、数据流、业务理解 | ~20% |

### AI 辅助详情

**Cursor 辅助内容:**
- TypeScript 类型定义模板
- Card 组件基础结构
- API Route 错误处理模式
- Tailwind 响应式类名建议

**Claude 辅助内容:**
- JSON-LD Schema 结构设计
- SEO Meta 标签最佳实践
- 动态路由数据获取模式

**人工核心工作:**
- 业务数据模型设计
- API 数据流架构
- 筛选逻辑实现
- CMS 表单验证
- 整体代码质量把控

---

## 🎯 关键设计选择

### 1. 为什么选择 Next.js App Router？

**理由:**
- 原生支持 SSR/SEO（Project 2 核心需求）
- 动态路由简单直观（`[slug]` 文件夹）
- API Routes 与前端同仓库，开发效率高
- Metadata API 简化 SEO 实现

**取舍:**
- 学习曲线比 Vue 稍陡（但 15 年前端经验快速适应）
- 客户端组件需要 `'use client'` 标记

### 2. 为什么使用 JSON 文件而非数据库？

**理由:**
- 3 天时间内避免数据库配置复杂度
- 笔试重点考察前端能力，非数据库设计
- 数据量小（<100 条），JSON 完全够用
- 便于演示和部署

**生产环境改进:**
- 使用 PostgreSQL/MongoDB
- 接入 Headless CMS（Strapi/Sanity）
- 添加缓存层（Redis）

### 3. 为什么选择 ECharts？

**理由:**
- 15 年前端经验中已有 ECharts 使用经验
- 配置灵活，支持复杂图表
- 中文文档完善
- 性能优秀（大数据量）

**替代方案:**
- Recharts（更 React 化，但定制性弱）
- AntV（阿里系，文档稍弱）

### 4. CMS 方案选择

**实现:** 自建简单后台表单

**理由:**
- 比接入外部 CMS 更快（1 小时 vs 4 小时）
- 完全控制表单字段和验证逻辑
- 便于演示数据流

**生产环境:**
- 接入 Strapi/Sanity/Contentful
- 添加权限管理
- 版本控制和审核流程

---

## 🔍 当前方案不足

### Project 1 Dashboard

1. **缺少真实后端**: 数据来自 JSON 文件，无数据库持久化
2. **无用户认证**: Dashboard 应支持多用户/权限
3. **图表交互有限**: 缺少下钻、联动筛选
4. **无导出功能**: 应支持 CSV/PDF 导出
5. **移动端优化不足**: 图表在小屏显示需优化

### Project 2 Knowledge Center

1. **SEO 未验证**: 未使用 Google Search Console 验证
2. **无 Sitemap**: 应生成动态 sitemap.xml
3. **性能优化**: 图片未优化（WebP、懒加载）
4. **国际化**: 无 i18n 支持
5. **CMS 功能简陋**: 无权限、无版本控制、无审核流程

### 通用

1. **无单元测试**: 时间紧张未编写测试
2. **无 E2E 测试**: 应使用 Playwright/Cypress
3. **无 CI/CD**: 未配置自动部署
4. **无监控**: 无错误追踪（Sentry）、无性能监控

---

## 🚀 如果再给 1 周优化计划

### 优先级 1（核心功能增强）- 2-3 天

1. **接入真实 LLM API**
   - 使用真才 AI 现有 RAG 能力
   - Project 1 AI Insight 真实分析
   - Project 2 AskAI 基于知识库回答

2. **数据库集成**
   - MongoDB（现有项目技术栈）
   - 数据持久化
   - API 支持 CRUD

3. **CMS 增强**
   - 用户认证（JWT）
   - 权限控制
   - 版本历史

### 优先级 2（SEO/性能）- 1-2 天

4. **SEO 完整实现**
   - 生成 sitemap.xml
   - robots.txt
   - 结构化数据验证（Google Rich Results）

5. **性能优化**
   - 图片优化（next/image）
   - 代码分割
   - 缓存策略

### 优先级 3（质量保障）- 1-2 天

6. **测试**
   - 单元测试（Vitest）
   - E2E 测试（Playwright）
   - 覆盖率报告

7. **监控与部署**
   - Sentry 错误追踪
   - Vercel 自动部署
   - 性能监控

---

## 📺 Demo 录屏大纲

**时长**: 8-12 分钟

### 0:00-1:00 项目介绍
- 技术栈说明
- 项目结构概览

### 1:00-4:00 Project 1 演示
- Dashboard 首页（指标卡片 + 图表）
- 筛选功能（Platform + Mentioned）
- 问题详情展示
- AI Insight 生成

### 4:00-7:00 Project 2 演示
- 产品列表页（Series 筛选）
- 产品详情页（动态路由）
- SEO 检查（View Source 展示 Meta + JSON-LD）
- AskAI 功能演示

### 7:00-9:00 CMS 后台演示
- 产品列表
- 新增产品表单
- 编辑功能

### 9:00-11:00 代码讲解
- API Route 设计
- TypeScript 类型定义
- 动态路由实现
- JSON-LD Schema 结构

### 11:00-12:00 总结
- AI 工具使用说明
- 优化计划

---

## 📝 提交清单

- [x] 完整代码（Git 仓库）
- [x] README 文档
- [ ] Demo 录屏（待录制）
- [ ] 提交邮件至 career@trendeetech.cn

---

## 📧 联系方式

**邮箱**: [待填写]  
**GitHub**: [待填写]  
**简历**: 另附

---

*感谢评审，期待进一步交流！*
