"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// ✅ Aztec Faces with roles/descriptions
const faces = [
  { image: "/aztec-faces/amin.jpg", name: "Amin", desc: "Amin" },
  { image: "/aztec-faces/claire.jpg", name: "Claire", desc: "Aztec Chief Marketing Officer" },
  { image: "/aztec-faces/david.jpg", name: "David", desc: "Aztec Product Marketer" },
  { image: "/aztec-faces/kelsey.jpg", name: "Kelsey", desc: "Aztec Head of Community" },
  { image: "/aztec-faces/roberto.jpg", name: "Robert", desc: "Aztec Global Community Lead" },
  { image: "/aztec-faces/savio.jpg", name: "Savio", desc: "Noir Product Manager" },
];

export default function GamePage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [time, setTime] = useState(45);
  const [gameOver, setGameOver] = useState(false);
  const [matchMessage, setMatchMessage] = useState(""); // ✅ added

  // Load username
  useEffect(() => {
    const user = localStorage.getItem("username");
    if (!user) router.push("/");
    else setUsername(user);
  }, [router]);

  // Initialize cards with image + name + desc
  useEffect(() => {
    const shuffled = [...faces, ...faces]
      .sort(() => Math.random() - 0.5)
      .map((face, index) => ({ id: index, ...face }));
    setCards(shuffled);
  }, []);

  // Timer
  useEffect(() => {
    if (time > 0 && !gameOver) {
      const timer = setTimeout(() => setTime((t) => t - 1), 1000);
      return () => clearTimeout(timer);
    } else if (time === 0) {
      router.push(`/score?matches=${matched.length / 2}&time=0&status=lose`);
    }
  }, [time, gameOver, matched.length, router]);

  // Handle card flip
  const handleFlip = (index) => {
    if (flipped.includes(index) || matched.includes(index) || flipped.length === 2)
      return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    // When two cards are flipped
    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;

      if (cards[first].image === cards[second].image) {
        // ✅ Match found
        setMatched((prev) => [...prev, first, second]);

        // ✅ Display match message
        const name = cards[first].name;
        const desc = cards[first].desc;
        setMatchMessage(`Matched: ${name} - ${desc} 🎉`);

        // Clear flipped + message after short delay
        setTimeout(() => {
          setFlipped([]);
          setMatchMessage("");
        }, 1500);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  // Check for win
  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setTimeout(() => {
        router.push(
          `/score?matches=${matched.length / 2}&time=${time}&status=win`
        );
      }, 1000);
    }
  }, [matched, cards, router, time]);

  const handleRestart = () => router.push("/");

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-white bg-no-repeat bg-fixed"
      style={{
        backgroundImage: "url('/aztec-game-bg.jpg')",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
      }}
    >
      {/* Info Bar */}
{/* === Top Info Bar === */}
<div className="flex items-center justify-center gap-6 mb-8">
  {/* Player Box */}
  <div className="bg-white/20 backdrop-blur-md px-6 py-4 rounded-2xl shadow-md min-w-[160px] text-center">
    <p className="text-sm opacity-80">Player</p>
    <p className="text-xl font-bold">{username}</p>
  </div>

  {/* Time Box — slightly larger */}
  <div className="bg-white/20 backdrop-blur-md px-8 py-5 rounded-2xl shadow-lg min-w-[180px] text-center">
    <p className="text-sm opacity-80">Time</p>
    <p className="text-3xl font-extrabold tracking-wide">{time}s</p>
  </div>

  {/* Matches Box — smaller */}
  <div className="bg-white/20 backdrop-blur-md px-5 py-3 rounded-2xl shadow-md min-w-[120px] text-center">
    <p className="text-sm opacity-80">Matches</p>
    <p className="text-xl font-semibold">
      {matched.length / 2}/{faces.length}
    </p>
  </div>
</div>
      {/* Game Grid */}
{/* === Game Board Container (Aztec Style) === */}
<div className="bg-yellow-500/10 backdrop-blur-md rounded-3xl p-8 shadow-[0_0_25px_rgba(255,215,0,0.3)] border border-yellow-400/20">
  <div className="grid grid-cols-4 gap-4">
    {cards.map((card, index) => {
      const isFlipped = flipped.includes(index) || matched.includes(index);
      return (
        <div
          key={card.id}
          onClick={() => handleFlip(index)}
          className={`w-24 h-28 flex flex-col items-center justify-center cursor-pointer rounded-2xl transition-transform duration-300 ${
            isFlipped
              ? "bg-yellow-400 text-black scale-105"
              : "bg-yellow-900/20 hover:bg-yellow-900/30"
          }`}
        >
          {isFlipped ? (
            <>
              <img
                src={card.image}
                alt="Aztec Face"
                className="w-full h-full object-cover rounded-2xl"
              />
              <p className="absolute bottom-1 text-xs font-semibold text-black bg-yellow-200/80 px-2 rounded-md">
                {card.name}
              </p>
            </>
          ) : (
            <img
              src="/aztec-logo.jpg"
              alt="Aztec Logo"
              className="w-full h-full object-cover rounded-2xl"
            />
          )}
        </div>
      );
    })}
  </div>
</div>

      {/* ✅ Match Message */}
      {matchMessage && (
        <div className="mt-6 bg-white/20 text-white px-6 py-3 rounded-full text-center shadow-lg backdrop-blur-md">
          {matchMessage}
        </div>
      )}

      {/* Game Over fallback */}
      {gameOver && (
        <div className="mt-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {matched.length === cards.length ? "🎉 You Win!" : "⏰ Time's Up!"}
          </h2>
          <button
            onClick={handleRestart}
            className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg font-semibold transition"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
