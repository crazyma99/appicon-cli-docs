# 快速开始

## 安装

### 全局安装（推荐）

```bash
npm install -g appicon-cli
```

### 使用 npx 直接运行

```bash
npx appicon-cli search "微信"
```

### 从源码构建

```bash
git clone https://github.com/crazyma99/appicon-cli.git
cd appicon-cli
npm install
npm run build
npm link
```

## 系统要求

- Node.js >= 18.0.0
- 安装 sharp 时需要网络连接（自动下载平台预编译包）

## 第一次搜索

搜索关键词为 "twitter" 的应用图标：

```bash
appicon search twitter
```

输出示例：

```
✔ Found 10 results.

  Store   Name               Developer         ID
  ─────   ──────────         ─────────         ──
  apple   X                  X Corp.           id333903271
  google  X                  X Corp.           com.twitter.android
  ...
```

### 指定商店

```bash
# 只搜索 Apple App Store
appicon search twitter -s apple

# 只搜索 Google Play
appicon search twitter -s google
```

### 指定地区

```bash
# 搜索中国区
appicon search "微信" -c cn
```

## 第一次下载

下载微信的图标：

```bash
appicon download id414478124 -o ./icons
```

输出：

```
✔ Downloaded 微信 icon (1 file).
  512x512 → ./icons/微信-512.png
```

### 下载多尺寸

```bash
appicon download id414478124 --sizes 128,256,512,1024 -o ./icons
```

```
✔ Downloaded 微信 icon (4 files).
  128x128   → ./icons/微信-128.png
  256x256   → ./icons/微信-256.png
  512x512   → ./icons/微信-512.png
  1024x1024 → ./icons/微信-1024.png
```

### 指定格式

```bash
appicon download id414478124 -f webp -o ./icons
```

## 下一步

- [search 命令参考](./commands-search.md)
- [download 命令参考](./commands-download.md)
- [批量下载](./commands-batch.md)
- [自建服务器](./custom-server.md)
