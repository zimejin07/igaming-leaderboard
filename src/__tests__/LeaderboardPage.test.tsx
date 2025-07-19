import { render, screen } from "@testing-library/react";
import LeaderboardPage from "@/app/page";
import * as useLeaderboardHook from "@/lib/hooks/useLeaderboard";

// Mock SWR hook
jest.mock("@/lib/hooks/useLeaderboard");
// Test suite for the Leaderboard Page component
describe("Leaderboard Page", () => {
  // Test case to verify the loading state is displayed correctly
  it("shows loading state", () => {
    // Mock the useLeaderboard hook to simulate a loading state
    (useLeaderboardHook.useLeaderboard as jest.Mock).mockReturnValue({
      players: [], // No players data since it's still loading
      isLoading: true, // Indicating that data is being loaded
      error: null, // No error at this point
    });

    // Render the LeaderboardPage component
    render(<LeaderboardPage />);

    // Expectation to check if a loading indicator is visible on the screen
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  // Test case to ensure the error banner is shown when there is an error
  it("shows error banner", () => {
    // Mock the useLeaderboard hook to simulate an error state
    (useLeaderboardHook.useLeaderboard as jest.Mock).mockReturnValue({
      players: [], // No players data due to loading failure
      isLoading: false, // Loading has completed but with an error
      error: new Error("Fetch failed"), // Simulated error object
    });

    // Render the LeaderboardPage component
    render(<LeaderboardPage />);

    // Expectation to verify that the error message is displayed on the screen
    expect(screen.getByText(/failed to load leaderboard/i)).toBeInTheDocument();
  });

  // Test case to check if top players are rendered correctly
  it("renders top players", () => {
    // Mock the useLeaderboard hook to provide player data
    (useLeaderboardHook.useLeaderboard as jest.Mock).mockReturnValue({
      players: [
        { id: "1", name: "Alice", score: 100, updatedAt: new Date() }, // Player 1 data
        { id: "2", name: "Bob", score: 90, updatedAt: new Date() }, // Player 2 data
      ],
      isLoading: false, // Data has been successfully loaded
      error: null, // No errors occurred
    });

    // Render the LeaderboardPage component
    render(<LeaderboardPage />);

    // Expectations to confirm that the players' names appear on the screen
    expect(screen.getByText("Alice")).toBeInTheDocument(); // Alice's name should be displayed
    expect(screen.getByText("Bob")).toBeInTheDocument(); // Bob's name should be displayed
  });
});
