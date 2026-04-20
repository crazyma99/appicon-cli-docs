# Claude Code + Figma Integration

appicon-cli is designed to work seamlessly with **Claude Code** and the **Figma MCP** (Model Context Protocol) server. This enables a workflow where you search for app icons in the terminal and place them directly into a Figma design file without leaving your editor.

## Prerequisites

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) installed and configured
- Figma MCP server connected (via the `TalkToFigma` or `plugin:figma` MCP)
- appicon-cli installed globally

## Workflow overview

```
Claude Code session
  │
  ├─ 1. appicon search "Notion"        ← find the app
  ├─ 2. appicon info 324684580 --json   ← get icon URLs
  ├─ 3. Figma MCP: create_frame         ← build layout in Figma
  └─ 4. Figma MCP: place icon           ← add the icon to the frame
```

## Example: search and place icons

In a Claude Code session, you can ask:

> "Search for the Spotify app icon, download it at 512px, and add it to my Figma file."

Claude Code will:

1. Run `appicon search "Spotify"` to find matching apps.
2. Run `appicon download 324684580 --size 512 -o /tmp` to save the icon locally.
3. Use the Figma MCP tools to create a frame or component and place the icon.

## Example: batch competitive analysis

> "Download icons for these 5 apps and create a competitive analysis grid in Figma: Notion, Slack, Figma, Linear, Arc."

Claude Code will:

1. Create a `batch.json` with the identifiers.
2. Run `appicon batch batch.json --sizes 128,512 -o ./icons`.
3. Use Figma MCP to create a frame grid with labels and icon images.

## JSON output for automation

The `--json` flag on every command makes it easy for Claude Code to parse results programmatically:

```bash
# Get structured data
appicon search "Figma" --json

# Extract the first icon URL
appicon info 324684580 --json | jq '.iconUrls[] | select(.size == 512) | .url'
```

Claude Code can read the JSON output directly and use the URLs or file paths in subsequent Figma MCP calls.

## Tips

- Use `--json` whenever Claude Code is driving the workflow -- it avoids parsing table output.
- Pre-configure your custom server with `appicon config add-source` so that company-internal icons are also searchable.
- Combine with `appicon batch` to process many icons in one step before laying them out in Figma.
- The `info` command is useful for getting multiple icon URL sizes without downloading -- Figma MCP can fetch images directly from URLs.

## Related

- [Figma MCP documentation](https://github.com/nicholasareed/figma-mcp)
- [Claude Code documentation](https://docs.anthropic.com/en/docs/claude-code)
- [config command reference](/guide/commands-config) -- for registering custom servers
