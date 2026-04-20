# 什么是 appicon-cli？

`appicon-cli` 是一个命令行工具，用于从多个应用商店搜索和下载高清 APP 图标。

## 动机

在设计和产品工作中，我们经常需要获取竞品或合作方的应用图标。手动从应用商店截图再裁剪，既低效又容易丢失分辨率。`appicon-cli` 让你一行命令就能拿到任何 APP 的高清图标。

常见场景：

- 竞品分析时批量收集图标素材
- 设计评审中快速引用真实应用图标
- 自动化工作流中获取图标并推送到 Figma
- 搭建团队内部图标库

## 数据源

| 数据源 | 方式 | 说明 |
| --- | --- | --- |
| Apple App Store | iTunes Search API | 官方公开 API，无需密钥 |
| Google Play | google-play-scraper | 网页抓取，无需密钥 |
| 自建服务器 | appicon-server REST API | 需要 API Key，支持上传和管理 |

## 架构

```
┌─────────────┐
│  appicon     │  CLI 入口（Commander.js）
│  search/     │
│  download/   │  命令模块
│  info/batch/ │
│  config      │
├─────────────┤
│  providers/  │  数据源适配层
│  ├─ apple    │  iTunes API
│  ├─ google   │  Google Play scraper
│  └─ custom   │  自建服务器
├─────────────┤
│  utils/      │  工具函数
│  ├─ image    │  sharp 图片处理（缩放/格式转换）
│  ├─ config   │  配置文件读写（~/.appicon/config.json）
│  ├─ cache    │  搜索结果缓存
│  └─ format   │  表格/颜色输出
└─────────────┘
```

## 技术栈

- **运行时**：Node.js >= 18
- **语言**：TypeScript（tsup 构建）
- **CLI 框架**：Commander.js
- **图片处理**：sharp
- **测试**：Vitest
