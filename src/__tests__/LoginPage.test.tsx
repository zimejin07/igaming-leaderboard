import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "@/app/login/page";
import { useRouter } from "next/navigation";
import "@testing-library/jest-dom";

// Mock router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("LoginPage", () => {
  it("shows error on invalid credentials", async () => {
    // Setup the mock function to handle navigation
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    // Render the LoginPage component
    render(<LoginPage />);

    // Simulate user input for username and password fields
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "wrong" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongpass" },
    });

    // Click the login button to submit form
    fireEvent.click(screen.getByText("Login"));

    // Assert that the error message is displayed
    expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();

    // Assert that navigation has not occurred
    expect(push).not.toHaveBeenCalled();
  });
});
