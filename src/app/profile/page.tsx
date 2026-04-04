"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("nothing")
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data._id)
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4">

            <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 space-y-5 text-center">

                <h1 className="text-3xl font-bold text-white">Profile</h1>

                <hr className="border-gray-600" />

                <p className="text-gray-300">Profile page</p>

                <h2 className="p-2 rounded-lg bg-green-500/90 text-black font-semibold break-all">
                    {data === 'nothing' ? "Nothing" : (
                        <Link href={`/profile/${data}`} className="hover:underline">
                            {data}
                        </Link>
                    )}
                </h2>

                <hr className="border-gray-600" />

                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">

                    <button
                        onClick={logout}
                        className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 shadow-lg hover:scale-105"
                    >
                        Logout
                    </button>

                    <button
                        onClick={getUserDetails}
                        className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 shadow-lg hover:scale-105"
                    >
                        Get User Details
                    </button>

                </div>

            </div>
        </div>
    )
}