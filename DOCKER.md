# Docker Setup Guide

## Prerequisites
- Docker & Docker Compose installed
- Your Neon PostgreSQL DATABASE_URL

## Quick Start

1. **Create .env file in root directory:**
```bash
cp .env.example .env
```

2. **Add your DATABASE_URL to .env:**
```
DATABASE_URL="postgresql://your-neon-connection-string"
```

3. **Build and start containers:**
```bash
docker-compose up --build
```

4. **Access the app:**
- Frontend: http://localhost
- Backend API: http://localhost:5000/api
- Health check: http://localhost:5000/api/health

## Commands

```bash
# Start in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down

# Rebuild after code changes
docker-compose up --build

# Remove everything including volumes
docker-compose down -v
```

## Production Deployment

For production, update:
1. Change ports in `docker-compose.yml` if needed
2. Add SSL/TLS configuration to nginx
3. Set proper CORS origins in backend
4. Use Docker secrets for DATABASE_URL

## Architecture

- **Frontend**: Nginx serving Vite build (port 80)
- **Backend**: Node.js API server (port 5000)
- **Database**: External Neon PostgreSQL (no container needed)

Nginx proxies `/api/*` requests to the backend container.
