"use client";

import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error) {
      console.log("Logout failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center px-6">
      
      <div className="max-w-3xl w-full text-center space-y-8 p-10 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
        
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
          Welcome to your{" "}
          <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
            Authentication App
          </span>
        </h1>

        {/* Description */}
        <p className="text-gray-300 text-lg">
          Secure login, signup, and password management built with Next.js.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-8 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition-all duration-300 shadow-lg hover:scale-105"
          >
            🔓 Logout
          </button>

        </div>

        {/* Footer */}
        <p className="text-gray-400 text-sm">
          Built with ❤️ using Next.js & Tailwind CSS
        </p>

      </div>
    </div>
  );
}