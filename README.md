# Suki+Partners 官网项目

思和朋友们 (Suki + Partners) 上海婚礼策划设计工作室官方网站。

## 项目结构

```
src/
├── index.html              # 首页入口
├── css/                    # 样式文件
│   ├── design-tokens.css   # 设计令牌（变量定义）
│   ├── main.css            # 首页样式
│   └── project.css         # 项目详情页通用样式
├── js/                     # JavaScript 文件
│   └── common.js           # 通用交互脚本
├── pages/                  # 项目详情页
│   ├── project-tree.html       # 01 树
│   ├── project-pulu.html       # 02 噗噜
│   ├── project-onroad.html     # 03 在路上
│   ├── project-wind.html       # 04 与风同频
│   ├── project-dance.html      # 05 起舞吧
│   └── project-playground.html # 06 游乐场
└── new/                    # 图片素材（原始命名）
    └── SP网页图片素材/
```

## 技术栈

- **HTML5** - 语义化标签
- **CSS3** - CSS 变量、Grid、Flexbox
- **Vanilla JavaScript** - 原生 JS，无依赖

## 设计系统

项目采用标准化设计令牌系统，定义在 `css/design-tokens.css`：

### 色彩系统

| 变量 | 用途 |
|------|------|
| `--color-primary-*` | 主色（苔绿色系） |
| `--color-secondary-*` | 辅助色（木质暖色） |
| `--color-neutral-*` | 中性色（灰度） |
| `--color-text-*` | 文本色 |
| `--color-bg-*` | 背景色 |

### 排版系统

- 基于 1.25 模块化缩放比例
- 变量：`--font-size-xs` 至 `--font-size-5xl`
- 字体：系统字体栈 + Playfair Display

### 间距系统

- 基于 8px 网格系统
- 变量：`--space-1` (4px) 至 `--space-32` (128px)
- 语义别名：`--space-xs` 至 `--space-3xl`

### 动效系统

- 时长：150ms（快）/ 250ms（正常）/ 400ms（慢）
- 缓动：`--ease-out`、`--ease-in-out`、`--ease-spring`

## 本地开发

由于是纯静态项目，可使用任意静态服务器：

```bash
# 使用 Python
cd src
python -m http.server 8080

# 使用 Node.js (npx)
npx serve src

# 使用 VS Code Live Server 插件
# 右键 index.html -> Open with Live Server
```

访问 `http://localhost:8080` 查看效果。

## 浏览器支持

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 无障碍特性

- 语义化 HTML 结构
- `:focus-visible` 键盘焦点样式
- 图片 alt 属性
- `aria-hidden` 装饰性元素标记
- `prefers-reduced-motion` 动画偏好支持

## 性能优化

- 图片懒加载 (`loading="lazy"`)
- CSS 变量减少代码重复
- 外部 CSS/JS 文件可缓存
- Intersection Observer 优化动画触发

## 联系方式

- 邮箱：siqinnn@foxmail.com
- 小红书：@思和朋友们工作室
