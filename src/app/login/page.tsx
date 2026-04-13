"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();

    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    const onLogin = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await axios.post("/api/users/login", user);

            toast.success("Login success");
            router.push("/profile");

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

    const onForgotPassword = async () => {
        try {
            await axios.post("/api/users/forgot-password-request", {
                email: user.email,
            });
            toast.success("Reset email sent");
        } catch (error: any) {
            const message =
                error.response?.data?.error ||
                error.response?.data?.message ||
                "Error";

            setError(message);
            toast.error(message);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 space-y-4">
                
                <h1 className="text-3xl font-bold text-center text-white">
                    {loading ? "Processing..." : "Login"}
                </h1>

                <hr className="border-gray-600" />

                {error && (
                    <div className="bg-red-500/20 border border-red-500 text-red-300 text-sm p-3 rounded-lg text-center">
                        {error}
                    </div>
                )}

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
                    onClick={onLogin}
                    disabled={buttonDisabled || loading}
                    className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-black font-semibold rounded-lg transition-all duration-300 shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Login
                </button>

                <button
                    onClick={onForgotPassword}
                    className="w-full py-2 border border-gray-500 text-gray-300 hover:bg-gray-700 rounded-lg transition"
                >
                    Forgot Password?
                </button>

                <Link
                    href="/signup"
                    className="block text-center text-sm text-orange-400 hover:underline mt-2"
                >
                    Don't have an account? Sign up
                </Link>

            </div>
        </div>
    );
}