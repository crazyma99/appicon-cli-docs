# download 下载命令

根据应用标识符下载图标文件。

## 用法

```bash
appicon download <identifier> [options]
```

## 参数

| 参数 | 说明 |
| --- | --- |
| `identifier` | 应用标识符（必填）。Apple 使用 `id` + 数字，Google 使用包名 |

标识符示例：
- Apple：`id414478124`（微信）
- Google：`com.tencent.mm`（微信）

## 选项

| 选项 | 简写 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `--store <store>` | `-s` | 自动检测 | 指定数据源：`apple` / `google` / `custom` |
| `--size <size>` | | `512` | 图标尺寸（像素） |
| `--sizes <sizes>` | | | 多尺寸，逗号分隔，如 `128,256,512` |
| `--format <format>` | `-f` | `png` | 输出格式：`png` / `jpg` / `webp` |
| `--output <dir>` | `-o` | `.` | 输出目录 |
| `--country <code>` | `-c` | `us` | 国家/地区代码 |
| `--json` | | | 输出 JSON 格式 |

## 示例

### 下载单个图标

```bash
appicon download id414478124
```

### 指定尺寸和格式

```bash
appicon download id414478124 --size 1024 -f webp -o ./icons
```

### 一次下载多个尺寸

```bash
appicon download com.instagram.android --sizes 64,128,256,512 -o ./icons
```

### 自动检测商店

CLI 会根据标识符格式自动判断数据源：

- 以 `id` 开头 + 数字 → Apple App Store
- 包含 `.` 的包名格式 → Google Play
- 其它 → 尝试所有数据源

```bash
# 自动识别为 Apple
appicon download id333903271

# 自动识别为 Google
appicon download com.twitter.android
```

### JSON 输出

```bash
appicon download id414478124 --sizes 256,512 --json
```

```json
{
  "app": "微信",
  "identifier": "id414478124",
  "store": "apple",
  "files": [
    { "size": 256, "format": "png", "path": "./微信-256.png" },
    { "size": 512, "format": "png", "path": "./微信-512.png" }
  ]
}
```

## 图片处理

下载的图标通过 [sharp](https://sharp.pixelplumbing.com/) 进行处理：

- 自动缩放到目标尺寸
- 支持 PNG、JPG、WebP 格式转换
- Apple App Store 最大支持 1024x1024
- Google Play 最大支持 512x512
