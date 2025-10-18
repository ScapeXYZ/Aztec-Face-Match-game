"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FormPage() {
  const router = useRouter();
  const [twitter, setTwitter] = useState("");
  const [discord, setDiscord] = useState("");
  const [picture, setPicture] = useState(null);

  // handle image upload
  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!twitter || !discord) return alert("Please fill all fields!");

    // save uploaded image to localStorage for winner page
    if (picture) localStorage.setItem("aztec_avatar", picture);

    router.push(`/winner?twitter=${twitter}&discord=${discord}`);
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-white bg-no-repeat bg-fixed"
      style={{
        backgroundImage: "url('/score-bg.jpg')",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white/20 backdrop-blur-md rounded-3xl p-10 shadow-2xl w-full max-w-md flex flex-col items-center relative">
        {/* 👤 Avatar Upload */}
        <label
          htmlFor="avatar-upload"
          className="cursor-pointer mb-6 relative group"
        >
          {picture ? (
            <img
              src={picture}
              alt="Profile Preview"
              className="w-24 h-24 rounded-full border-2 border-yellow-400 shadow-[0_0_15px_rgba(255,215,0,0.6)] object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full border-2 border-dashed border-yellow-400/70 flex items-center justify-center text-sm text-yellow-400/70 group-hover:border-yellow-300 group-hover:text-yellow-300 transition">
              Upload
            </div>
          )}
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handlePictureChange}
            className="hidden"
          />
        </label>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <input
            type="text"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
            placeholder="@yourtwitter"
            className="w-full p-3 rounded-xl text-white outline-none bg-transparent border border-yellow-400 text-center"
          />

          <input
            type="text"
            value={discord}
            onChange={(e) => setDiscord(e.target.value)}
            placeholder="Your Discord username"
            className="w-full p-3 rounded-xl text-white outline-none bg-transparent border border-yellow-400 text-center"
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-yellow-400 to-black hover:from-yellow-500 hover:to-gray-900 text-white font-semibold py-3 rounded-xl mt-2 transition"
          >
            Share My Win! 🚀
          </button>
        </form>
      </div>
    </div>
  );
}
