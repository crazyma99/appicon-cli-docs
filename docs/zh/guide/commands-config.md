# config 配置命令

管理 appicon-cli 的配置文件，包括自定义数据源和搜索优先级。

## 配置文件

配置文件位于 `~/.appicon/config.json`，首次运行时自动创建。

默认配置：

```json
{
  "sources": [],
  "defaults": {
    "sizes": [512],
    "format": "png",
    "country": "us"
  },
  "searchPriority": ["custom", "apple", "google"],
  "cache": {
    "dir": "~/Library/Caches/appicon-cli",
    "ttl": 86400
  }
}
```

## 子命令

### config show

显示当前配置：

```bash
appicon config show
```

### config add-source

添加自定义数据源：

```bash
appicon config add-source \
  --name my-server \
  --url https://icons.example.com/api \
  --key your-api-key \
  --priority 1
```

| 选项 | 必填 | 说明 |
| --- | --- | --- |
| `--name <name>` | 是 | 数据源名称（唯一标识） |
| `--url <url>` | 是 | 服务器 API 地址 |
| `--key <key>` | 是 | API Key |
| `--priority <n>` | 否 | 优先级，数字越小越优先（默认 1） |

### config remove-source

移除自定义数据源：

```bash
appicon config remove-source --name my-server
```

### config list-sources

列出所有已配置的自定义数据源：

```bash
appicon config list-sources
```

输出：

```
  my-server [enabled]
    URL:      https://icons.example.com/api
    Priority: 1

  backup-server [enabled]
    URL:      https://backup.example.com/api
    Priority: 2
```

### config set-priority

设置数据源搜索优先级：

```bash
appicon config set-priority "custom,apple,google"
```

搜索时将按此顺序查询数据源。

## 示例

### 添加自建服务器

```bash
# 添加本地开发服务器
appicon config add-source \
  --name local \
  --url http://localhost:3000/api \
  --key default-dev-key

# 验证配置
appicon config list-sources

# 搜索时会同时查询自建服务器
appicon search "figma"
```

### 切换默认地区

直接编辑配置文件：

```bash
# macOS / Linux
vim ~/.appicon/config.json
```

将 `defaults.country` 改为 `cn`：

```json
{
  "defaults": {
    "sizes": [512],
    "format": "png",
    "country": "cn"
  }
}
```

### 优先使用自建服务器

```bash
appicon config set-priority "custom,apple,google"
```

这样搜索时会先查自建服务器，找不到再查 Apple 和 Google。
