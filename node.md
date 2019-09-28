## 主进程 - Main Process
- 可以使用和系统对接的Electron API：创建菜单、上传文件等
- 创建渲染进程：Renderer Process
- 全面支持Node.js
- 只有一个，作为整个程序的入口点

## 渲染进程 - Renderer Process
- 可以有多个，每个对应一个窗口
- 每个都是一个单独的进程
- 全面支持Node.js和DOM API
- 可以使用一部分Electron提供的API

## 进程间通讯
- Electron使用IPC（Interprocess Communication）在进程之间进行通讯，和Chromium一致
![](http://image.liuxuan.site/blog/20190928/IPC.png)