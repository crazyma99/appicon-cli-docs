# search 搜索命令

搜索应用图标。

## 用法

```bash
appicon search <keyword> [options]
```

## 参数

| 参数 | 说明 |
| --- | --- |
| `keyword` | 搜索关键词（必填） |

## 选项

| 选项 | 简写 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `--store <store>` | `-s` | `all` | 数据源：`apple` / `google` / `custom` / `all` |
| `--country <code>` | `-c` | `us` | 国家/地区代码（ISO 3166-1 alpha-2） |
| `--limit <number>` | `-l` | `10` | 最大返回数量 |
| `--json` | | | 输出 JSON 格式 |

## 示例

### 基础搜索

```bash
appicon search "微信"
```

### 搜索 Apple App Store 中国区

```bash
appicon search "支付宝" -s apple -c cn
```

### 搜索 Google Play 并限制结果数

```bash
appicon search "instagram" -s google -l 5
```

### JSON 输出（便于脚本处理）

```bash
appicon search "spotify" --json
```

输出结构：

```json
{
  "results": [
    {
      "id": "324684580",
      "name": "Spotify",
      "identifier": "id324684580",
      "developer": "Spotify AB",
      "store": "apple",
      "storeUrl": "https://apps.apple.com/...",
      "iconUrl": "https://is1-ssl.mzstatic.com/...",
      "genre": "Music"
    }
  ],
  "total": 1
}
```

### 配合其他命令使用

搜索后取第一个结果的 ID 下载：

```bash
appicon search "figma" --json | jq -r '.results[0].identifier' | xargs appicon download
```

## 缓存

搜索结果会自动缓存，缓存时间由配置文件中的 `cache.ttl` 控制（默认 86400 秒 = 24 小时）。重复搜索时将直接返回缓存结果。

缓存路径：

| 平台 | 路径 |
| --- | --- |
| macOS | `~/Library/Caches/appicon-cli/` |
| Linux | `~/.cache/appicon-cli/` |
| Windows | `%LOCALAPPDATA%\appicon-cli\Cache\` |
