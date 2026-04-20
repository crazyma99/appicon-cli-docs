# setup

Configure appicon as a skill/prompt in AI coding assistants. One command installs a skill file that teaches the AI how to use appicon for searching and downloading app icons.

## Usage

```bash
appicon setup [platform] [options]
```

## Supported Platforms

| Platform | Config Directory | File |
|----------|-----------------|------|
| Claude Code | `.claude/skills/appicon/` | `SKILL.md` |
| Cursor | `.cursor/skills/appicon/` | `SKILL.md` |
| Windsurf | `.windsurf/skills/appicon/` | `SKILL.md` |
| Antigravity | `.agents/skills/appicon/` | `SKILL.md` |
| GitHub Copilot | `.github/prompts/appicon/` | `PROMPT.md` |
| Kiro | `.kiro/steering/appicon/` | `SKILL.md` |
| Codex | `.codex/skills/appicon/` | `SKILL.md` |
| Qoder | `.qoder/skills/appicon/` | `SKILL.md` |

## Options

| Flag | Description |
|------|-------------|
| `--all` | Install for all supported platforms |
| `--global` | Install to home directory instead of cwd |
| `--remove` | Remove the skill from the specified platform(s) |

## Examples

Install for a specific platform:

```bash
appicon setup claude
appicon setup cursor
appicon setup copilot
```

Install for all platforms at once:

```bash
appicon setup --all
```

Interactive mode (shows a numbered list to choose from):

```bash
appicon setup
```

Install globally (to `~/` instead of current project):

```bash
appicon setup claude --global
```

Remove the skill:

```bash
appicon setup --remove claude
appicon setup --remove --all
```

## What gets installed?

A markdown skill file that tells the AI assistant:

- When to activate (user mentions app icons, logos, icon search, etc.)
- Available appicon commands with full option reference
- JSON output formats for programmatic parsing
- Common workflows including Figma MCP integration
- Data source details (Apple, Google Play, Custom)

After installation, restart your AI coding assistant. Then try asking it to search for or download an app icon.
