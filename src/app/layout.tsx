"use client";

import React from "react";
import "./globals.css";

// Defining the types for ErrorBoundary component props and state
type ErrorBoundaryProps = {
  children: React.ReactNode; // The children prop represents any nested components or elements
};

type ErrorBoundaryState = {
  hasError: boolean; // State flag to indicate if an error has occurred
};

// ErrorBoundary component for catching JavaScript errors in child components
class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    // Initializing state with no error
    this.state = { hasError: false };
  }

  // Lifecycle method to update state if an error is caught
  static getDerivedStateFromError() {
    return { hasError: true }; // Set hasError to true when an error occurs
  }

  // Render method that displays fallback UI if there's an error
  render() {
    if (this.state.hasError) {
      // Show error message if an error has been encountered
      return <h1>Something went wrong.</h1>;
    }
    // Render children when no error has been encountered
    return this.props.children;
  }
}

// RootLayout component that serves as a layout wrapper with error handling
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; // Children that will be wrapped inside the RootLayout
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        {" "}
        {/* Setting background and text color */}
        <ErrorBoundary>{children}</ErrorBoundary>{" "}
        {/* Wrap children with ErrorBoundary */}
      </body>
    </html>
  );
}
