"use client";

import React from "react";
import "./globals.css";

// Defining the types for ErrorBoundary component props and state
type ErrorBoundaryProps = {
  children: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
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
    return { hasError: true };
  }

  // Render method that displays fallback UI if there's an error
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        {" "}
        <ErrorBoundary>{children}</ErrorBoundary>{" "}
      </body>
    </html>
  );
}
