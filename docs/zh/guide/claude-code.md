# Claude Code + Figma MCP 集成

appicon-cli 可以与 [Claude Code](https://docs.anthropic.com/en/docs/claude-code) 和 Figma MCP 服务器配合使用，实现用自然语言搜索图标并直接插入 Figma 设计稿。

## 工作流概览

```
用户自然语言指令
       ↓
Claude Code 调用 appicon-cli
       ↓
获取图标 URL / 下载图标文件
       ↓
通过 Figma MCP 插入设计稿
```

## 前置条件

1. 已安装 [Claude Code](https://docs.anthropic.com/en/docs/claude-code)
2. 已全局安装 appicon-cli
3. 已配置 Figma MCP 服务器（TalkToFigma 插件）

## 使用示例

### 搜索并下载图标

在 Claude Code 中直接对话：

```
> 帮我搜索 Instagram 的图标，下载 512 和 1024 两个尺寸到 ./assets 目录
```

Claude Code 会执行：

```bash
appicon search "instagram" --json
appicon download id389801252 --sizes 512,1024 -o ./assets
```

### 批量获取竞品图标

```
> 帮我下载这些社交应用的图标：微信、WhatsApp、Telegram、Line，
> 都要 512 尺寸的 PNG，放到 ./social-icons 目录
```

Claude Code 会自动生成批量文件并执行下载。

### 获取图标 URL 用于 Figma

```
> 查一下 Spotify 的图标信息，我需要 512 尺寸的 URL
```

Claude Code 执行：

```bash
appicon info id324684580 --json
```

获取到图标 URL 后，可以通过 Figma MCP 将图标插入设计稿。

## 配合 Figma MCP 自动化

### 搜索图标并插入 Figma

结合 Figma MCP 的 `use_figma` 工具，可以实现完整的自动化流程：

```
> 在 Figma 中创建一个 3x3 的网格，展示这 9 个应用的图标：
> 微信、支付宝、淘宝、抖音、美团、滴滴、饿了么、高德、百度
```

Claude Code 的处理流程：

1. 调用 `appicon search --json` 获取每个应用的图标 URL
2. 通过 Figma MCP 创建网格布局
3. 将图标 URL 设置为 Figma 中图片填充

### JSON 输出是关键

所有命令都支持 `--json` 标志，这是与 Claude Code 集成的关键。JSON 输出可以被 Claude Code 解析并用于后续操作。

```bash
# Claude Code 可以解析这些 JSON 输出
appicon search "figma" --json
appicon info id1284708129 --json
appicon download id1284708129 --sizes 256,512 --json
```

## 提示词技巧

在 Claude Code 中使用 appicon-cli 时，可以这样描述需求：

- "搜索 XX 应用的图标" -- 触发 search 命令
- "下载 XX 的图标到 YY 目录" -- 触发 download 命令
- "查看 XX 应用的详细信息" -- 触发 info 命令
- "批量下载这些应用的图标" -- 触发 batch 命令
- "把图标放到 Figma 里" -- 结合 Figma MCP

## 在 CLAUDE.md 中配置

在项目的 `CLAUDE.md` 文件中添加以下内容，让 Claude Code 自动识别 appicon-cli：

```markdown
## 图标工具

项目使用 appicon-cli 管理应用图标资产。

- 搜索图标：`appicon search <keyword> --json`
- 下载图标：`appicon download <id> --sizes 256,512 -o ./assets/icons`
- 查看详情：`appicon info <id> --json`
- 批量下载：`appicon batch <file.json> -o ./assets/icons`

图标资产存放在 `./assets/icons/` 目录。
```
