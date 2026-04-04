export default async function UserProfile({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4">

            <div className="w-full max-w-lg bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-10 text-center space-y-6">

                <h1 className="text-3xl font-bold text-white">Profile</h1>

                <hr className="border-gray-600" />

                <p className="text-2xl md:text-3xl text-gray-300 pt-2">
                    Profile page
                </p>

                <div className="flex justify-center">
                    <span className="px-4 py-2 rounded-lg bg-orange-500 text-black font-semibold text-sm md:text-base break-all shadow-md">
                        {id}
                    </span>
                </div>

            </div>
        </div>
    );
}