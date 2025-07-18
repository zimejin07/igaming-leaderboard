"use client";

import { useEffect, useState } from "react";
import { usePlayerStore } from "@/lib/store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  score: z.number(),
});

type FormData = z.infer<typeof schema>;

export default function AdminDashboard() {
  const { players, fetchPlayers } = usePlayerStore();
  const [editId, setEditId] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  const onSubmit = async (data: FormData) => {
    if (editId) {
      await axios.put(`/api/player/${editId}`, { score: data.score });
    } else {
      await axios.post("/api/player", data);
    }

    reset();
    setEditId(null);
    fetchPlayers();
  };

  const handleEdit = (id: string, name: string, score: number) => {
    setEditId(id);
    setValue("name", name);
    setValue("score", score);
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`/api/player/${id}`);
    fetchPlayers();
  };

  const handleLogout = () => {
    fetch("/api/logout", { method: "POST" }).then(() => {
      router.push("/login");
    });
  };

  return (
    <main className="min-h-screen px-4 py-8 bg-[#0c0f1a] text-white">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 bg-[#1c1f2e] p-6 rounded"
        >
          <div>
            <label className="block text-sm">Name</label>
            <input
              type="text"
              {...register("name")}
              disabled={!!editId}
              className="w-full bg-[#0c0f1a] border border-gray-700 rounded px-3 py-2 text-white"
            />
            {errors.name && (
              <p className="text-red-400 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm">Score</label>
            <input
              type="number"
              {...register("score", { valueAsNumber: true })}
              className="w-full bg-[#0c0f1a] border border-gray-700 rounded px-3 py-2 text-white"
            />
            {errors.score && (
              <p className="text-red-400 text-sm">{errors.score.message}</p>
            )}
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              {editId ? "Update Score" : "Add Player"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={() => {
                  reset();
                  setEditId(null);
                }}
                className="text-sm text-gray-400"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <ul className="grid md:grid-cols-2 gap-4">
          {players.map((p) => (
            <li
              key={p.id}
              className="bg-[#1c1f2e] rounded p-4 flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${p.name}`}
                  alt={p.name}
                  className="w-12 h-12 rounded-full bg-white"
                />
                <div>
                  <p className="font-semibold text-lg">{p.name}</p>
                  <p className="text-sm text-gray-400">
                    Score: {p.score} • {new Date(p.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="space-x-3">
                <button
                  onClick={() => handleEdit(p.id, p.name, p.score)}
                  className="text-blue-400 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="text-red-400 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
