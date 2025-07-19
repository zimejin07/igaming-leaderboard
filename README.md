# 🎮 iGaming Leaderboard App

A full-stack application for managing and displaying a real-time leaderboard. Built using Next.js (App Router), PostgreSQL, Prisma, Docker, and hardened with security, validation, and testing best practices.

---

## Overview

This app allows:

- Public users to view a leaderboard of the top 10 players 🏆 
- Admins to add, update, or delete players 🛡️
- Secure access to protected admin routes
- Real-time auto-refresh using SWR 🔄 
- Dockerized full-stack deployment with seed control 🐳
- Integration testing using Jest & Supertest 🧪

---

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TailwindCSS, SWR
- **Backend**: REST API, Prisma ORM
- **Database**: PostgreSQL (via Docker)
- **Auth**: Token-based middleware
- **Validation**: Zod
- **Testing**: Jest, Supertest
- **Infrastructure**: Docker + Docker Compose

---

### Running Locally

# 1. Clone the repository
git clone https://github.com/zimejin07/igaming-leaderboard.git
cd igaming-leaderboard

# 2. Install dependencies
npm install

# 3. Start with Docker (PostgreSQL + Web App)
docker-compose up --build

# 4. Visit the app
http://localhost:3000

# 5. Seed the DB if not auto-seeded
curl -X POST http://localhost:3000/api/seed?token=demo123


## Authentication

Admin Login (hardcoded for demo):

- **Username**: `admin`
- **Password**: `demo123`

A valid login sets a token (`demo-token`) in local storage, which is validated by `middleware.ts`.

---

### API Endpoints

Method	Endpoint	Description
GET	/api/player	Get top 10 players
POST	/api/player	Add a new player
PUT	/api/player/:id	Update a player’s score
DELETE	/api/player/:id	Delete a player
POST	/api/seed	Seed DB (token protected)

---

### Docker Setup

Start Application

docker-compose up --build

### Services started:

PostgreSQL at localhost:5432

Web app at http://localhost:3000

---

### Testing

Run tests locally via Docker (using test-runner service):

docker compose run --rm test-runner

---

### Tests cover:

    API integration via Supertest

    Prisma test DB isolation

    Validation failures and error codes

---

<p align="center">
  <img src="/public/preview.png" alt="App Preview" width="600"  width="800"/>
</p>

---