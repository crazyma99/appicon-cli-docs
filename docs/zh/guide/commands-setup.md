# setup 安装

为 AI 编码助手配置 appicon skill。一条命令安装 skill 文件，教会 AI 如何使用 appicon 搜索和下载图标。

## 用法

```bash
appicon setup [platform] [选项]
```

## 支持的平台

| 平台 | 配置目录 | 文件 |
|------|---------|------|
| Claude Code | `.claude/skills/appicon/` | `SKILL.md` |
| Cursor | `.cursor/skills/appicon/` | `SKILL.md` |
| Windsurf | `.windsurf/skills/appicon/` | `SKILL.md` |
| Antigravity | `.agents/skills/appicon/` | `SKILL.md` |
| GitHub Copilot | `.github/prompts/appicon/` | `PROMPT.md` |
| Kiro | `.kiro/steering/appicon/` | `SKILL.md` |
| Codex | `.codex/skills/appicon/` | `SKILL.md` |
| Qoder | `.qoder/skills/appicon/` | `SKILL.md` |

## 选项

| 选项 | 说明 |
|------|------|
| `--all` | 为所有支持的平台安装 |
| `--global` | 安装到主目录（而非当前项目） |
| `--remove` | 从指定平台移除 skill |

## 示例

指定平台安装：

```bash
appicon setup claude
appicon setup cursor
appicon setup copilot
```

一键安装所有平台：

```bash
appicon setup --all
```

交互式选择（显示编号列表）：

```bash
appicon setup
```

全局安装（到 `~/`）：

```bash
appicon setup claude --global
```

卸载：

```bash
appicon setup --remove claude
appicon setup --remove --all
```

## 安装了什么？

一个 Markdown skill 文件，告诉 AI 助手：

- 何时激活（用户提到 app 图标、logo、图标搜索等关键词）
- appicon 可用命令及完整参数
- JSON 输出格式
- 常用工作流（包括 Figma MCP 联动）
- 数据源详情（Apple、Google Play、自建服务器）

安装后重启 AI 编码助手，然后试试让它搜索或下载某个 APP 图标。
