# info

Display detailed metadata and icon URLs for a single app.

## Usage

```bash
appicon info <identifier> [options]
```

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `-s, --store <store>` | Force a specific store | auto-detect |
| `-c, --country <code>` | Store region | `us` |
| `--json` | Output JSON | -- |

## Examples

```bash
appicon info 324684580
```

Output:

```
  Spotify - Music and Podcasts
  Developer:  Spotify AB
  Store:      apple
  Genre:      Music
  Rating:     4.8
  Version:    9.0.24
  Store URL:  https://apps.apple.com/app/id324684580

  Icon URLs:
    64    https://is1-ssl.mzstatic.com/.../64x64bb.png
    128   https://is1-ssl.mzstatic.com/.../128x128bb.png
    256   https://is1-ssl.mzstatic.com/.../256x256bb.png
    512   https://is1-ssl.mzstatic.com/.../512x512bb.png
    1024  https://is1-ssl.mzstatic.com/.../1024x1024bb.png
```

Get JSON for scripting:

```bash
appicon info com.spotify.music --json
```

The JSON output includes all fields from the table view plus an `iconUrls` array with `{ size, url }` objects for standard sizes (64, 128, 256, 512, and 1024 for Apple).

## Use cases

- Quickly grab a direct icon URL to paste into a document or Figma file.
- Check which sizes are available before downloading.
- Verify app metadata (version, developer, rating) without opening a browser.
