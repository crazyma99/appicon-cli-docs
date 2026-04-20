# Custom Server

**appicon-server** is the companion API server for appicon-cli. It lets you host a private icon library with upload, search, tagging, and a built-in Web UI.

Repository: [github.com/crazyma99/appicon-server](https://github.com/crazyma99/appicon-server)

## Quick start

```bash
git clone https://github.com/crazyma99/appicon-server.git
cd appicon-server
npm install
npm run build
npm start
```

The server starts at `http://localhost:3000` with a default API key of `default-dev-key`.

## API endpoints

All `/api` routes (except `/api/health`) require an `x-api-key` header.

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check (no auth) |
| GET | `/api/icons/search?q=keyword` | Search icons by name or tag |
| GET | `/api/icons/:id` | Get icon metadata |
| GET | `/api/icons/:id/download?size=512&format=png` | Download icon file |
| POST | `/api/icons/upload` | Upload a new icon (multipart) |
| GET | `/api/icons-list?limit=50&offset=0` | List all icons (paginated) |
| GET | `/api/stats` | Server statistics |
| GET | `/api/keys` | List API keys |
| POST | `/api/keys` | Create API key `{ "name": "..." }` |
| DELETE | `/api/keys/:key` | Delete API key |

## Connect the CLI

After your server is running, register it with the CLI:

```bash
appicon config add-source \
  --name "my-server" \
  --url "http://localhost:3000" \
  --key "default-dev-key"
```

Now `appicon search` will include results from your server alongside Apple and Google.

## Upload icons via the API

```bash
curl -X POST http://localhost:3000/api/icons/upload \
  -H "x-api-key: default-dev-key" \
  -F "file=@icon.png" \
  -F "name=MyApp" \
  -F "identifier=com.example.myapp" \
  -F "tags=social,chat"
```

## Web UI

The server includes a built-in web interface. After `npm run build`, open `http://localhost:3000` in a browser to browse, search, and manage icons visually.

## Deployment

### Environment variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |

### Docker (example)

```dockerfile
FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY dist ./dist
COPY public ./public
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

### Storage

appicon-server uses **SQLite** via `better-sqlite3`. The database file is created automatically. Icon files are processed with **Sharp** and stored on disk. For production, consider mounting a persistent volume.

## API key management

For production, delete the default key and create named keys:

```bash
# Create a key
curl -X POST http://localhost:3000/api/keys \
  -H "x-api-key: default-dev-key" \
  -H "Content-Type: application/json" \
  -d '{"name": "ci-pipeline"}'

# Delete default key
curl -X DELETE http://localhost:3000/api/keys/default-dev-key \
  -H "x-api-key: <your-new-key>"
```
