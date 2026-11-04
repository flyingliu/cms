# 安装说明

## 快速开始

```bash
# 1. 安装依赖
pnpm install

# 2. 启动开发服务器
pnpm dev

# 3. 访问 http://localhost:3000
```

## 如果 pnpm 安装慢

可以使用 npm 或 yarn：

```bash
# 使用 npm
npm install
npm run dev

# 使用 yarn
yarn install
yarn dev
```

## 国内加速

如果使用国内网络，可以配置镜像：

```bash
# 设置 npm 镜像
npm config set registry https://registry.npmmirror.com

# 然后重新安装
pnpm install
```

## 验证安装

安装完成后，运行：

```bash
pnpm dev
```

应该看到：
```
✓ Ready in xxx ms
- Local:   http://localhost:3000
```

访问以下页面验证功能：
- 首页：http://localhost:3000
- Project 1: http://localhost:3000/dashboard
- Project 2: http://localhost:3000/products
- CMS 后台：http://localhost:3000/admin/products
