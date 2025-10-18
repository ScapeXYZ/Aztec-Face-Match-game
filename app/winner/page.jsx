"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import html2canvas from "html2canvas";

export default function WinnerPage() {
  const searchParams = useSearchParams();
  const twitter = searchParams.get("twitter");
  const discord = searchParams.get("discord");
  const [shareImage, setShareImage] = useState(null);
  const [copied, setCopied] = useState(false);

  // 🪄 Automatically generate the shareable image when page loads
  useEffect(() => {
    const generateCard = async () => {
      try {
        const card = document.getElementById("winner-container");
        if (!card) return;

        const canvas = await html2canvas(card, {
          useCORS: true,
          backgroundColor: "#000",
          scale: 2,
        });
        const imgData = canvas.toDataURL("image/png");
        setShareImage(imgData);
        alert("✅ Your Aztec Winner Card link has been created! Share it on X ⚡");
      } catch (err) {
        console.error("Error generating card:", err);
      }
    };
    setTimeout(generateCard, 1000);
  }, []);

  // 🔗 Copy the share link
  const handleCopyLink = () => {
    const gameLink = window.location.href;
    navigator.clipboard.writeText(gameLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 🐦 Share on X
  const handleShare = () => {
    const text = `🏆 I just conquered the Aztec Face Match game! 🔥 Matched all faces like a true stealth conqueror! #Aztec #FaceMatch`;
    const url = "https://aztec-face-match.vercel.app/"; // change to your deployed link later
    const shareUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(url)}`;
    window.open(shareUrl, "_blank");
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-white bg-no-repeat bg-cover"
      style={{
        backgroundImage: "url('/score-bg.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
      }}
    >
      {/* 🏆 Main Winner Card */}
      <div
        id="winner-container"
        className="relative p-8 rounded-3xl text-center w-full max-w-sm border border-yellow-500 shadow-[0_0_40px_rgba(255,215,0,0.8)] overflow-hidden"
        style={{
          background: "rgba(0,0,0,0.92)",
          aspectRatio: "3/5",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* faint hologram */}
        <img
          src="/aztec-logo.jpg"
          alt="Aztec Logo"
          className="absolute inset-0 opacity-5 w-full h-full object-contain"
        />

        {/* avatar placeholder */}
        <div className="relative mx-auto w-24 h-24 rounded-full overflow-hidden border-4 border-yellow-400 mb-3">
          <img
            src="/pfp.png"
            alt="Player Avatar"
            className="object-cover w-full h-full"
          />
        </div>

        <h1 className="text-3xl font-bold text-yellow-400 mb-2 z-10">🏆 You Won!</h1>

        <p className="text-yellow-400 text-sm mb-3 tracking-wide z-10">
          🥇 Rank: Aztec Conqueror
        </p>

        <p className="text-xl font-semibold z-10">@{twitter}</p>
        <p className="text-gray-300 mb-4 z-10">Discord: {discord}</p>

        <p className="text-yellow-300 mb-6 leading-relaxed z-10">
          🔥 You’ve matched all faces and proven your skill in the Aztec realm!
        </p>

        <div className="flex flex-col gap-3 mt-4 z-10">
          {/* preview image */}
          {shareImage && (
            <img
              src={shareImage}
              alt="Share Preview"
              className="rounded-2xl border border-yellow-500 shadow-md mx-auto w-full max-w-[250px]"
            />
          )}

          {/* Copy link button */}
          <button
            onClick={handleCopyLink}
            className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 rounded-xl transition"
          >
            {copied ? "✅ Link Copied!" : "Copy Share Link 🔗"}
          </button>

          {/* Share on X button */}
          <button
            onClick={handleShare}
            className="bg-gradient-to-r from-yellow-400 to-black hover:from-yellow-500 hover:to-gray-900 text-white font-semibold py-3 rounded-xl transition"
          >
            Share on X ⚡
          </button>

          {/* Play again */}
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-white text-black font-semibold py-3 rounded-xl hover:bg-gray-200 transition"
          >
            Play Again 🔁
          </button>
        </div>

        {/* footer credit */}
        <p className="absolute bottom-4 left-0 right-0 text-center text-sm italic text-gray-400 z-10">
          made by{" "}
          <a
            href="https://x.com/temitope_isola8"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-yellow-400 hover:text-yellow-300 transition"
          >
            Temidele.base.eth (♦,♦) ☙(💜)
          </a>
        </p>
      </div>
    </div>
  );
}
