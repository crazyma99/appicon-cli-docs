# batch

Download icons for multiple apps in one command using a JSON or CSV file.

## Usage

```bash
appicon batch <file> [options]
```

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `-f, --format <format>` | Output format: `png`, `jpg`, or `webp` | `png` |
| `-o, --output <dir>` | Output directory | `.` |
| `-c, --country <code>` | Store region | `us` |
| `--json` | Output results as JSON | -- |

## File formats

### JSON

An array of objects. Each object must have an `identifier` field. `store` and `sizes` are optional.

```json
[
  { "identifier": "324684580" },
  { "identifier": "com.spotify.music", "store": "google" },
  { "identifier": "com.notion.id", "sizes": [64, 256, 512] }
]
```

### CSV

First row is the header. Columns: `identifier`, `store` (optional), `sizes` (optional, semicolon-separated).

```csv
identifier,store,sizes
324684580,,
com.spotify.music,google,
com.notion.id,,64;256;512
```

## Examples

Download all icons listed in a JSON file:

```bash
appicon batch apps.json -o ./icons
```

Use CSV, output as WebP:

```bash
appicon batch apps.csv -f webp -o ./batch-icons
```

Get structured results for CI:

```bash
appicon batch apps.json --json > results.json
```

## Behavior

- Apps are processed sequentially to avoid rate-limiting.
- If an app is not found, it is recorded as an error and the batch continues.
- The final summary shows how many succeeded and how many failed.
- When `sizes` is omitted for an entry, the default from your config is used (default: `[512]`).

## JSON output structure

```json
{
  "results": [
    {
      "app": "Spotify",
      "identifier": "324684580",
      "store": "apple",
      "files": [
        { "size": 512, "format": "png", "path": "./icons/Spotify_512.png" }
      ]
    }
  ],
  "errors": [
    { "identifier": "com.nonexistent.app", "error": "Not found" }
  ]
}
```
