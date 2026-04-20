# batch 批量命令

通过 JSON 或 CSV 文件批量下载多个应用的图标。

## 用法

```bash
appicon batch <file> [options]
```

## 参数

| 参数 | 说明 |
| --- | --- |
| `file` | 批量任务文件路径，支持 `.json` 或 `.csv` 格式（必填） |

## 选项

| 选项 | 简写 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `--format <format>` | `-f` | `png` | 输出图片格式：`png` / `jpg` / `webp` |
| `--output <dir>` | `-o` | `.` | 输出目录 |
| `--country <code>` | `-c` | `us` | 国家/地区代码 |
| `--json` | | | 输出 JSON 格式 |

## 文件格式

### JSON 格式

创建 `apps.json`：

```json
[
  { "identifier": "id414478124", "store": "apple", "sizes": [256, 512] },
  { "identifier": "com.instagram.android", "store": "google" },
  { "identifier": "id333903271" }
]
```

字段说明：

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `identifier` | 是 | 应用标识符 |
| `store` | 否 | 指定数据源，不填则自动检测 |
| `sizes` | 否 | 图标尺寸数组，不填则使用配置文件默认值 |

### CSV 格式

创建 `apps.csv`：

```csv
identifier,store,sizes
id414478124,apple,256;512
com.instagram.android,google,
id333903271,,
```

- 第一行为表头
- `sizes` 列使用分号 `;` 分隔多个尺寸
- 留空表示使用默认值

## 示例

### 基础批量下载

```bash
appicon batch apps.json -o ./icons
```

输出：

```
✔ Done: 3 succeeded, 0 failed.
  微信: 2 file(s) downloaded
  Instagram: 1 file(s) downloaded
  X: 1 file(s) downloaded
```

### 批量下载为 WebP

```bash
appicon batch apps.csv -f webp -o ./output
```

### JSON 输出

```bash
appicon batch apps.json --json
```

```json
{
  "results": [
    {
      "app": "微信",
      "identifier": "id414478124",
      "store": "apple",
      "files": [
        { "size": 256, "format": "png", "path": "./icons/微信-256.png" },
        { "size": 512, "format": "png", "path": "./icons/微信-512.png" }
      ]
    }
  ],
  "errors": []
}
```

### 失败处理

批量任务中，单个应用失败不会中断整体流程。失败的条目会在结果中列出：

```
✔ Done: 2 succeeded, 1 failed.
  微信: 2 file(s) downloaded
  Instagram: 1 file(s) downloaded
  com.nonexistent.app: Not found
```

## 实用场景

### 竞品图标收集

创建一个竞品列表文件，定期运行批量下载：

```bash
# 每周更新竞品图标
appicon batch competitors.json --sizes 512,1024 -o ./competitive-analysis/icons
```

### 与 Shell 脚本配合

```bash
# 从文本文件生成 JSON 并批量下载
cat app-ids.txt | jq -R '{ identifier: . }' | jq -s '.' > /tmp/batch.json
appicon batch /tmp/batch.json -o ./icons
```
