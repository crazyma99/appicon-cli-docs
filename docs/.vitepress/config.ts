import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'appicon-cli',
  description: 'Search and download APP icons from Apple App Store, Google Play, and custom servers',
  base: '/appicon-cli-docs/',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/appicon-cli-docs/favicon.svg' }],
  ],

  locales: {
    root: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/guide/getting-started' },
          { text: 'API Server', link: 'https://github.com/crazyma99/appicon-server' },
        ],
        sidebar: [
          {
            text: 'Introduction',
            items: [
              { text: 'What is appicon-cli?', link: '/guide/what-is-appicon' },
              { text: 'Getting Started', link: '/guide/getting-started' },
            ],
          },
          {
            text: 'Commands',
            items: [
              { text: 'search', link: '/guide/commands-search' },
              { text: 'download', link: '/guide/commands-download' },
              { text: 'info', link: '/guide/commands-info' },
              { text: 'batch', link: '/guide/commands-batch' },
              { text: 'config', link: '/guide/commands-config' },
              { text: 'setup', link: '/guide/commands-setup' },
            ],
          },
          {
            text: 'Advanced',
            items: [
              { text: 'Custom Server', link: '/guide/custom-server' },
              { text: 'Claude Code Integration', link: '/guide/claude-code' },
            ],
          },
        ],
      },
    },
    zh: {
      label: '中文',
      lang: 'zh-CN',
      themeConfig: {
        nav: [
          { text: '指南', link: '/zh/guide/getting-started' },
          { text: 'API 服务器', link: 'https://github.com/crazyma99/appicon-server' },
        ],
        sidebar: [
          {
            text: '简介',
            items: [
              { text: '什么是 appicon-cli？', link: '/zh/guide/what-is-appicon' },
              { text: '快速开始', link: '/zh/guide/getting-started' },
            ],
          },
          {
            text: '命令',
            items: [
              { text: 'search 搜索', link: '/zh/guide/commands-search' },
              { text: 'download 下载', link: '/zh/guide/commands-download' },
              { text: 'info 详情', link: '/zh/guide/commands-info' },
              { text: 'batch 批量', link: '/zh/guide/commands-batch' },
              { text: 'config 配置', link: '/zh/guide/commands-config' },
              { text: 'setup 安装', link: '/zh/guide/commands-setup' },
            ],
          },
          {
            text: '进阶',
            items: [
              { text: '自建服务器', link: '/zh/guide/custom-server' },
              { text: 'Claude Code 集成', link: '/zh/guide/claude-code' },
            ],
          },
        ],
      },
    },
  },

  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/crazyma99/appicon-cli' },
    ],
    search: {
      provider: 'local',
    },
  },
})
