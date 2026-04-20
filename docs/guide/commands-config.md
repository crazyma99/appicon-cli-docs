# config

Manage custom API sources, search priority, and view the current configuration.

The config file is stored at `~/.appicon/config.json`.

## Subcommands

### config show

Print the current configuration:

```bash
appicon config show
```

### config add-source

Register a custom appicon-server instance:

```bash
appicon config add-source \
  --name "company" \
  --url "https://icons.example.com" \
  --key "your-api-key" \
  --priority 1
```

| Flag | Description | Required |
|------|-------------|----------|
| `--name <name>` | Display name for this source | Yes |
| `--url <url>` | Base URL of the appicon-server instance | Yes |
| `--key <key>` | API key for authentication | Yes |
| `--priority <n>` | Priority (lower = queried first) | No (default: `1`) |

### config remove-source

Remove a custom source by name:

```bash
appicon config remove-source --name "company"
```

### config list-sources

List all configured custom sources with their status:

```bash
appicon config list-sources
```

Output:

```
  company [enabled]
    URL:      https://icons.example.com
    Priority: 1
```

### config set-priority

Set the order in which stores are queried:

```bash
appicon config set-priority "custom,apple,google"
```

This means custom servers are searched first, then Apple, then Google.

## Default configuration

When no config file exists, the defaults are:

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

The `cache.ttl` value is in seconds (86400 = 24 hours). The `cache.dir` is platform-dependent:

| Platform | Cache directory |
|----------|----------------|
| macOS | `~/Library/Caches/appicon-cli` |
| Windows | `%LOCALAPPDATA%/appicon-cli/Cache` |
| Linux | `~/.cache/appicon-cli` |
