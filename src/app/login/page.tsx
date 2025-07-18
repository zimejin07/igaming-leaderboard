"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <main className="min-h-screen bg-[#0c0f1a] flex items-center justify-center px-4 text-white">
      <div className="bg-[#1c1f2e] p-8 rounded-md shadow-md w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-bold text-center">Admin Login</h1>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-[#0c0f1a] text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 rounded px-4 py-2 outline-none transition"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#0c0f1a] text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 rounded px-4 py-2 outline-none transition"
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}
        </div>

        <div className="space-y-3">
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium"
          >
            Login
          </button>

          <button
            onClick={() => router.push("/")}
            className="w-full text-sm text-gray-400 hover:text-white underline text-center"
          >
            ← Back to Leaderboard
          </button>
        </div>
      </div>
    </main>
  );
}
