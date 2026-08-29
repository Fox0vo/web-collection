# Web Collection

一册以原创 SVG 图像与中文编辑故事构成的静态产品视觉志。项目使用 Astro 与 Bun，不加载前端框架、外部字体或远程图片。

## 本地运行

```bash
bun install
bun run dev
```

站点配置了 GitHub Pages 子路径 `/web-collection`。本地开发地址由 Astro 输出；生产构建中的内部链接和资源会自动带上该基础路径。

## 质量检查

```bash
bunx astro check
bun run build
bun run preview
```

## 路由

- `/`：本期导读
- `/gallery`：完整产品志与键盘可操作图像浏览器
- `/gallery/[slug]`：四个静态生成的产品故事
- `/showcase`：组件与状态样张，设置为 `noindex`

## 部署参数

- `site`: `https://fox0vo.github.io`
- `base`: `/web-collection`
- 输出：纯静态 HTML/CSS 与最少量原生对话框、移动导航脚本

视觉与交互约束见根目录的 `DESIGN.md`。该文件是实现的设计系统来源，不应由构建流程改写。
