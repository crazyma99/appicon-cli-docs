# Getting Started

## Installation

```bash
# npm
npm install -g appicon-cli

# pnpm
pnpm add -g appicon-cli

# or run directly with npx
npx appicon-cli search "Figma"
```

After installation the `appicon` command is available globally.

## Your first search

```bash
appicon search "Spotify"
```

This queries both Apple App Store and Google Play and prints a table of results:

```
  #  Name                 Developer           Store   Identifier
  1  Spotify              Spotify AB          apple   324684580
  2  Spotify: Music ...   Spotify Ltd.        google  com.spotify.music
  ...
```

## Your first download

Pick an identifier from the search results and download the icon:

```bash
appicon download 324684580
```

By default this saves a 512x512 PNG to the current directory. Customize size, format, and output path:

```bash
appicon download com.spotify.music --sizes 64,256,1024 -f webp -o ./icons
```

Output:

```
  64x64   → ./icons/Spotify_64.webp
  256x256 → ./icons/Spotify_256.webp
  1024x1024 → ./icons/Spotify_1024.webp
```

## Get detailed info

```bash
appicon info 324684580
```

This prints the app name, developer, rating, genre, version, store URL, and available icon URLs at standard sizes (64, 128, 256, 512, 1024).

## JSON output

Every command accepts `--json` for machine-readable output:

```bash
appicon search "Notion" --json | jq '.results[0].identifier'
```

## Next steps

- [search command reference](/guide/commands-search)
- [download command reference](/guide/commands-download)
- [Batch processing](/guide/commands-batch)
- [Configure custom servers](/guide/commands-config)
