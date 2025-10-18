"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ScorePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [username, setUsername] = useState("");
  const [matches, setMatches] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [status, setStatus] = useState("lose"); // default to lose

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (!user) router.push("/");
    else setUsername(user);

    const m = searchParams.get("matches");
    const t = searchParams.get("time");
    const s = searchParams.get("status");

    if (m) setMatches(parseInt(m));
    if (t) setTimeLeft(parseInt(t));
    if (s) setStatus(s);
  }, [router, searchParams]);

  const shareOnTwitter = () => {
    const text =
      status === "win"
        ? `🎉 I just WON Face Match with ${matches}/6 matches and ${timeLeft}s left! Think you can beat me? 😎
Play now 👉 https://face-match.vercel.app`
        : `⏰ Time's up! I scored ${matches}/6 in Face Match. Can you do better?
Play now 👉 https://face-match.vercel.app`;

    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}`;
    window.open(url, "_blank");
  };

  return (
<div
  className="relative flex flex-col items-center justify-center w-screen h-screen text-white text-center overflow-hidden"
  style={{
    backgroundImage: "url('/score-bg.jpg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",   // ensures full image visible
    backgroundPosition: "center",
  }}
>
      <div className="bg-white/20 p-10 rounded-3xl backdrop-blur-md shadow-lg w-80">
        <h1 className="text-4xl font-bold mb-4">
          {status === "win" ? "🎉 You Won!" : "⏰ Time’s Up!"}
        </h1>

        <p className="text-lg mb-2">Player: <strong>{username}</strong></p>
        <p className="text-lg mb-2">Matches: {matches}/6</p>
        <p className="text-lg mb-6">Time Left: {timeLeft}s</p>

<button
  onClick={() => router.push("/form")}
  className="bg-gradient-to-r from-yellow-400 to-black hover:from-yellow-500 hover:to-gray-900 text-white font-semibold px-6 py-2 rounded-xl transition"
>
  Share My Win! ⚡️
</button>

        <button
          onClick={() => router.push("/")}
          className="mt-4 bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg font-semibold transition"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
