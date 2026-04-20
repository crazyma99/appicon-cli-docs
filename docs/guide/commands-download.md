# download

Download an app icon by its store identifier.

## Usage

```bash
appicon download <identifier> [options]
```

The `<identifier>` can be:

- An Apple App Store numeric ID (e.g. `324684580`)
- A Google Play bundle ID (e.g. `com.spotify.music`)
- A custom server slug

The CLI auto-detects which store to query. Override with `--store` if needed.

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `-s, --store <store>` | Force a specific store: `apple`, `google`, or `custom` | auto-detect |
| `--size <size>` | Single icon size in pixels | `512` |
| `--sizes <sizes>` | Comma-separated list of sizes | -- |
| `-f, --format <format>` | Output format: `png`, `jpg`, or `webp` | `png` |
| `-o, --output <dir>` | Output directory | `.` (current dir) |
| `-c, --country <code>` | Store region | `us` |
| `--json` | Output download result as JSON | -- |

## Examples

Download a single 512px PNG:

```bash
appicon download 324684580
```

Download multiple sizes as WebP into a folder:

```bash
appicon download com.spotify.music --sizes 64,128,256,512 -f webp -o ./icons
```

Force Apple store for an ambiguous identifier:

```bash
appicon download com.apple.music --store apple
```

Use in a script:

```bash
appicon download 324684580 --json | jq '.files[].path'
```

## How it works

1. The CLI looks up the app metadata via the appropriate provider.
2. It fetches the highest-resolution icon URL available.
3. Sharp resizes the image to each requested size and converts to the target format.
4. Files are saved as `<AppName>_<size>.<format>` in the output directory.

## Size limits

- **Apple App Store** icons are available up to 1024x1024.
- **Google Play** icons are typically available up to 512x512.
- Requesting a size larger than the source will upscale the image (not recommended).
