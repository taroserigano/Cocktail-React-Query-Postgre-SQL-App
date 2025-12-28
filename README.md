# 🍹 Mixmaster - Full-Stack Cocktail Discovery & Management Platform

**Mixmaster is a modern, full-stack cocktail discovery platform that blends _⚛️ React_, _🧪 React Query_, and a _🗄️ PostgreSQL + Prisma_ backend with a cyberpunk-themed UI.**  
It delivers a high-performance, hybrid data architecture that merges external recipe data from _🍸 TheCocktailDB_ with user-generated cocktails stored in a relational database.

**The application showcases advanced front-end engineering, real-time server-state management, and cloud-powered microservices—including an _⚡ AWS Lambda_ + _📨 Amazon SES_ newsletter system deployed serverlessly for maximum scalability.**


<div align="center">

### 🔗 **[Live Demo](https://cocktail-react-query-postgre-sql-app.onrender.com/)**

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/Node.js-16+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18.2-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.7.0-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![React Query](https://img.shields.io/badge/React_Query-4.29.7-FF4154?style=for-the-badge&logo=react-query&logoColor=white)](https://tanstack.com/query/latest)
[![AWS Lambda](https://img.shields.io/badge/AWS_Lambda-Serverless-FF9900?style=for-the-badge&logo=aws-lambda&logoColor=white)](https://aws.amazon.com/lambda/)
[![Vite](https://img.shields.io/badge/Vite-4.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

**Production-grade full-stack application demonstrating modern web development practices with React, Node.js, PostgreSQL, and serverless architecture.**

<img width="3730" height="1847" alt="image" src="https://github.com/user-attachments/assets/fb3667b5-26f6-44ec-ae6f-60053cafcfac" />
<img width="3742" height="1866" alt="image" src="https://github.com/user-attachments/assets/dc4fc88a-ef12-40b7-b01d-6b1ffca3a7d9" />

<img width="3718" height="1863" alt="image" src="https://github.com/user-attachments/assets/6908fdc8-f12d-480d-be4b-d71bb0f173f0" />
<img width="3743" height="1822" alt="image" src="https://github.com/user-attachments/assets/378e9f51-907b-467e-b107-234a645db07e" />

[Tech Stack](#-tech-stack) • [Key Features](#-key-technical-features) • [Architecture](#️-architecture--technical-overview) • [Getting Started](#-getting-started) • [API Documentation](#-api-endpoints)

</div>

---

## 🛠 Tech Stack

### **Frontend**
```
React 18.2.0          • Modern UI library with hooks & concurrent features
React Router 6.11.2   • Client-side routing & navigation
TanStack Query 4.29   • Server state management, caching & optimistic updates
Styled Components     • CSS-in-JS styling solution with dynamic theming
Axios                 • Promise-based HTTP client
Vite 4.2.0           • Next-generation frontend build tool & dev server
React Toastify       • Toast notification system
```

### **Backend**
```
Node.js 16+          • JavaScript runtime environment
Express 4.18.2       • Fast, unopinionated web framework
Prisma ORM 5.7.0     • Type-safe database client & schema management
PostgreSQL           • Robust relational database (production: Neon serverless)
CORS                 • Cross-origin resource sharing middleware
dotenv               • Environment variable management
Nodemon              • Development auto-restart utility
```

### **Cloud & Infrastructure**
```
AWS Lambda           • Serverless compute for newsletter microservice
Amazon SES           • Email service for newsletter subscriptions
Render.com           • Platform-as-a-service for hosting & deployment
Neon                 • Serverless PostgreSQL with branching
Docker               • Containerization (optional deployment)
PM2                  • Production process manager
```

### **Development & Testing**
```
Vitest               • Unit testing framework powered by Vite
Testing Library      • React component testing utilities
Concurrently         • Run multiple npm scripts simultaneously
ESLint               • Code linting & quality enforcement
Prettier             • Code formatting
```

### **External APIs & Services**
```
TheCocktailDB API    • External cocktail recipe database
```

---

## 🎯 Key Technical Features

### ✅ **Advanced State Management**
- **TanStack React Query** for sophisticated server-state caching
- Automatic background refetching & cache invalidation
- Optimistic updates for instant UI feedback
- Granular loading & error state handling

### ✅ **Serverless Microservices**
- **AWS Lambda** functions for isolated tasks (newsletter)
- **Amazon SES** integration for email delivery
- Event-driven architecture with API Gateway triggers
- Zero infrastructure management, infinite scalability

### ✅ **Type-Safe Database Layer**
- **Prisma ORM** with auto-generated client
- Schema-first design with relational modeling
- Type safety from database to API responses
- Version-controlled migrations

### ✅ **Hybrid Data Architecture**
- Parallel API aggregation (`Promise.allSettled`)
- Merges local database + external API data
- Unified DTO format for consistent frontend consumption
- Resilient error handling (partial success scenarios)

### ✅ **Performance Optimizations**
- Debounced search inputs (300ms delay)
- React Query caching (5min stale time)
- Memoized filter logic with `useMemo`
- Lazy-loaded images & code splitting
- Vite's optimized production builds

### ✅ **Production-Ready Infrastructure**
- Docker containerization with multi-stage builds
- Health check endpoints for monitoring
- Environment-based configuration
- CORS & security headers configured
- Graceful error handling & logging

---

## 🏗️ Architecture & Technical Overview

**Mixmaster** is a production-grade full-stack application built with a **modern 3-tier + serverless architecture**, demonstrating industry best practices for scalable web applications.

### **System Architecture**

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                             │
│  React 18 SPA • Vite • React Query • React Router           │
│  Styled Components • Axios • Toast Notifications            │
└──────────────────────┬──────────────────────────────────────┘
                       │ REST API (HTTP/JSON)
┌──────────────────────▼──────────────────────────────────────┐
│                   API LAYER (Node.js)                        │
│  Express Server • CORS • Middleware • Controllers           │
│                                                              │
│  ┌─────────────┐            ┌──────────────────┐           │
│  │  Cocktail   │◄──────────►│  External API    │           │
│  │ Controller  │            │  (TheCocktailDB) │           │
│  └──────┬──────┘            └──────────────────┘           │
│         │                                                    │
│    ┌────▼─────┐                                             │
│    │  Prisma  │                                             │
│    │  Client  │                                             │
│    └────┬─────┘                                             │
└─────────┼──────────────────────────────────────────────────┘
          │ SQL Queries
┌─────────▼──────────────────────────────────────────────────┐
│              DATA LAYER (PostgreSQL)                        │
│  Neon Serverless Postgres • Prisma Schema • Migrations     │
│                                                              │
│  Tables: Cocktail • Ingredient • CocktailIngredient         │
└──────────────────────────────────────────────────────────────┘

                    ┌──────────────────────┐
                    │  SERVERLESS LAYER    │
                    │  AWS Lambda + SES    │
                    │  Newsletter Service  │
                    └──────────────────────┘
```

### **Technology Choices & Rationale**

| Technology | Why Chosen | Benefits |
|-----------|------------|----------|
| **React 18** | Industry-standard UI library with concurrent rendering | Component reusability, huge ecosystem, excellent performance |
| **TanStack Query** | Replaces Redux for server state | Automatic caching, background sync, reduced boilerplate |
| **Vite** | Modern build tool vs Webpack | 10-20x faster HMR, optimized bundles, better DX |
| **Express** | Minimal, flexible Node.js framework | Fast development, extensive middleware ecosystem |
| **Prisma** | Next-gen ORM vs traditional ORMs | Type safety, auto-migrations, great DX with autocomplete |
| **PostgreSQL** | Robust relational database | ACID compliance, advanced queries, proven scalability |
| **AWS Lambda** | Serverless compute | Pay-per-use, auto-scaling, zero server management |
| **Neon** | Serverless Postgres provider | Auto-scaling, branching, modern developer experience |

---

## ⚡ Key Technical Implementations

### **1. Hybrid Data Aggregation Pattern**
```javascript
// Backend: Parallel API requests with resilient error handling
const [dbResults, apiResults] = await Promise.allSettled([
  prisma.cocktail.findMany({ where: searchQuery }),
  axios.get(`https://thecocktaildb.com/api/json/v1/1/search.php?s=${query}`)
]);

// Merge results regardless of individual failures
const mergedData = [...(dbResults.value || []), ...(apiResults.value || [])];
```
**Benefits:** No single point of failure, faster response times, unified data model

### **2. Advanced React Query Caching Strategy**
```javascript
const { data, isLoading } = useQuery({
  queryKey: ['cocktails', searchTerm, filters],
  queryFn: fetchCocktails,
  staleTime: 5 * 60 * 1000,  // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
  onSuccess: (data) => {
    // Prefetch related queries
    data.forEach(cocktail => {
      queryClient.prefetchQuery(['cocktail', cocktail.id]);
    });
  }
});
```
**Benefits:** Instant navigation, reduced API calls, improved perceived performance

### **3. Prisma Schema with Relational Modeling**
```prisma
model Cocktail {
  id           Int      @id @default(autoincrement())
  name         String
  category     String
  alcoholic    String
  glass        String
  instructions String   @db.Text
  image        String?
  ingredients  CocktailIngredient[]
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model Ingredient {
  id        Int      @id @default(autoincrement())
  name      String   @unique
  cocktails CocktailIngredient[]
  createdAt DateTime @default(now())
}

// Many-to-many junction table
model CocktailIngredient {
  cocktailId   Int
  ingredientId Int
  measure      String?
  cocktail     Cocktail   @relation(fields: [cocktailId], references: [id], onDelete: Cascade)
  ingredient   Ingredient @relation(fields: [ingredientId], references: [id], onDelete: Cascade)
  
  @@id([cocktailId, ingredientId])
}
```
**Benefits:** Normalized data structure, prevents duplication, maintains referential integrity

### **4. Serverless Newsletter Microservice**
```javascript
// AWS Lambda handler
export const handler = async (event) => {
  const { email } = JSON.parse(event.body);
  
  // Validate email
  if (!isValidEmail(email)) {
    return { statusCode: 400, body: 'Invalid email' };
  }
  
  // Send via Amazon SES
  await ses.sendEmail({
    Source: 'newsletter@mixmaster.com',
    Destination: { ToAddresses: [email] },
    Message: { /* email content */ }
  });
  
  return { statusCode: 200, body: 'Subscribed!' };
};
```
**Benefits:** Decoupled architecture, auto-scaling, pay-per-execution pricing

### **5. Performance Optimization Techniques**
```javascript
// Debounced search input
const debouncedSearch = useMemo(
  () => debounce((value) => setSearchTerm(value), 300),
  []
);

// Memoized filtered results
const filteredCocktails = useMemo(() => {
  return cocktails.filter(cocktail => {
    if (filters.category && cocktail.category !== filters.category) return false;
    if (filters.alcoholic && cocktail.alcoholic !== filters.alcoholic) return false;
    return true;
  });
}, [cocktails, filters]);

// Lazy-loaded route components
const CocktailDetail = lazy(() => import('./pages/Cocktail'));
```
**Benefits:** Reduced API calls, prevented re-renders, faster initial load

---

## 📊 Database Schema & Relationships

### **ERD (Entity Relationship Diagram)**
```
┌─────────────────┐         ┌──────────────────────┐         ┌─────────────────┐
│   Cocktail      │         │ CocktailIngredient   │         │   Ingredient    │
├─────────────────┤         ├──────────────────────┤         ├─────────────────┤
│ id (PK)         │◄───────┤ cocktailId (FK)      │         │ id (PK)         │
│ name            │         │ ingredientId (FK)    ├────────►│ name (unique)   │
│ category        │         │ measure              │         │ createdAt       │
│ alcoholic       │         └──────────────────────┘         └─────────────────┘
│ glass           │              (Junction Table)
│ instructions    │         
│ image           │         
│ createdAt       │         
│ updatedAt       │         
└─────────────────┘         

Relationships:
• Cocktail ↔ Ingredient: Many-to-Many (via CocktailIngredient)
• CocktailIngredient stores the "measure" (e.g., "2 oz", "1 tsp")
• Cascading deletes ensure data integrity
```

---

## 🔧 API Endpoints & Documentation

### **RESTful API Design**

#### **Cocktails**
```http
GET    /api/cocktails              # Get all cocktails (DB + external API)
GET    /api/cocktails?search=mar   # Search cocktails
GET    /api/cocktails?category=X   # Filter by category
GET    /api/cocktails/:id          # Get single cocktail by ID
POST   /api/cocktails              # Create new cocktail
PUT    /api/cocktails/:id          # Update existing cocktail
DELETE /api/cocktails/:id          # Delete cocktail
```

#### **Categories**
```http
GET    /api/cocktails/categories   # Get all available categories
```

#### **Health Check**
```http
GET    /api/health                 # Server health status
```

### **Example API Request/Response**

**Create Cocktail:**
```bash
POST /api/cocktails
Content-Type: application/json

{
  "name": "Mojito",
  "category": "Cocktail",
  "alcoholic": "Alcoholic",
  "glass": "Highball glass",
  "instructions": "Muddle mint leaves with sugar and lime juice...",
  "image": "https://example.com/mojito.jpg",
  "ingredients": [
    { "name": "White rum", "measure": "2 oz" },
    { "name": "Lime juice", "measure": "1 oz" },
    { "name": "Mint leaves", "measure": "10 leaves" },
    { "name": "Sugar", "measure": "2 tsp" },
    { "name": "Soda water", "measure": "Top up" }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 42,
    "name": "Mojito",
    "category": "Cocktail",
    "createdAt": "2025-12-28T10:30:00.000Z",
    "ingredients": [
      {
        "ingredient": { "id": 1, "name": "White rum" },
        "measure": "2 oz"
      }
    ]
  }
}
```

---

## 🛠 Tech Stack

### Frontend

| Technology               | Version | Purpose                               |
| ------------------------ | ------- | ------------------------------------- |
| **React**                | 18.2.0  | UI library for building the interface |
| **React Router DOM**     | 6.11.2  | Client-side routing and navigation    |
| **TanStack React Query** | 4.29.7  | Server state management and caching   |
| **Styled Components**    | 5.3.10  | CSS-in-JS styling solution            |
| **React Toastify**       | 9.1.3   | Toast notifications                   |
| **Axios**                | 1.4.0   | HTTP client for API requests          |
| **Vite**                 | 4.2.0   | Build tool and dev server             |

### Backend

| Technology     | Version | Purpose                         |
| -------------- | ------- | ------------------------------- |
| **Node.js**    | 16+     | JavaScript runtime              |
| **Express**    | 4.18.2  | Web application framework       |
| **Prisma**     | 5.7.0   | Next-generation ORM             |
| **PostgreSQL** | Latest  | Relational database             |
| **CORS**       | 2.8.5   | Cross-origin resource sharing   |
| **dotenv**     | 16.3.1  | Environment variable management |

### Cloud & Services

| Technology     | Purpose                                         |
| -------------- | ----------------------------------------------- |
| **AWS Lambda** | Serverless compute for newsletter functionality |
| **Amazon SES** | Simple Email Service for sending newsletters    |
| **Render**     | Cloud platform for hosting and deployment       |

### Design & Styling

- **Custom Fonts**: Orbitron (900 weight) for headings, Space Grotesk (300-700) for body
- **Color Palette**:
  - Primary Purple: `#a855f7`
  - Neon Purple: `#bf00ff`
  - Accent Blue: `#0ea5e9`
  - Neon Blue: `#00f5ff`
  - Dark Background: `#0a0a0a`
- **Effects**: Glassmorphism, neon glows, shimmer gradients, particle animations

### External APIs

- **TheCocktailDB API**: Source for thousands of cocktail recipes and data

### Database Schema

```prisma
model Cocktail {
  id          Int      @id @default(autoincrement())
  name        String
  category    String
  alcoholic   String
  glass       String
  instructions String  @db.Text
  image       String?
  ingredients CocktailIngredient[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Ingredient {
  id          Int      @id @default(autoincrement())
  name        String   @unique
  cocktails   CocktailIngredient[]
  createdAt   DateTime @default(now())
}

model CocktailIngredient {
  cocktailId   Int
  ingredientId Int
  measure      String?
  cocktail     Cocktail   @relation(fields: [cocktailId], references: [id], onDelete: Cascade)
  ingredient   Ingredient @relation(fields: [ingredientId], references: [id], onDelete: Cascade)
  @@id([cocktailId, ingredientId])
}
```

### Development Tools

- **Concurrently**: Run frontend and backend simultaneously in development
- **Nodemon**: Auto-restart server on file changes
- **Prisma Studio**: Visual database management
- **PM2**: Production process manager (optional)

---

## 🚀 Getting Started

### **Prerequisites**

```bash
Node.js >= 16.0.0
npm >= 8.0.0
PostgreSQL >= 13 (or Neon serverless account)
```

### **Quick Start (5 minutes)**

```bash
# 1. Clone repository
git clone <your-repo-url>
cd mixmaster

# 2. Install dependencies (root + server)
npm install
cd server && npm install && cd ..

# 3. Setup environment variables
# Create server/.env file:
echo "DATABASE_URL=postgresql://user:pass@localhost:5432/mixmaster
PORT=5000" > server/.env

# 4. Initialize database
cd server
npx prisma generate    # Generate Prisma Client
npx prisma migrate dev # Apply migrations
cd ..

# 5. Start development servers
npm run dev            # Runs frontend (5173) + backend (5000)
```

### **Environment Configuration**

**`server/.env`:**
```env
NODE_ENV=development
PORT=5000

# Local PostgreSQL:
DATABASE_URL="postgresql://user:password@localhost:5432/mixmaster"

# Neon Serverless PostgreSQL (recommended):
DATABASE_URL="postgresql://user:pass@ep-xxx.region.aws.neon.tech/mixmaster?sslmode=require"

# AWS Lambda (optional - for newsletter feature):
AWS_LAMBDA_ENDPOINT="https://xxxxx.lambda-url.us-east-1.on.aws/"
```

### **Development Commands**

```bash
# Frontend
npm run dev              # Start Vite dev server (port 5173)
npm run build            # Production build
npm run preview          # Preview production build

# Backend (cd server first)
npm run dev              # Start with nodemon (port 5000)
npm start                # Start production server
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Run database migrations
npm run prisma:studio    # Open Prisma Studio GUI

# Testing
npm test                 # Run tests
npm run test:coverage    # Generate coverage report
```

### **Database Management**

```bash
cd server

# View data with Prisma Studio
npx prisma studio        # Opens at http://localhost:5555

# Create new migration
npx prisma migrate dev --name description

# Reset database (development only!)
npx prisma migrate reset

# Deploy to production
npx prisma migrate deploy
```

---

## 📁 Project Structure

```
mixmaster/
├── 📂 src/                          # Frontend React application
│   ├── 📂 components/               # Reusable React components
│   │   ├── CocktailCard.jsx        # Individual cocktail display
│   │   ├── CocktailList.jsx        # Grid layout component
│   │   ├── CocktailListSkeleton.jsx# Loading state UI
│   │   ├── FilterBar.jsx           # Filter pills UI
│   │   ├── Navbar.jsx              # Navigation header
│   │   └── SearchForm.jsx          # Debounced search input
│   ├── 📂 pages/                   # Route-based page components
│   │   ├── Landing.jsx             # Home page with search
│   │   ├── Cocktail.jsx            # Detail page with CRUD
│   │   ├── MyCocktails.jsx         # Create cocktail form
│   │   ├── About.jsx               # About/info page
│   │   ├── Newsletter.jsx          # Newsletter subscription
│   │   └── Error.jsx               # 404 error page
│   ├── 📂 assets/wrappers/         # Styled Components
│   ├── App.jsx                     # Root component + routing
│   ├── main.jsx                    # React entry point
│   ├── config.js                   # Environment config
│   └── index.css                   # Global styles
│
├── 📂 server/                      # Backend Node.js application
│   ├── 📂 controllers/             # Business logic layer
│   │   └── cocktailController.js  # CRUD operations
│   ├── 📂 routes/                  # Express routes
│   │   └── cocktails.js           # API endpoint definitions
│   ├── 📂 prisma/                  # Database management
│   │   ├── schema.prisma          # Database schema
│   │   ├── client.js              # Prisma Client instance
│   │   └── 📂 migrations/          # Version-controlled migrations
│   ├── server.js                  # Express server entry
│   ├── package.json               # Server dependencies
│   └── .env                       # Environment variables
│
├── 📂 public/                      # Static assets
│   ├── cocktail-icon.svg          # Favicon
│   └── _redirects                 # SPA routing config
│
├── 📂 dist/                        # Production build output (generated)
│
├── 📄 package.json                 # Root dependencies & scripts
├── 📄 vite.config.js               # Vite bundler config
├── 📄 docker-compose.yml           # Docker orchestration
├── 📄 Dockerfile                   # Container definition
├── 📄 ecosystem.config.cjs         # PM2 process config
└── 📄 README.md                    # This file
```

---

## 🌐 Deployment

### **Production Deployment (Render.com)**

**Method 1: One-Click Deploy**
```bash
# render.yaml is pre-configured
git push origin main  # Render auto-deploys on push
```

**Method 2: Manual Setup**
1. Create account at [render.com](https://render.com)
2. New → Web Service
3. Connect GitHub repository
4. Configure:
   - **Build Command:** `npm run build:full`
   - **Start Command:** `npm start`
   - **Environment Variables:**
     - `NODE_ENV=production`
     - `DATABASE_URL=<neon-postgres-url>`
5. Deploy!

### **Alternative Platforms**

```bash
# Railway.app
railway up

# Heroku
heroku create mixmaster-app
git push heroku main

# DigitalOcean App Platform
doctl apps create --spec .do/app.yaml

# Docker
docker-compose up -d
```

### **Environment Setup (Production)**

```env
NODE_ENV=production
PORT=5000
DATABASE_URL=<production-postgres-url>
FRONTEND_URL=https://your-app.com
AWS_LAMBDA_ENDPOINT=<lambda-function-url>
```

---

## 📸 Application Screenshots

<div align="center">

### Landing Page - Search & Discovery
<img width="3730" height="1847" alt="Landing page with search functionality" src="https://github.com/user-attachments/assets/fb3667b5-26f6-44ec-ae6f-60053cafcfac" />

*Modern card layout with real-time search, category filters, and glassmorphism design*

---

### Cocktail Detail Page
<img width="3742" height="1866" alt="Cocktail detail view" src="https://github.com/user-attachments/assets/dc4fc88a-ef12-40b7-b01d-6b1ffca3a7d9" />

*Full recipe information with ingredients, measurements, and editing capabilities*

---

### My Cocktails - CRUD Interface
<img width="3718" height="1863" alt="Create cocktail form" src="https://github.com/user-attachments/assets/6908fdc8-f12d-480d-be4b-d71bb0f173f0" />

*Custom cocktail creation with dynamic ingredient management*

---

### Responsive Design
<img width="3743" height="1822" alt="Responsive mobile view" src="https://github.com/user-attachments/assets/378e9f51-907b-467e-b107-234a645db07e" />

*Fully responsive across all device sizes with touch-optimized interactions*

</div>

---

## 🎨 Design System

### **Cyberpunk-Inspired UI/UX**

**Color Palette:**
```css
--primary-purple: #a855f7
--neon-purple: #bf00ff
--accent-blue: #0ea5e9
--neon-blue: #00f5ff
--dark-bg: #0a0a0a
--glass-bg: rgba(255, 255, 255, 0.05)
```

**Typography:**
- **Headings:** Orbitron (900 weight) - Futuristic, bold
- **Body:** Space Grotesk (300-700) - Clean, readable

**Visual Effects:**
- Glassmorphism cards (`backdrop-filter: blur(10px)`)
- Neon glow shadows (`box-shadow: 0 0 20px rgba(191, 0, 255, 0.5)`)
- Shimmer gradient animations
- Particle background effects
- Smooth micro-interactions

---

## 🧪 Testing & Quality Assurance

### **Testing Strategy**
```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

### **Test Coverage**
- **Unit Tests:** Component logic with Vitest
- **Integration Tests:** React Testing Library for user interactions
- **API Tests:** Manual testing with Postman/Thunder Client

### **Code Quality Tools**
```bash
# Linting
npm run lint

# Format code
npm run format

# Type checking (if using TypeScript)
npm run type-check
```

---

## 🔒 Security Considerations

- ✅ Environment variables for sensitive data (`.env` files)
- ✅ CORS configured for specific origins
- ✅ SQL injection prevention via Prisma's parameterized queries
- ✅ Input validation on both client and server
- ✅ HTTPS enforced in production
- ✅ Rate limiting on API endpoints (optional: implement with `express-rate-limit`)
- ✅ Helmet.js for HTTP security headers (recommended addition)

---

## 🚧 Future Enhancements & Roadmap

### **Planned Features**
- [ ] User authentication (JWT + OAuth)
- [ ] Favorite cocktails (user-specific)
- [ ] Social sharing (Open Graph tags)
- [ ] Advanced search filters (ingredients, ABV)
- [ ] Cocktail ratings & reviews
- [ ] Recipe recommendations (ML-based)
- [ ] Progressive Web App (PWA) support
- [ ] Real-time updates (WebSockets)
- [ ] Multi-language support (i18n)
- [ ] Dark/light theme toggle

### **Technical Debt**
- [ ] Migrate to TypeScript for full type safety
- [ ] Implement comprehensive E2E tests (Playwright/Cypress)
- [ ] Add Redis caching layer
- [ ] Set up CI/CD pipeline (GitHub Actions)
- [ ] Implement API rate limiting
- [ ] Add monitoring/observability (Sentry, Datadog)

---

## 📚 Learning Resources & Documentation

### **Official Documentation**
- [React Documentation](https://react.dev)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Express.js Guide](https://expressjs.com)
- [PostgreSQL Manual](https://www.postgresql.org/docs/)

### **Tutorials Used**
- [React Router v6 Tutorial](https://reactrouter.com/en/main/start/tutorial)
- [Prisma Getting Started](https://www.prisma.io/docs/getting-started)
- [AWS Lambda with Node.js](https://docs.aws.amazon.com/lambda/latest/dg/lambda-nodejs.html)

---

## 🤝 Contributing

Contributions are welcome! This project follows standard GitHub workflow:

```bash
# 1. Fork the repository
# 2. Create feature branch
git checkout -b feature/amazing-feature

# 3. Commit changes
git commit -m 'Add amazing feature'

# 4. Push to branch
git push origin feature/amazing-feature

# 5. Open Pull Request
```

### **Contribution Guidelines**
- Write clear commit messages
- Update documentation for new features
- Add tests for new functionality
- Follow existing code style
- Ensure all tests pass before PR

---

## 📄 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- **TheCocktailDB API** - Comprehensive cocktail database
- **Figma Community** - Design inspiration
- **React Ecosystem** - Amazing tools & libraries
- **Neon** - Serverless PostgreSQL platform
- **Render.com** - Hassle-free deployment

---

## 📧 Contact & Support

**Developer:** Your Name  
**Email:** your.email@example.com  
**Portfolio:** https://yourportfolio.com  
**LinkedIn:** https://linkedin.com/in/yourprofile

**Project Links:**
- 🔗 Live Demo: https://cocktail-react-query-postgre-sql-app.onrender.com/
- 📂 Repository: https://github.com/yourusername/mixmaster
- 🐛 Issues: https://github.com/yourusername/mixmaster/issues

---

<div align="center">

### ⭐ Star this repo if you found it helpful!

**Built with passion using modern web technologies**

🍹 **Happy Mixing!** 🍹

---

![Footer](https://img.shields.io/badge/Made%20with-React%20%E2%9D%A4-61DAFB?style=for-the-badge)
![Footer](https://img.shields.io/badge/Powered%20by-Node.js-339933?style=for-the-badge)
![Footer](https://img.shields.io/badge/Database-PostgreSQL-4169E1?style=for-the-badge)

</div>
