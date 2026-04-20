# 自建图标服务器

[appicon-server](https://github.com/crazyma99/appicon-server) 是 appicon-cli 的配套服务端，用于搭建私有图标库。

## 功能

- 上传和管理应用图标
- 支持多尺寸、多格式存储
- API Key 认证
- 全文搜索
- 内置 Web 管理界面
- SQLite 存储，零外部依赖

## 快速部署

### 本地运行

```bash
git clone https://github.com/crazyma99/appicon-server.git
cd appicon-server
npm install
npm run dev
```

服务器默认在 `http://localhost:3000` 启动，默认 API Key 为 `default-dev-key`。

### Docker 部署

```bash
docker run -d \
  -p 3000:3000 \
  -v appicon-data:/app/data \
  -e API_KEY=your-secret-key \
  crazyma99/appicon-server
```

### 环境变量

| 变量 | 默认值 | 说明 |
| --- | --- | --- |
| `PORT` | `3000` | 监听端口 |
| `API_KEY` | `default-dev-key` | 初始 API Key |

## API 接口

所有 `/api` 路由（除 `/api/health`）需要在请求头中携带 `X-API-Key`。

### 健康检查

```
GET /api/health
```

```json
{ "status": "ok", "version": "0.1.0" }
```

### 搜索图标

```
GET /api/icons/search?q=<keyword>&limit=20
```

请求头：`X-API-Key: your-api-key`

返回：

```json
{
  "results": [
    {
      "id": "wechat",
      "name": "微信",
      "developer": "Tencent",
      "category": "Social",
      "iconUrl": "/api/icons/wechat/download?size=512",
      "sizes": [128, 256, 512]
    }
  ],
  "total": 1
}
```

### 获取图标详情

```
GET /api/icons/:id
```

### 下载图标文件

```
GET /api/icons/:id/download?size=512&format=png
```

### 上传图标

```
POST /api/icons/:id/upload
Content-Type: multipart/form-data
```

### API Key 管理

```bash
# 列出所有 Key
GET /api/keys

# 创建新 Key
POST /api/keys
{ "name": "ci-bot" }

# 删除 Key
DELETE /api/keys/:key
```

## 连接 CLI

部署完成后，将服务器添加为 appicon-cli 的数据源：

```bash
# 添加数据源
appicon config add-source \
  --name my-server \
  --url https://icons.example.com/api \
  --key your-api-key

# 设置优先查询自建服务器
appicon config set-priority "custom,apple,google"

# 测试搜索
appicon search "微信"
```

## Web 管理界面

appicon-server 内置了一个 Web 管理界面，访问 `http://localhost:3000` 即可使用。支持：

- 浏览和搜索已有图标
- 上传新图标
- 管理 API Key
- 查看服务器统计信息

## 生产环境建议

- 使用反向代理（Nginx / Caddy）添加 HTTPS
- 替换默认 API Key
- 定期备份 SQLite 数据文件
- 使用 Docker volume 持久化数据目录
