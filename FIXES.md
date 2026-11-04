# 🔧 错误修复记录

## 2024-11-04 17:53 修复

### 错误 1: Client Component 事件处理器问题

**错误信息:**
```
Error: Event handlers cannot be passed to Client Component props.
<form onSubmit={function onSubmit}
```

**原因:** 
产品详情页 `/products/[slug]/page.tsx` 是服务端组件（Server Component），但包含 `onSubmit` 事件处理器的表单。

**解决方案:**
1. 创建独立的客户端组件 `ask-ai-form.tsx`
2. 将表单逻辑移到该客户端组件中
3. 在服务端页面中导入并使用

**文件:**
- 新建：`src/app/products/[slug]/ask-ai-form.tsx` (客户端组件)
- 修改：`src/app/products/[slug]/page.tsx` (导入并使用)

---

### 错误 2: OpenGraph type 不支持 'product'

**错误信息:**
```
Error: Invalid OpenGraph type: product
```

**原因:**
Next.js Metadata API 中 `openGraph.type` 只支持有限的预定义类型：
- `website` (默认)
- `article`
- `book`
- `profile`
- 等

`product` 不是有效的 OpenGraph 类型。

**解决方案:**
将 `type: 'product'` 改为 `type: 'website'`

虽然不能使用 OpenGraph 的 `type` 字段，但我们仍然通过 JSON-LD 的 `Product` Schema 来实现结构化数据，这对 SEO 更有效。

**修改位置:**
`src/app/products/[slug]/page.tsx` line 28

---

## ✅ 验证结果

修复后访问以下页面均正常：

- ✅ http://localhost:3001/products
- ✅ http://localhost:3001/products/datavision-pro
- ✅ http://localhost:3001/products/predictai
- ✅ http://localhost:3001/products/teaminsight

---

## 📝 知识点总结

### Next.js 组件规则

| 组件类型 | 前缀 | 可以 | 不可以 |
|---------|------|------|--------|
| Server Component | 无 | 直接访问数据库、文件系统 | 使用 useState、useEffect、事件处理器 |
| Client Component | `'use client'` | 交互、状态、事件 | 直接访问数据库（需通过 API） |

### 最佳实践

1. **默认使用 Server Component** - 除非需要交互性
2. **提取客户端组件** - 将需要交互的部分提取为独立组件
3. **JSON-LD > OpenGraph type** - 对于产品结构化数据，JSON-LD 更灵活

---

## 🎯 下一步

项目已完全可运行，可以开始录制 Demo 视频！

参考文件：
- `QUICKSTART.md` - 快速开始指南
- `PROJECT_STATUS.md` - 完成度对照表
- `README.md` - 完整文档
