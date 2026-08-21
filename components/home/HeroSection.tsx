"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

import SearchBar from "./SearchBar";

export default function HeroSection() {
    const { t, locale } = useLanguage();

    return (
        <section
            dir={locale === "ar" ? "rtl" : "ltr"}
            className="
                relative
                min-h-[calc(100vh-80px)]
                overflow-hidden
                bg-cover
                bg-center
                bg-no-repeat
            "
            style={{
                backgroundImage:
                    "url('/images/Hero.jpeg')",
            }}
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/45" />

            {/* Content */}
            <div className="relative z-10 flex min-h-[calc(100vh-80px)] items-center">
                <div className="mx-auto w-full max-w-7xl px-6 py-20">
                    <div
                        className="
                            max-w-3xl
                            text-white
                            rtl:text-right
                            ltr:text-left
                        "
                    >
                        <p className="mb-4 text-lg font-medium tracking-wide text-blue-200">
                            ElKhial Estate
                        </p>

                        <h1 className="text-5xl font-extrabold leading-tight md:text-7xl">
                            {t.findYour}
                            <br />
                            {t.perfectProperty}
                        </h1>

                        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/90 md:text-xl">
                            {t.heroDescription}
                        </p>

                        {/* Buttons */}
                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link
                                href="/properties"
                                className="
                                    rounded-lg
                                    bg-blue-600
                                    px-7
                                    py-3
                                    font-semibold
                                    text-white
                                    shadow-lg
                                    transition
                                    hover:bg-blue-700
                                "
                            >
                                {t.browseProperties}
                            </Link>

                            <Link
                                href="/properties/create"
                                className="
                                    rounded-lg
                                    border
                                    border-white/80
                                    bg-white/10
                                    px-7
                                    py-3
                                    font-semibold
                                    text-white
                                    backdrop-blur-sm
                                    transition
                                    hover:bg-white
                                    hover:text-gray-900
                                "
                            >
                                {t.addProperty}
                            </Link>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="mt-12 w-full max-w-5xl">
                        <SearchBar />
                    </div>
                </div>
            </div>
        </section>
    );
}
