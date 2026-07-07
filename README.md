# 极光数据大屏

`AuroraDataScreen` 是一个面向生产实习场景的纯前端数据可视化大屏项目。

项目采用 Vue 3、Vite、TypeScript 与 Apache ECharts 构建，当前数据来源为本地 mock service，后续可通过环境变量切换到真实 API。

## 技术栈

- Vue 3 + Vite + TypeScript
- Apache ECharts
- Pinia + Vue Router
- Axios
- Mock Service 数据层
- Vitest + Vue Test Utils
- Playwright
- ESLint + Prettier + Stylelint
- 统一 Logger 日志模块

## 项目信息

- 英文名称：`AuroraDataScreen`
- 中文名称：极光数据大屏
- 项目类型：生产实习数据可视化大屏
- 开源协议：MIT
- 仓库性质：公开仓库

## 快速开始

```bash
npm install
npm run dev
```

## 常用命令

```bash
npm run dev
npm run build
npm run preview
npm run typecheck
npm run lint
npm run format
npm run test
npm run test:e2e
```

## 数据源切换

默认使用 mock 数据：

```env
VITE_DATA_SOURCE=mock
```

后续接入真实接口时可切换为：

```env
VITE_DATA_SOURCE=api
VITE_API_BASE_URL=https://example.com/api
```

## 目录结构

```text
src/
  assets/
  components/
    common/
    dashboard/
    charts/
  layouts/
  views/
  router/
  stores/
  services/
    api/
    mock/
  hooks/
  utils/
    logger/
  types/
  styles/
tests/
e2e/
```

## 开源协议

本项目基于 MIT License 开源，详见 [LICENSE](LICENSE) 文件。
