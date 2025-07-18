# iGaming Leaderboard App

A full-stack application for managing and displaying a real-time leaderboard. Built using Next.js (App Router), PostgreSQL, Prisma, Docker, and hardened with security, validation, and testing best practices.

---

## Overview

This app allows:

- Public users to view a leaderboard of the top 10 players
- Admins to add, update, or delete players
- Secure access to protected admin routes
- Real-time auto-refresh using SWR
- Dockerized full-stack deployment with seed control

---

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TailwindCSS, SWR
- **Backend**: REST API, Prisma ORM
- **Database**: PostgreSQL (via Docker)
- **Auth**: Token-based middleware
- **Validation**: Zod
- **Testing**: Jest, Supertest
- **Infrastructure**: Docker + Docker Compose

---

### Running Locally

# 1. Clone the repository
git clone https://github.com/your-username/igaming-leaderboard.git
cd igaming-leaderboard

# 2. Install dependencies
cp .env.example .env
npm install

# 3. Start with Docker (PostgreSQL + Web App)
docker-compose up --build

# 4. Visit the app
http://localhost:3000

# 5. Seed the DB if not auto-seeded
curl -X POST http://localhost:3000/api/seed?token=demo123


## Features

### Leaderboard

- Displays top 10 players
- Shows name, score, last updated
- Auto-refresh enabled
- Responsive UI
- Avatar support (DiceBear)

### Admin Dashboard

- Add, update, delete players
- Form validation with Zod
- Protected route (`/admin`)
- Secure login (`/login`)
- Logout functionality

---

## Authentication

Admin Login (hardcoded for demo):

- **Username**: `admin`
- **Password**: `demo123`

A valid login sets a token (`demo-token`) in local storage, which is validated by `middleware.ts`.

---

## Production Seed Strategy

Vercel cannot access a DB during build, so seeding is handled via a **secure endpoint**:

```bash
curl -X POST https://your-domain.com/api/seed?token=demo123
```

### API Endpoints

Method	Endpoint	Description
GET	/api/player	Get top 10 players
POST	/api/player	Add a new player
PUT	/api/player/:id	Update a player’s score
DELETE	/api/player/:id	Delete a player
POST	/api/seed	Seed DB (token protected)

---

Docker Setup
Start Application

docker-compose up --build

### Services started:

PostgreSQL at localhost:5432

Web app at http://localhost:3000

---

### Testing

Run tests locally:

npm run test

Or via Docker (using test-runner service):

docker compose run --rm test-runner

---

### Tests cover:

    API integration via Supertest

    Prisma test DB isolation

    Validation failures and error codes

---

### Prisma

Model defined in schema.prisma:

model Player {
  id        String   @id @default(cuid())
  name      String   @db.VarChar(100)
  score     Int
  updatedAt DateTime @updatedAt
  createdAt DateTime @default(now())
}

Seed script located in /prisma/seed.ts.

Run locally with:

npx prisma db push && npx prisma db seed

Or use:

npx prisma studio

---

### Project Structure

---

/app
  /leaderboard      → Public leaderboard page
  /admin            → Admin dashboard (protected)
  /login            → Login form
  /api/player       → RESTful routes
  /api/seed         → Secure seed endpoint

/lib
  /store.ts         → Zustand global store
  /hooks            → Custom SWR leaderboard hook
  /prisma.ts        → Prisma client singleton

/tests              → Jest + Supertest test suite
/prisma             → Prisma schema and seed
/middleware.ts      → Route protection for /admin

---

Known Limitations

    Admin credentials are hardcoded (demo purposes)

    Token-based auth is for demonstration only (no sessions or JWT)

    No persistent user login (token is stored in localStorage)

    Avatar service uses open API (DiceBear)

---

<p align="center">
  <img src="/public/preview.png" alt="App Preview" width="300" />
</p>

---