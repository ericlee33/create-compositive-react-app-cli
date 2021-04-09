# create-compositive-react-app-cli

>[npm源地址](https://www.npmjs.com/package/create-compositive-react-app-cli)
## Introduction 脚手架介绍
---
减少从0到1搭建项目的成本，快速开发项目

在`create-react-app` `v4.0.3`脚手架基础上，增加了
- `Redux + React-Redux + Redux-Thunk + Redux-Logger`
- `React-Router` (可选择`History`, `Hash`模式)
- `Linter / Formatter` （目前提供了`Eslint + EditorConfig + Prettier + CommitLint`）

完成模板创建后，自动安装依赖。

## Usage 使用方法
---
### 快速搭建项目
`ccra init <name>`

**配置项有3种可选项**
- Redux
- React-Router (可选择History, Hash模式)
- Linter / Formatter （目前提供了Eslint + EditorConfig + Prettier + CommitLint）
### 快速创建Page、Component模板
`ccra create`

可以在 **CLI** 中自行选择创建 **Page** 或 **Component**
输入 **name** 后即可完成模板自动创建

### Features 功能介绍
---
- 一键快速创建`Page`组件
- 一键快速创建`Components`组件
- 在`ccra init <name>`进行初始化项目时，通过`Inquirer`库的功能，提供给用户各类可选项，可以根据用户所需配置，进行项目自动化构建。
    - 注：状态管理暂时仅提供`Redux`模板
    - 路由管理提供`React-Router` `v5`模板
- 自动安装所需要的`@types`文件，即便用户使用`JavaScript`进行开发，也能在`vscode IDE`下得到函数提示支持


### Contact me 联系我
---
`wechat`: `actuallys`
