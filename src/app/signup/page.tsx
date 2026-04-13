"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";




export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const [error, setError] = useState("");

    const onSignup = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await axios.post("/api/users/signup", user);

            router.push("/login");

        } catch (error: any) {
            const message =
                error.response?.data?.error ||
                error.response?.data?.message ||
                "Something went wrong";

            setError(message);
            toast.error(message);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4">

            <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 space-y-4">

                <h1 className="text-3xl font-bold text-center text-white">
                    {loading ? "Processing..." : "Signup"}
                </h1>

                <hr className="border-gray-600" />

                {error && (
                    <div className="bg-red-500/20 border border-red-500 text-red-300 text-sm p-3 rounded-lg text-center">
                        {error}
                    </div>
                )}

                <label htmlFor="username" className="text-gray-300 text-sm">Username</label>
                <input
                    className="p-3 w-full border border-gray-600 rounded-lg bg-black/40 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                    id="username"
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder="Enter your username"
                />

                <label htmlFor="email" className="text-gray-300 text-sm">Email</label>
                <input
                    className="p-3 w-full border border-gray-600 rounded-lg bg-black/40 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                    id="email"
                    type="text"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Enter your email"
                />

                <label htmlFor="password" className="text-gray-300 text-sm">Password</label>
                <input
                    className="p-3 w-full border border-gray-600 rounded-lg bg-black/40 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Enter your password"
                />

                <button
                    onClick={onSignup}
                    className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-black font-semibold rounded-lg transition-all duration-300 shadow-lg hover:scale-[1.02]"
                >
                    {buttonDisabled ? "No signup" : "Signup"}
                </button>

                <Link
                    href="/login"
                    className="block text-center text-sm text-orange-400 hover:underline mt-2"
                >
                    Already have an account? Login
                </Link>

            </div>
        </div>
    )

}