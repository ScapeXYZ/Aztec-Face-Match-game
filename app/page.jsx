"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleStart = () => {
    if (!username.trim()) return;
    localStorage.setItem("username", username);
    router.push("/game");
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-white bg-no-repeat bg-fixed"
      style={{
        backgroundImage: "url('/aztec-bg.jpg')",
        backgroundSize: "100% 100%", // stretches fully top-bottom & left-right
        backgroundPosition: "center",
      }}
    >
      {/* optional dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* content */}
      <div className="relative z-10 text-center bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-xl">
        <h1 className="text-4xl font-bold mb-6">
          Welcome to Aztec Team Squad
          <br /> Face Match!
        </h1>

        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="px-4 py-2 rounded-md text-white focus:outline-none"
        />

        <button
          onClick={handleStart}
          className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold transition"
        >
          Start Proving
        </button>
      </div>
    </div>
  );
}
