"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { login as loginRequest } from "@/services/auth";
import { useAuth } from "@/context/AuthContext";

export default function LoginForm() {
    const router = useRouter();

    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await loginRequest({
                email,
                password,
            });

            login(
                response.token,
                response.user
            );

            router.push("/");
        } catch (err: any) {
            console.log("Login error:", err);
            console.log("Response:", err.response);
            console.log("Data:", err.response?.data);

            setError(
                err.response?.data?.message ??
                "Login failed."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >
            {/* Email */}

            <div>
                <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Email
                </label>

                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                    className="
                        w-full
                        rounded-lg
                        border
                        border-gray-300
                        bg-white
                        px-4
                        py-3
                        text-gray-900
                        outline-none
                        placeholder:text-gray-500
                        focus:border-blue-600
                        focus:ring-2
                        focus:ring-blue-100
                    "
                />
            </div>

            {/* Password */}

            <div>
                <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Password
                </label>

                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    autoComplete="current-password"
                    required
                    className="
                        w-full
                        rounded-lg
                        border
                        border-gray-300
                        bg-white
                        px-4
                        py-3
                        text-gray-900
                        outline-none
                        placeholder:text-gray-500
                        focus:border-blue-600
                        focus:ring-2
                        focus:ring-blue-100
                    "
                />
            </div>

            {/* Error */}

            {error && (
                <div
                    className="
                        rounded-lg
                        border
                        border-red-200
                        bg-red-50
                        px-4
                        py-3
                        text-sm
                        text-red-600
                    "
                >
                    {error}
                </div>
            )}

            {/* Submit */}

            <button
                type="submit"
                disabled={loading}
                className="
                    w-full
                    rounded-lg
                    bg-blue-600
                    py-3
                    font-semibold
                    text-white
                    transition
                    hover:bg-blue-700
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                "
            >
                {loading
                    ? "Logging in..."
                    : "Login"}
            </button>
        </form>
    );
}
