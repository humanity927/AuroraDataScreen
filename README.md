# 极光数据大屏 AuroraDataScreen

`AuroraDataScreen` 是一个面向生产实习场景的纯前端数据可视化大屏项目。项目围绕产量趋势、设备状态、质量分析、实习任务进度、实时动态与极光智造中枢进行展示，适合作为生产实习、课程设计、前端可视化练习和开源项目展示使用。

当前版本采用 mock 数据模拟真实业务变化，后续可以按现有服务层结构切换为真实 API。

## 效果预览

### 大屏总览

![极光数据大屏总览](docs/images/dashboard-overview.png)

### 极光智造中枢

![极光智造中枢](docs/images/dashboard-hub.png)

### 趋势与质量分析

![生产趋势与质量分析](docs/images/dashboard-charts.png)

## 项目特色

- **16:9 数据大屏布局**：适合课堂展示、项目答辩和大屏截图。
- **极光科技视觉风格**：使用柔和极光背景、HUD 面板、发光边框、动态链路和统一图表色板。
- **模拟实时数据变化**：顶部指标、趋势图、业务节点、实时动态等会持续刷新。
- **中心枢纽态势图**：通过 ECharts 展示生产实习数据中枢与业务节点之间的联动关系。
- **mock / api 可切换结构**：当前使用 mock provider，后续可通过环境变量切换到真实 API。
- **模块化开发**：页面、组件、图表、服务、类型、工具函数分层清晰。
- **质量保障体系**：集成 ESLint、Stylelint、TypeScript 类型检查、Vitest 和 Playwright。

## 技术栈

- Vue 3
- Vite
- TypeScript
- Apache ECharts
- Pinia
- Vue Router
- Axios
- Vitest
- Playwright
- ESLint
- Stylelint
- Prettier

## 快速开始

```bash
npm install
npm run dev
```

默认本地访问地址：

```text
http://127.0.0.1:5173/
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

当前默认使用 mock 数据：

```env
VITE_DATA_SOURCE=mock
```

后续接入真实接口时，可以切换为：

```env
VITE_DATA_SOURCE=api
VITE_API_BASE_URL=https://example.com/api
```

## 项目结构

```text
src/
  components/
    charts/        # ECharts 图表组件
    common/        # 通用面板等基础组件
    dashboard/     # 大屏业务组件
  hooks/           # 组合式函数
  router/          # 路由配置
  services/
    api/           # API 数据源
    mock/          # mock 数据与实时模拟器
  stores/          # Pinia 状态管理
  styles/          # 全局样式与主题变量
  types/           # TypeScript 类型定义
  utils/           # 工具函数与日志模块
  views/           # 页面视图
tests/             # 单元测试
e2e/               # 端到端测试
docs/images/       # README 展示图片
```

## 当前功能模块

- 今日产量、设备在线率、实习任务完成率、异常告警数量
- 生产趋势折线图
- 设备状态环图
- 质量分析组合图
- 极光智造中枢拓扑图
- 实习任务进度
- 实时动态与告警记录
- mock 实时数据模拟

## 代码质量

项目已配置基础质量检查命令：

```bash
npm run lint
npm run test
npm run build
```

其中：

- `lint` 用于检查 TypeScript、Vue 和样式规范。
- `test` 会运行单元测试和 E2E 测试。
- `build` 会先执行类型检查，再进行生产环境构建。

## 开源协议

本项目基于 [MIT License](LICENSE) 开源。
