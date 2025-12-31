# 用户管理系统 (User Management System)

一个基于 React 19 + TypeScript + Vite 的现代化用户管理系统，提供了完整的用户注册、登录、资料查看和编辑功能。采用现代前端技术栈，包含完整的软件工程文档和设计图表。

## 功能特性

### 用户注册
- 用户名、密码注册（密码强度验证）
- 邮箱或手机号验证
- 验证码发送和验证流程
- 个人简介填写

### 用户资料管理
- 用户资料查看（姓名、邮箱、手机号、简介、偏好设置）
- 用户资料编辑
- 状态管理（查看/编辑模式切换）

### 技术特性
- **前端框架**: React 19 + TypeScript
- **构建工具**: Vite
- **样式框架**: Tailwind CSS + Flowbite React
- **状态管理**: React Context + useReducer
- **代码质量**: ESLint + TypeScript 严格模式

## 快速开始

### 环境要求
- Node.js >= 18
- npm 或 yarn

### 安装依赖
```bash
npm install
```

### 运行开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览构建结果
```bash
npm run preview
```

### 代码检查
```bash
npm run lint
```

## 项目结构

```
src/
├── components/          # React 组件
│   ├── Home.tsx        # 首页组件
│   ├── UserRegistration.tsx  # 用户注册组件
│   ├── UserProfileView.tsx   # 用户资料查看组件
│   └── UserProfileEditor.tsx # 用户资料编辑组件
├── contexts/           # React Context
│   └── AppContext.tsx  # 应用状态管理
├── assets/             # 静态资源
├── App.tsx             # 主应用组件
└── main.tsx            # 应用入口

mmd/                    # Mermaid 图表文档
├── 用例图.mmd         # 系统用例图
├── 类图.mmd          # 系统类图
├── 序列图_用户注册过程.mmd  # 注册流程序列图
├── 流程图_用户注册逻辑.mmd  # 注册逻辑流程图
├── 状态图_用户注册过程.mmd  # 注册状态图
└── ...                # 其他设计图表

public/                 # 公共资源
```

## 设计文档

项目包含完整的软件工程设计文档，位于 `mmd/` 目录下：

- **用例图**: 系统功能和用户交互的整体视图
- **类图**: 系统类结构和关系
- **序列图**: 用户注册和资料编辑的交互流程
- **流程图**: 业务逻辑流程
- **状态图**: 用户注册状态转换
- **ER图**: 数据模型设计

可以使用 [Mermaid](https://mermaid.live/) 或支持 Mermaid 的工具查看这些图表。

## 依赖说明

主要依赖包：

- **React 19**: 用户界面库
- **TypeScript**: 类型安全
- **Tailwind CSS**: 实用优先的CSS框架
- **Flowbite React**: 基于Tailwind的组件库
- **Vite**: 快速构建工具

开发依赖：
- ESLint: 代码检查
- TypeScript 类型定义
- Vite 插件

## 开发说明

### 状态管理
应用使用 React Context + useReducer 进行状态管理：
- 全局状态包含当前视图模式和用户数据
- 支持视图切换（查看/编辑/注册）
- 用户数据更新和持久化

### 组件设计
- 函数式组件 + Hooks
- TypeScript 接口定义数据结构
- 表单验证和错误处理
- 响应式设计

### 样式设计
- Tailwind CSS 实用类
- Flowbite 组件样式
- 自定义过渡动画
- 移动端响应式布局

## BookMark
- [React 官方中文文档](https://zh-hans.react.dev/)
- [Promise - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/)
- [Styling with utility classes - Core concepts - Tailwind CSS](https://tailwindcss.com/docs/styling-with-utility-classes)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
