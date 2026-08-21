"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

import { register as registerRequest } from "@/services/auth";
import { useAuth } from "@/context/AuthContext";

export default function RegisterForm() {

    const router = useRouter();

    const { login } = useAuth();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] =
        useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmation, setShowConfirmation] =
        useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(
        e: React.FormEvent
    ) {
        e.preventDefault();

        setError("");

        if (!name.trim()) {
            setError("Please enter your full name.");
            return;
        }

        if (!phone.trim()) {
            setError("Please enter your phone number.");
            return;
        }

        if (!email.trim()) {
            setError("Please enter your email.");
            return;
        }

        if (password.length < 8) {
            setError(
                "Password must be at least 8 characters."
            );
            return;
        }

        if (password !== passwordConfirmation) {
            setError(
                "Password confirmation does not match."
            );
            return;
        }

        setLoading(true);

        try {

            const response = await registerRequest({
                role_id: 2,
                name,
                phone,
                email,
                password,
                password_confirmation:
                    passwordConfirmation,
            });

            login(
                response.token,
                response.user
            );

            router.push("/");

        } catch (err: any) {

            console.error(err);

            setError(
                err.response?.data?.message ??
                "Registration failed. Please try again."
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

            {/* Full Name */}

            <div>

                <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                >
                    Full Name
                </label>

                <input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                    autoComplete="name"
                    className="
                        w-full
                        rounded-xl
                        border
                        border-gray-200
                        bg-gray-50
                        px-4
                        py-3.5
                        text-gray-900
                        outline-none
                        transition
                        placeholder:text-gray-400
                        focus:border-blue-500
                        focus:bg-white
                        focus:ring-4
                        focus:ring-blue-500/10
                    "
                />

            </div>


            {/* Phone */}

            <div>

                <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                >
                    Phone Number
                </label>

                <input
                    id="phone"
                    type="tel"
                    placeholder="+20 1XX XXX XXXX"
                    value={phone}
                    onChange={(e) =>
                        setPhone(e.target.value)
                    }
                    autoComplete="tel"
                    className="
                        w-full
                        rounded-xl
                        border
                        border-gray-200
                        bg-gray-50
                        px-4
                        py-3.5
                        text-gray-900
                        outline-none
                        transition
                        placeholder:text-gray-400
                        focus:border-blue-500
                        focus:bg-white
                        focus:ring-4
                        focus:ring-blue-500/10
                    "
                />

            </div>


            {/* Email */}

            <div>

                <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                >
                    Email
                </label>

                <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    autoComplete="email"
                    className="
                        w-full
                        rounded-xl
                        border
                        border-gray-200
                        bg-gray-50
                        px-4
                        py-3.5
                        text-gray-900
                        outline-none
                        transition
                        placeholder:text-gray-400
                        focus:border-blue-500
                        focus:bg-white
                        focus:ring-4
                        focus:ring-blue-500/10
                    "
                />

            </div>


            {/* Password */}

            <div>

                <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                >
                    Password
                </label>

                <div className="relative">

                    <input
                        id="password"
                        type={
                            showPassword
                                ? "text"
                                : "password"
                        }
                        placeholder="At least 8 characters"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        autoComplete="new-password"
                        className="
                            w-full
                            rounded-xl
                            border
                            border-gray-200
                            bg-gray-50
                            px-4
                            py-3.5
                            pr-12
                            text-gray-900
                            outline-none
                            transition
                            placeholder:text-gray-400
                            focus:border-blue-500
                            focus:bg-white
                            focus:ring-4
                            focus:ring-blue-500/10
                        "
                    />

                    <button
                        type="button"
                        onClick={() =>
                            setShowPassword(
                                !showPassword
                            )
                        }
                        className="
                            absolute
                            right-3
                            top-1/2
                            -translate-y-1/2
                            rounded-lg
                            p-2
                            text-gray-400
                            transition
                            hover:bg-gray-100
                            hover:text-gray-600
                        "
                        aria-label={
                            showPassword
                                ? "Hide password"
                                : "Show password"
                        }
                    >

                        {showPassword ? (
                            <EyeOff size={19} />
                        ) : (
                            <Eye size={19} />
                        )}

                    </button>

                </div>

            </div>


            {/* Confirm Password */}

            <div>

                <label
                    htmlFor="password_confirmation"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                >
                    Confirm Password
                </label>

                <div className="relative">

                    <input
                        id="password_confirmation"
                        type={
                            showConfirmation
                                ? "text"
                                : "password"
                        }
                        placeholder="Repeat your password"
                        value={
                            passwordConfirmation
                        }
                        onChange={(e) =>
                            setPasswordConfirmation(
                                e.target.value
                            )
                        }
                        autoComplete="new-password"
                        className="
                            w-full
                            rounded-xl
                            border
                            border-gray-200
                            bg-gray-50
                            px-4
                            py-3.5
                            pr-12
                            text-gray-900
                            outline-none
                            transition
                            placeholder:text-gray-400
                            focus:border-blue-500
                            focus:bg-white
                            focus:ring-4
                            focus:ring-blue-500/10
                        "
                    />

                    <button
                        type="button"
                        onClick={() =>
                            setShowConfirmation(
                                !showConfirmation
                            )
                        }
                        className="
                            absolute
                            right-3
                            top-1/2
                            -translate-y-1/2
                            rounded-lg
                            p-2
                            text-gray-400
                            transition
                            hover:bg-gray-100
                            hover:text-gray-600
                        "
                        aria-label={
                            showConfirmation
                                ? "Hide password confirmation"
                                : "Show password confirmation"
                        }
                    >

                        {showConfirmation ? (
                            <EyeOff size={19} />
                        ) : (
                            <Eye size={19} />
                        )}

                    </button>

                </div>

            </div>


            {/* Error */}

            {error && (

                <div
                    role="alert"
                    className="
                        rounded-xl
                        border
                        border-red-100
                        bg-red-50
                        px-4
                        py-3
                        text-sm
                        font-medium
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
                    flex
                    w-full
                    items-center
                    justify-center
                    rounded-xl
                    bg-blue-600
                    px-5
                    py-3.5
                    font-semibold
                    text-white
                    shadow-lg
                    shadow-blue-600/20
                    transition
                    hover:bg-blue-700
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                "
            >

                {loading
                    ? "Creating account..."
                    : "Create Account"}

            </button>


            {/* Mobile Login */}

            <p className="pt-1 text-center text-sm text-gray-500 lg:hidden">

                Already have an account?

                {" "}

                <Link
                    href="/login"
                    className="font-semibold text-blue-600"
                >
                    Login
                </Link>

            </p>

        </form>
    );
}
