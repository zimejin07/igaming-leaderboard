"use client";

import { useEffect, useState } from "react";
import { usePlayerStore } from "@/lib/store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  score: z.number(),
});

type FormData = z.infer<typeof schema>;

export default function AdminDashboard() {
  const { players, fetchPlayers } = usePlayerStore();
  const [editId, setEditId] = useState<string | null>(null);
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

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8">
        <div>
          <label className="block">Name</label>
          <input
            type="text"
            {...register("name")}
            disabled={!!editId}
            className="border px-2 py-1 w-full"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block">Score</label>
          <input
            type="number"
            {...register("score", { valueAsNumber: true })}
            className="border px-2 py-1 w-full"
          />
          {errors.score && (
            <p className="text-red-500 text-sm">{errors.score.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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
            className="ml-4 text-sm text-gray-600"
          >
            Cancel
          </button>
        )}
      </form>

      <ul>
        {players.map((p) => (
          <li
            key={p.id}
            className="border-b py-2 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{p.name}</p>
              <p className="text-sm text-gray-500">Score: {p.score}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(p.id, p.name, p.score)}
                className="text-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
