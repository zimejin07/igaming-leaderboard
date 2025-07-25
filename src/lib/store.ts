import { create } from "zustand";

export type Player = {
  id: string;
  name: string;
  score: number;
  avatar?: string;
  updatedAt: string;
};

// Define an interface for the Store which includes the players array and a fetchPlayers function
interface Store {
  players: Player[]; // Array of Player objects
  fetchPlayers: () => Promise<void>; // Function to fetch players asynchronously
}

// Export a Zustand hook (`usePlayerStore`) that creates a store with an initial state
export const usePlayerStore = create<Store>((set) => ({
  players: [], // Initialize the players array as empty

  // Define an asynchronous function to fetch player data from an API endpoint
  fetchPlayers: async () => {
    // Perform a GET request to the specified API endpoint to retrieve player data
    const res = await fetch("/api/player");
    const data = await res.json();
    // Update the store's state with the fetched player data
    set({ players: data });
  },
}));
