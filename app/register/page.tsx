import Image from "next/image";
import Link from "next/link";

import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
    return (
        <main className="min-h-[calc(100vh-80px)] bg-gray-50">

            <div className="grid min-h-[calc(100vh-80px)] lg:grid-cols-2">

                {/* Left - Real Estate Image */}

                <section className="relative hidden min-h-[700px] lg:block">

                    <Image
                        src="/images/Hero.jpeg"
                        alt="ElKhial Estate property"
                        fill
                        priority
                        sizes="50vw"
                        className="object-cover"
                    />

                    {/* Overlay */}

                    <div className="absolute inset-0 bg-gradient-to-br from-blue-950/85 via-blue-900/55 to-transparent" />

                    {/* Content */}

                    <div className="absolute inset-x-0 bottom-0 p-12 text-white">

                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-blue-200">
                            ElKhial Estate
                        </p>

                        <h2 className="max-w-xl text-5xl font-extrabold leading-tight">
                            Your next home
                            <br />
                            starts here.
                        </h2>

                        <p className="mt-5 max-w-lg text-lg leading-relaxed text-blue-100">
                            Find your dream property, save your favorites,
                            and connect with the right opportunities across Egypt.
                        </p>

                        <div className="mt-8 space-y-3">

                            <div className="flex items-center gap-3 text-blue-50">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                                    🏠
                                </span>

                                <span>
                                    Find your dream home
                                </span>
                            </div>

                            <div className="flex items-center gap-3 text-blue-50">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                                    🏢
                                </span>

                                <span>
                                    List and manage your properties
                                </span>
                            </div>

                            <div className="flex items-center gap-3 text-blue-50">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                                    ❤️
                                </span>

                                <span>
                                    Save properties you love
                                </span>
                            </div>

                        </div>

                    </div>

                </section>


                {/* Right - Register */}

                <section className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-16">

                    <div className="w-full max-w-md">

                        {/* Brand */}

                        <div className="mb-8 text-center">

                            <div className="mb-5 flex justify-center">

                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-extrabold text-white shadow-lg shadow-blue-600/20">
                                    E
                                </div>

                            </div>

                            <h1 className="text-3xl font-extrabold text-gray-900">
                                ElKhial Estate
                            </h1>

                            <p className="mt-2 text-gray-500">
                                Create your account
                            </p>

                        </div>


                        {/* Register Card */}

                        <div className="rounded-3xl border bg-white p-7 shadow-xl shadow-gray-200/60 sm:p-9">

                            <div className="mb-7">

                                <h2 className="text-2xl font-bold text-gray-900">
                                    Join ElKhial Estate
                                </h2>

                                <p className="mt-2 text-sm text-gray-500">
                                    Create your account and start discovering properties.
                                </p>

                            </div>

                            <RegisterForm />

                        </div>


                        {/* Login */}

                        <p className="mt-7 text-center text-sm text-gray-500">

                            Already have an account?

                            {" "}

                            <Link
                                href="/login"
                                className="font-semibold text-blue-600 transition hover:text-blue-700"
                            >
                                Login
                            </Link>

                        </p>

                    </div>

                </section>

            </div>

        </main>
    );
}
