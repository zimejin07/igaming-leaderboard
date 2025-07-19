# 🎮 iGaming Leaderboard App

A full-stack application for managing and displaying a real-time leaderboard, built using Next.js with App Router, PostgreSQL, Prisma, Docker, and hardened with security, validation, and testing best practices.

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

## Development Strategy

This project followed an agile, single-sprint delivery model focusing on rapidly releasing a functional MVP. All core features were prioritized and delivered within a single development cycle.

### Release Strategy

- Focused on shipping a fully working full-stack app within one sprint
- Hardened backend and protected admin flows for demo safety
- Leveraged Docker for portability and consistent local setups
- Used seed endpoints to support live demo testing

### Running Locally

```bash
# 1. Clone the repository
git clone https://github.com/zimejin07/igaming-leaderboard.git
cd igaming-leaderboard

# 2. Install dependencies
npm install

# 3. Start with Docker (PostgreSQL + Web App)
docker-compose up --build

# 4. Visit the app
# Open your browser and go to:
http://localhost:3000

# 5. Seed the DB if not auto-seeded
curl -X POST http://localhost:3000/api/seed?token=demo123
```

## Authentication

Admin Login (hardcoded for demo):

- **Username**: `admin`
- **Password**: `demo123`

A valid login sets a token (`demo-token`) in local storage, validated by `middleware.ts`.

---

### API Endpoints

| Method | Endpoint        | Description                  |
|--------|-----------------|------------------------------|
| GET    | /api/player     | Get top 10 players           |
| POST   | /api/player     | Add a new player             |
| PUT    | /api/player/:id | Update a player’s score      |
| DELETE | /api/player/:id | Delete a player              |
| POST   | /api/seed       | Seed DB (token protected)    |

---

### Docker Setup

Start Application

```bash
docker-compose up --build
```

### Services started:

- PostgreSQL at `localhost:5432`
- Web app at `http://localhost:3000`

---

### Testing

Run tests locally (Preferred for speed, but ensure you first execute the docker setup):

```bash
npm run test
```

or via Docker (using test-runner service):

```bash
docker-compose --profile test run --rm test-runner
```

---

### Scripts

- **`test`**: Executes all tests using Jest.
- **`test:ui`**: Runs frontend/UI tests located in the `__tests__` directory.
- **`test:api`**: Executes API-related tests by running a Docker container named `test-runner`.
- **`docker:start`**: Builds and starts up all Docker services defined in the Compose file.
- **`docker:stop`**: Stops and removes all running Docker containers.
- **`docker:test`**: Builds and runs tests specified under the test profile in Docker Compose, stopping upon completion and returning the exit code of the `test-runner`.
- **`seed`**: Executes a seed script with TypeScript (`tsx`) to populate the database.

### Tests cover:

- API integration via Supertest
- Prisma test DB isolation
- Validation failures and error codes

---

<p align="center">
  <img src="/public/preview.png" alt="App Preview" width="600"/>
</p>

---

## Future Enhancements

- Add motion and UI polish using animation libraries like Framer Motion or GSAP
- Optimize performance with query caching and pagination