import Image from "next/image";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
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

                    <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-blue-900/50 to-transparent" />

                    {/* Text */}

                    <div className="absolute inset-x-0 bottom-0 p-12 text-white">

                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-blue-200">
                            ElKhial Estate
                        </p>

                        <h2 className="max-w-xl text-5xl font-extrabold leading-tight">
                            Find a place
                            <br />
                            you will love
                            <br />
                            to live.
                        </h2>

                        <p className="mt-5 max-w-lg text-lg leading-relaxed text-blue-100">
                            Discover beautiful properties across Egypt
                            and find your perfect home with ElKhial Estate.
                        </p>

                    </div>

                </section>


                {/* Right - Login */}

                <section className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-16">

                    <div className="w-full max-w-md">

                        {/* Logo / Brand */}

                        <div className="mb-10 text-center">

                            <div className="mb-5 flex justify-center">

                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-extrabold text-white shadow-lg shadow-blue-600/20">
                                    E
                                </div>

                            </div>

                            <h1 className="text-3xl font-extrabold text-gray-900">
                                ElKhial Estate
                            </h1>

                            <p className="mt-2 text-gray-500">
                                Welcome back 👋
                            </p>

                        </div>


                        {/* Login Card */}

                        <div className="rounded-3xl border bg-white p-7 shadow-xl shadow-gray-200/60 sm:p-9">

                            <div className="mb-7">

                                <h2 className="text-2xl font-bold text-gray-900">
                                    Sign in to your account
                                </h2>

                                <p className="mt-2 text-sm text-gray-500">
                                    Enter your details to continue.
                                </p>

                            </div>

                            <LoginForm />

                        </div>


                        {/* Register */}

                        <p className="mt-7 text-center text-sm text-gray-500">

                            Don't have an account?

                            {" "}

                            <a
                                href="/register"
                                className="font-semibold text-blue-600 transition hover:text-blue-700"
                            >
                                Create account
                            </a>

                        </p>

                    </div>

                </section>

            </div>

        </main>
    );
}
