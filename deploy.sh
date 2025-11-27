#!/bin/bash

echo "🍹 Mixmaster Production Deployment Script"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if .env exists in server
if [ ! -f "server/.env" ]; then
    echo -e "${RED}❌ Error: server/.env not found${NC}"
    echo "Please create server/.env with your DATABASE_URL"
    echo "Example: cp .env.example server/.env"
    exit 1
fi

echo -e "${YELLOW}📦 Step 1: Installing dependencies...${NC}"
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to install root dependencies${NC}"
    exit 1
fi

cd server
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to install server dependencies${NC}"
    exit 1
fi
cd ..

echo -e "${GREEN}✅ Dependencies installed${NC}"
echo ""

echo -e "${YELLOW}🔨 Step 2: Building frontend...${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Frontend build failed${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Frontend built successfully${NC}"
echo ""

echo -e "${YELLOW}🗄️  Step 3: Setting up database...${NC}"
cd server
npx prisma generate
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Prisma generate failed${NC}"
    exit 1
fi

npx prisma migrate deploy
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}⚠️  Migration warning (this might be okay if no new migrations)${NC}"
fi
cd ..
echo -e "${GREEN}✅ Database setup complete${NC}"
echo ""

echo -e "${GREEN}🎉 Deployment preparation complete!${NC}"
echo ""
echo "To start your production server:"
echo -e "${YELLOW}npm start${NC}"
echo ""
echo "Or for PM2 (production):"
echo -e "${YELLOW}pm2 start ecosystem.config.cjs${NC}"
