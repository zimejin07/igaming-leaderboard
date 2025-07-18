#!/bin/bash

echo "Starting Full-Stack iGaming Leaderboard App..."

# Step 1: Build and start all services in the background
docker compose up --build -d

# Step 2: Wait for containers to be ready
echo "Waiting for containers to be ready..."
sleep 5

# Optional: Tail logs to see live output
docker compose logs -f
