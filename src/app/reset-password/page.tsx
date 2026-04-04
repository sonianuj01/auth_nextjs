"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ResetPassword() {
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const resetPassword = async () => {
        try {
            await axios.post('/api/users/reset-password', { token, password });
        } catch (error: any) {
            setError(true);
            console.log(error.response?.data); // fixed typo
        }
    };

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    function handleSubmit(e: any) {
        e.preventDefault();
        resetPassword(); 
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4">
            
            <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 space-y-6">
                
                {/* Heading */}
                <h1 className="text-3xl font-bold text-center text-white">
                    Reset Password 🔒
                </h1>

                <p className="text-gray-300 text-center text-sm">
                    Enter your new password below
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    
                    {/* Input */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">
                            New Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                            className="w-full px-4 py-3 rounded-lg bg-black/40 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-black font-semibold transition-all duration-300 shadow-lg hover:scale-[1.02]"
                    >
                        Update Password
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center text-gray-400 text-sm">
                    Remember your password?{" "}
                    <a href="/login" className="text-orange-400 hover:underline">
                        Login
                    </a>
                </p>

            </div>
        </div>
    );
}