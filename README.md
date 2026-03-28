# PocketPokemon

A modern, full-stack Pokémon application built with React, Next.js, TypeScript, and PostgreSQL.

## Live Demo
[PocketPokemon - Live Application](https://pocketpoke.vercel.app/)

## Features
✓ Search Pokémon by name  
✓ Compare Pokémon stats side-by-side  
✓ Filter by type with pagination  
✓ Persistent favorites (localStorage)  
✓ Detailed view with full stats and abilities  
✓ Professional responsive UI (Material UI)  
✓ Type-safe full-stack (TypeScript + tRPC + Prisma)  
✓ Health check API for uptime monitoring  

## Tech Stack
- **Frontend**: React 19, Next.js 16, TypeScript 5, Material UI 7
- **Backend**: tRPC 11, Node.js
- **Database**: PostgreSQL (Neon - serverless)
- **ORM**: Prisma 5
- **Hosting**: Vercel (serverless)
- **Validation**: Zod 4

## Quick Start (Local Development)

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL running (or Neon account)

### Installation
```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/pokepocket.git
cd pokepocket

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
# Edit .env.local with your DATABASE_URL from Neon

# Migrate and seed database
npm run db:migrate
npm run db:seed

# Start dev server
npm run dev

# Visit http://localhost:3000
```

## 📖 Routes
- `/` - Home with popular Pokémon and navigation
- `/search-poke` - Search single Pokémon by name
- `/compare-poke` - Compare two Pokémon stats
- `/all-type-poke` - Browse by type with pagination
- `/fav` - View saved favorite Pokémon
- `/api/health` - Health check for uptime monitoring

## 💾 Data Persistence
- **Favorites**: Stored in browser localStorage (no backend database needed)
- **Data**: Seeded from `prisma/data/pokemon.json` (1025 Pokémon)

## 🔒 Environment Variables
- `DATABASE_URL` - PostgreSQL connection string from Neon


## 📊 Project Structure
```
pokepocket/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Home route
│   │   ├── search-poke/        # Search route
│   │   ├── compare-poke/       # Compare route
│   │   ├── all-type-poke/      # Filter route
│   │   ├── fav/                # Favorites route
│   │   └── api/                # Backend API
│   │       ├── trpc/           # tRPC endpoints
│   │       └── health/         # Health check
│   ├── components/             # React components
│   │   ├── layout/             # Navigation
│   │   ├── providers/          # Context providers
│   │   └── pocketpokemon/      # Card components
│   ├── server/                 # Backend logic
│   │   ├── db.ts               # Prisma client
│   │   ├── trpc.ts             # tRPC setup
│   │   └── routers/            # API procedures
│   └── types/                  # TypeScript types
├── prisma/
│   ├── schema.prisma           # Database schema
│   ├── seed.ts                 # Data seeding
│   └── data/                   # Seed data
└── package.json
```
