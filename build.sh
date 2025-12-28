#!/bin/bash

echo "🔧 Installing root dependencies (including devDependencies for build)..."
NODE_ENV=development npm install

echo "🏗️ Building React frontend with Vite..."
npm run build

echo "📦 Installing server dependencies (production only)..."
cd server
npm install --omit=dev

echo "🔄 Generating Prisma client..."
npx prisma generate

echo "✅ Build complete!"
