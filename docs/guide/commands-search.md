# search

Search for apps across Apple App Store, Google Play, and custom servers.

## Usage

```bash
appicon search <keyword> [options]
```

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `-s, --store <store>` | Filter by store: `apple`, `google`, `custom`, or `all` | `all` |
| `-c, --country <code>` | ISO country code for the store region | `us` |
| `-l, --limit <number>` | Maximum results per store | `10` |
| `--json` | Output raw JSON instead of a table | -- |

## Examples

Search all stores:

```bash
appicon search "WhatsApp"
```

Search Apple App Store only, Japanese region:

```bash
appicon search "LINE" --store apple --country jp
```

Limit to 5 results and output JSON:

```bash
appicon search "weather" --limit 5 --json
```

Pipe JSON to other tools:

```bash
appicon search "todo" --json | jq '.results[] | select(.store == "apple") | .name'
```

## How it works

1. The CLI resolves which providers to query based on the `--store` flag (default: all enabled providers).
2. All providers are queried concurrently with `Promise.allSettled` -- a failing provider does not block the others.
3. Results are merged, displayed, and cached locally. Repeated searches with the same parameters return the cached response instantly (cache TTL is configurable via `config`).

## Output fields

Each result includes:

- **name** -- App display name
- **developer** -- Publisher / developer name
- **store** -- `apple`, `google`, or `custom`
- **identifier** -- App Store numeric ID, Google Play bundle ID, or custom server slug
- **iconUrl** -- Direct URL to the icon image
- **rating** -- Star rating (when available)
- **genre** -- App category
