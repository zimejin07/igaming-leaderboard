"use client";

import { useState } from "react";

export default function LeaderboardTabs() {
  const [active, setActive] = useState<"daily" | "monthly">("daily");

  return (
    <div className="flex justify-center gap-4">
      {["daily", "monthly"].map((type) => (
        <button
          key={type}
          onClick={() =>
            type !== "monthly" && setActive(type as "daily" | "monthly")
          } // Prevent switching to 'monthly'
          className={`px-6 py-2 rounded-full text-sm font-medium ${
            active === type
              ? "bg-blue-600 text-white"
              : "bg-gray-800 text-gray-400"
          } ${type === "monthly" ? "cursor-not-allowed opacity-50" : ""}`}
          disabled={type === "monthly"} // Disable the button for 'monthly'
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
    </div>
  );
}
