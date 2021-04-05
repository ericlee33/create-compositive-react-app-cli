# create-compositive-react-app-cli

## 目标
减少从0到1搭建项目的成本，快速开发项目

在create-react-app v4.0.3脚手架基础上，增加redux + react-router + lint配置等常用从零构建项目所需库的模板

### 提供cli环境，初定为提供以下功能
- 一键快速创建views层组件
- 一键快速创建components组件
- 在create时，通过inquirer插件提供给用户各类可选项，可以根据用户所需配置，进行项目自动化构建。
    - 注：状态管理暂时仅提供redux模板
    - 路由管理提供react-router v5模板
- 提供typescript化模板支持（待定）
- 自动安装所需要的@types文件，即便用户使用Javascript进行开发也能在Vscode IDE下得到函数提示支持
- others...


current issues:
```
react-redux还不能做到在App.js自动引入，需要Ast插入支持，下一期做
react-router暂时只能选择history模式，需要模板渲染支持
