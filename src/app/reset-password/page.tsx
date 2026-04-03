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
        <form onSubmit={handleSubmit}>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new Password"
            />
            <button type="submit">Update Password</button>
        </form>
    );
}