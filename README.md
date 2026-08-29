# Web Collection

一册按品牌、型号与配色整理的静态本地键盘目录。项目使用 Astro 与 Bun，不加载前端框架、外部字体或远程图片。

## 本地运行

```bash
bun install
bun run dev
```

站点配置了 GitHub Pages 子路径 `/web-collection`。本地开发地址由 Astro 输出；生产构建中的内部链接和资源会自动带上该基础路径。

## 质量检查

```bash
bun run check
bun run build
bun run test:e2e
```

端到端测试会先构建站点，再自行启动本地预览服务。

## 路由

- `/`：4 个品牌、7 组型号、27 组配色与 41 张本地图的目录导读
- `/gallery/`：按 SKN、迈从 MCHOSE、EPOMAKER、VGN 分组的型号目录
- `/gallery/[model]/`：静态生成的型号页；颜色以 `#color-<slug>` 锚点分节，并展示全部本地正面图版本
- `/showcase`：组件与状态样张，设置为 `noindex`

## 本地图片

运行时图片位于 `src/assets/keyboards/`，文件名使用稳定的 ASCII 路径并保留源文件扩展名。Astro 在构建时解析图片元数据；目录数据声明了不存在的资源时，构建会失败。`.tmp/` 仅作为本地清单来源，不参与运行时输出。

## 部署参数

- `site`: `https://fox0vo.github.io`
- `base`: `/web-collection`
- 输出：纯静态 HTML/CSS、本地优化图片与最少量原生对话框、移动导航脚本

视觉与交互约束见根目录的 `DESIGN.md`。该文件是实现的设计系统来源，不应由构建流程改写。
