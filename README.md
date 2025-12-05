# 🍹 Mixmaster - Premium Cocktail Discovery & Management App - Demo: https://cocktail-react-query-postgre-sql-app.onrender.com/


<div align="center">

![Mixmaster](https://img.shields.io/badge/Mixmaster-Cocktail%20App-a855f7?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=for-the-badge&logo=postgresql)
![Status](https://img.shields.io/badge/Status-Production%20Ready-00ff00?style=for-the-badge)

**A modern, full-stack cocktail discovery and management application with a stunning cyberpunk-inspired design.**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Deployment](#-deployment) • [Screenshots](#-screenshots)

</div>

---

## 📖 About

**Mixmaster** is a sophisticated full-stack web application that allows users to discover, create, and manage cocktail recipes. Built with modern technologies and featuring an ultra-sleek cyberpunk design, it combines data from TheCocktailDB API with a custom PostgreSQL database to provide a comprehensive cocktail management experience.

Whether you're a professional mixologist or a home cocktail enthusiast, Mixmaster offers an intuitive interface to explore thousands of cocktail recipes, save your favorites, create custom recipes, and share them with others.

### What Makes Mixmaster Special?

- 🎨 **Ultra-Modern Design**: Cyberpunk-inspired UI with glassmorphism, neon accents, and animated particle effects
- 🔄 **Hybrid Data**: Seamlessly integrates external API cocktails with your custom creations
- 📱 **Fully Responsive**: Beautiful experience on desktop, tablet, and mobile devices
- ⚡ **Optimized Performance**: React Query caching, debounced search, and loading skeletons
- 🎯 **Production Ready**: Configured for deployment with comprehensive documentation

---

## ✨ Features

### Core Functionality

- **🔍 Smart Search**: Real-time cocktail search with debouncing for optimal performance
- **🎲 Random Cocktail**: Discover new drinks with the "Surprise Me" feature
- **❤️ Favorites System**: Save your favorite cocktails (persisted in localStorage)
- **📝 Create Custom Cocktails**: Build and save your own recipes with image upload
- **✏️ Inline Editing**: Double-click to edit cocktail details on the fly
- **🎯 Advanced Filters**: Filter by alcoholic type, category, and favorites
- **📤 Share Functionality**: Copy cocktail links to clipboard for easy sharing
- **📷 Image Upload**: Upload cocktail images (up to 2MB) with base64 encoding

### User Experience

- **💫 Loading Skeletons**: Smooth loading experience with shimmer animations
- **🔔 Toast Notifications**: Real-time feedback for all user actions
- **🎬 Smooth Animations**: CSS animations throughout the app for premium feel
- **🌊 Particle Background**: Dynamic animated background with 38 floating particles
- **🎨 Glassmorphism UI**: Modern transparent cards with backdrop blur effects
- **✨ Neon Accents**: Eye-catching purple, blue, and pink neon highlights

### Technical Features

- **🔄 Data Merging**: Combines API cocktails with database entries
- **📊 React Query**: Intelligent data caching and synchronization
- **🎯 Route Protection**: Error boundaries and 404 handling
- **🗄️ RESTful API**: Full CRUD operations for cocktail management
- **🔐 Environment Config**: Separate dev/production configurations
- **📱 PWA Ready**: Optimized for progressive web app conversion

---

## 🛠 Tech Stack

### Frontend

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 18.2.0 | UI library for building the interface |
| **React Router DOM** | 6.11.2 | Client-side routing and navigation |
| **TanStack React Query** | 4.29.7 | Server state management and caching |
| **Styled Components** | 5.3.10 | CSS-in-JS styling solution |
| **React Toastify** | 9.1.3 | Toast notifications |
| **Axios** | 1.4.0 | HTTP client for API requests |
| **Vite** | 4.2.0 | Build tool and dev server |

### Backend

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | 16+ | JavaScript runtime |
| **Express** | 4.18.2 | Web application framework |
| **Prisma** | 5.7.0 | Next-generation ORM |
| **PostgreSQL** | Latest | Relational database |
| **CORS** | 2.8.5 | Cross-origin resource sharing |
| **dotenv** | 16.3.1 | Environment variable management |

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

### Prerequisites

- Node.js v16 or higher
- npm or yarn package manager
- PostgreSQL database (local or cloud-based)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd mixmaster
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Install server dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Configure environment variables**
   
   Create `server/.env` file:
   ```env
   NODE_ENV=development
   PORT=5000
   DATABASE_URL="postgresql://user:password@localhost:5432/mixmaster"
   ```
   
   For Neon PostgreSQL:
   ```env
   DATABASE_URL="postgresql://user:pass@ep-xxx.region.aws.neon.tech/mixmaster?sslmode=require"
   ```

5. **Setup database**
   ```bash
   cd server
   npx prisma generate
   npx prisma migrate dev
   cd ..
   ```

6. **Start development servers**
   ```bash
   npm run dev
   ```
   
   This runs:
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:5000`

### Available Scripts

```bash
# Development
npm run dev              # Run frontend + backend concurrently
npm run dev:client       # Run frontend only
npm run dev:server       # Run backend only

# Production
npm run build            # Build frontend for production
npm run build:full       # Build + install server production deps
npm start                # Start production server
npm run preview          # Preview production build locally

# Database
cd server
npx prisma studio        # Open Prisma Studio (database GUI)
npx prisma migrate dev   # Create and apply migrations
npx prisma generate      # Generate Prisma Client
```

---

## 🌐 Deployment

### Quick Deploy to Render.com

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Create Render Service**
   - Go to [render.com](https://render.com)
   - New → Web Service
   - Connect your repository
   - Configure:
     - **Build Command**: `npm run build:full`
     - **Start Command**: `npm start`
     - **Environment Variables**:
       - `NODE_ENV=production`
       - `DATABASE_URL=<your-neon-database-url>`

3. **Deploy!** Render will automatically build and deploy

### Deployment Resources

📚 **Comprehensive guides included:**
- `DEPLOYMENT.md` - Complete deployment guide for all platforms
- `DEPLOY_QUICK.md` - Quick reference commands
- `CHECKLIST.md` - Step-by-step deployment checklist
- `RENDER_DEPLOY.md` - Render.com specific instructions
- `ARCHITECTURE.txt` - Visual architecture diagrams

🚀 **Supported Platforms:**
- Render.com (recommended - free tier)
- Railway.app
- Heroku
- DigitalOcean App Platform
- VPS with PM2

---

## 📸 Screenshots

### Home Page
- Modern card layout with glassmorphism design
- Real-time search with debouncing
- Advanced filters (Type, Category, Favorites)
- Animated particle background

### Cocktail Detail Page
- Full recipe information
- Ingredients list with measurements
- Inline editing capability
- Share functionality
- Add to database option

### My Cocktails Page
- Create custom cocktail form
- Image upload with preview
- Validation and error handling
- Responsive design

---

## 🎨 Design Philosophy

Mixmaster features a **cyberpunk-inspired design system** with:

- **Dark Theme**: Deep black background (`#0a0a0a`) for optimal contrast
- **Glassmorphism**: Transparent cards with backdrop blur for modern aesthetics
- **Neon Accents**: Purple and blue gradients for interactive elements
- **Animations**: Smooth transitions, particle effects, and shimmer gradients
- **Typography**: Custom Google Fonts (Orbitron + Space Grotesk) for premium feel
- **Responsive**: Mobile-first approach ensuring great UX on all devices

---

## 📁 Project Structure

```
mixmaster/
├── src/                          # Frontend source code
│   ├── components/               # Reusable React components
│   │   ├── CocktailCard.jsx     # Individual cocktail card
│   │   ├── CocktailList.jsx     # Grid of cocktail cards
│   │   ├── Navbar.jsx            # Navigation with random button
│   │   ├── SearchForm.jsx        # Search input with debounce
│   │   ├── FilterBar.jsx         # Filter pills component
│   │   └── CocktailListSkeleton.jsx  # Loading skeleton
│   ├── pages/                    # Route components
│   │   ├── Landing.jsx           # Home page with search
│   │   ├── Cocktail.jsx          # Detail page with editing
│   │   ├── MyCocktails.jsx       # Create cocktail form
│   │   ├── About.jsx             # About page
│   │   ├── Newsletter.jsx        # Newsletter page
│   │   └── Error.jsx             # 404 page
│   ├── assets/wrappers/          # Styled components
│   ├── config.js                 # Environment configuration
│   ├── App.jsx                   # Main app component
│   └── index.css                 # Global styles
├── server/                       # Backend source code
│   ├── controllers/              # Business logic
│   │   └── cocktailController.js # CRUD operations
│   ├── routes/                   # API routes
│   │   └── cocktails.js          # Cocktail endpoints
│   ├── prisma/                   # Database schema & client
│   │   └── schema.prisma         # Database models
│   ├── server.js                 # Express app setup
│   ├── package.json              # Server dependencies
│   └── .env                      # Environment variables
├── public/                       # Static assets
│   ├── cocktail-icon.svg         # Custom favicon
│   └── _redirects                # Netlify redirects
├── dist/                         # Production build (generated)
├── package.json                  # Root dependencies & scripts
├── vite.config.js                # Vite configuration
├── deploy.sh                     # Deployment script
├── ecosystem.config.cjs          # PM2 configuration
├── railway.json                  # Railway.app config
└── README.md                     # This file
```

---

## 🔧 API Endpoints

### Cocktails

```
GET    /api/cocktails        # Get all custom cocktails
GET    /api/cocktails/:id    # Get single cocktail by ID
POST   /api/cocktails        # Create new cocktail
PUT    /api/cocktails/:id    # Update cocktail
DELETE /api/cocktails/:id    # Delete cocktail
```

### Health Check

```
GET    /api/health           # Server health status
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the MIT License.

---

## 🙏 Acknowledgments

- **TheCocktailDB API** - For providing comprehensive cocktail data
- **Figma Community** - For design inspiration
- **React Community** - For amazing tools and libraries

---

## 📧 Contact & Support

For questions, issues, or feedback:
- Open an issue on GitHub
- Check the deployment guides in the `/docs` folder

---

<div align="center">

**Built with ❤️ and React**

🍹 **Enjoy Mixmaster!** 🍹

</div>

#### Install and Setup

- npm install
- npm run dev
