# info 详情命令

查看应用的详细信息和可用图标尺寸。

## 用法

```bash
appicon info <identifier> [options]
```

## 参数

| 参数 | 说明 |
| --- | --- |
| `identifier` | 应用标识符（必填） |

## 选项

| 选项 | 简写 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `--store <store>` | `-s` | 自动检测 | 指定数据源 |
| `--country <code>` | `-c` | `us` | 国家/地区代码 |
| `--json` | | | 输出 JSON 格式 |

## 示例

### 查看应用信息

```bash
appicon info id414478124
```

输出示例：

```
✔ 微信

  Name:       微信
  Developer:  WeChat
  Store:      apple
  ID:         id414478124
  Genre:      Social Networking
  Rating:     4.9

  Available Icon Sizes:
    64   → https://is1-ssl.mzstatic.com/.../64x64bb.jpg
    128  → https://is1-ssl.mzstatic.com/.../128x128bb.jpg
    256  → https://is1-ssl.mzstatic.com/.../256x256bb.jpg
    512  → https://is1-ssl.mzstatic.com/.../512x512bb.jpg
    1024 → https://is1-ssl.mzstatic.com/.../1024x1024bb.jpg
```

### 查看 Google Play 应用

```bash
appicon info com.instagram.android -s google
```

### JSON 输出

```bash
appicon info id414478124 --json
```

```json
{
  "id": "414478124",
  "name": "微信",
  "identifier": "id414478124",
  "developer": "WeChat",
  "store": "apple",
  "storeUrl": "https://apps.apple.com/app/id414478124",
  "iconUrl": "https://is1-ssl.mzstatic.com/...",
  "rating": 4.9,
  "genre": "Social Networking",
  "iconUrls": [
    { "size": 64, "url": "https://..." },
    { "size": 128, "url": "https://..." },
    { "size": 256, "url": "https://..." },
    { "size": 512, "url": "https://..." },
    { "size": 1024, "url": "https://..." }
  ]
}
```

### 实用技巧

获取最大尺寸图标 URL 并用 `curl` 下载：

```bash
appicon info id414478124 --json | jq -r '.iconUrls[-1].url' | xargs curl -o icon.jpg
```
