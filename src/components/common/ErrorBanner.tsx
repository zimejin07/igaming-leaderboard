import React from "react";

interface ErrorBannerProps {
  message: string;
}

export default function ErrorBanner({ message }: ErrorBannerProps) {
  return (
    <div className="bg-red-600 text-white px-4 py-3 rounded shadow text-center">
      ⚠️ {message}
    </div>
  );
}
