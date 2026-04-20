<AuthorCard />

# What is appicon-cli?

**appicon-cli** is a command-line tool that lets you search, inspect, and download app icons from multiple sources:

- **Apple App Store** -- via the public iTunes Search API
- **Google Play** -- via a built-in scraper
- **Custom API servers** -- via the companion `appicon-server` project

## Why?

Designers and developers regularly need app icons for competitive analysis, mockups, presentations, and design systems. The typical workflow involves opening a browser, navigating to the store page, right-clicking the image, and hoping you get a decent resolution.

appicon-cli replaces that with a single command:

```bash
appicon search "Notion"
appicon download com.notion.id --sizes 64,256,512
```

## Architecture

```
┌──────────────────────────────────────────────┐
│                 appicon CLI                   │
│  commands: search | download | info | batch   │
└────────┬──────────┬──────────────┬───────────┘
         │          │              │
    ┌────▼───┐ ┌────▼────┐ ┌──────▼──────┐
    │ Apple  │ │ Google  │ │   Custom    │
    │Provider│ │Provider │ │  Provider   │
    │(iTunes)│ │(Scraper)│ │ (REST API)  │
    └────────┘ └─────────┘ └──────┬──────┘
                                  │
                          ┌───────▼───────┐
                          │ appicon-server │
                          │  SQLite + Web  │
                          └───────────────┘
```

### Key design decisions

- **Provider pattern** -- Each data source implements a common `AppProvider` interface (`search`, `lookup`, `getIconUrl`). Adding a new source means adding one file.
- **Smart store detection** -- When you pass an identifier like `com.spotify.music`, the CLI infers that it is likely a Google Play bundle ID and searches Google first. Numeric IDs are sent to Apple. You can always override with `--store`.
- **Local caching** -- Search results are cached to `~/.cache/appicon-cli` (macOS: `~/Library/Caches/appicon-cli`) with a configurable TTL (default 24 hours).
- **Sharp for image processing** -- Icons are resized and converted using [Sharp](https://sharp.pixelplumbing.com/), so you get exactly the size and format you need.

## Requirements

- Node.js >= 18
- npm, pnpm, or yarn
