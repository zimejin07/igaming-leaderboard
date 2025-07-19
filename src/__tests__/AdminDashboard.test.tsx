// Import necessary testing utilities from React Testing Library
import { render, screen } from "@testing-library/react";

import AdminDashboard from "@/app/admin/page";
import { usePlayerStore } from "@/lib/store";

// Mock the usePlayerStore hook to control its behavior during tests
jest.mock("@/lib/store", () => ({
  usePlayerStore: jest.fn(),
}));

// Define a mock function for fetchPlayers
const mockFetchPlayers = jest.fn();

// Define a mock array of players to simulate stored data
const mockPlayers = [
  {
    id: "1",
    name: "Test Player",
    score: 100,
    updatedAt: new Date(),
  },
];

// Test suite for the AdminDashboard component
describe("Admin Dashboard", () => {
  // Setup function that runs before each test in this suite
  beforeEach(() => {
    // Mocking the return value of usePlayerStore to include players and fetchPlayers
    (usePlayerStore as unknown as jest.Mock).mockReturnValue({
      players: mockPlayers,
      fetchPlayers: mockFetchPlayers,
    });
  });

  // Test case to check if the player list renders correctly
  it("renders player list", () => {
    // Render the AdminDashboard component
    render(<AdminDashboard />);
    
    // Assertions to verify different parts of the player list are present
    expect(screen.getByText("Admin Dashboard")).toBeInTheDocument(); // Check if dashboard header is displayed
    expect(screen.getByText("Test Player")).toBeInTheDocument();    // Check if player name is displayed
    expect(screen.getByText(/Score:/i)).toBeInTheDocument();        // Check if the score label is displayed
    expect(screen.getByText("Edit")).toBeInTheDocument();           // Check if Edit option is displayed
    expect(screen.getByText("Delete")).toBeInTheDocument();         // Check if Delete option is displayed
  });

  // Test case to ensure form inputs are rendered
  it("renders form inputs", () => {
    // Render the AdminDashboard component
    render(<AdminDashboard />);
    
    // Assertions to confirm form input elements have appropriate labels
    expect(screen.getByLabelText("Name")).toBeInTheDocument();     // Check for Name input field
    expect(screen.getByLabelText("Score")).toBeInTheDocument();    // Check for Score input field
  });
});
