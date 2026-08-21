"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Heart,
    House,
    Plus,
    Building2,
    LogOut,
    User,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
    const { user, logout } = useAuth();
    const { t, locale, toggleLanguage } = useLanguage();
    const router = useRouter();

    async function handleLogout() {
        logout();
        router.push("/");
    }

    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
                <Link href="/" className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center">
                        <House size={38} strokeWidth={1.7} className="text-blue-900" />
                    </div>
                    <span className="text-2xl font-semibold tracking-tight text-slate-900">
                        Elkhial Estate
                    </span>
                </Link>

                <nav className="hidden items-center gap-8 md:flex">
                    <Link href="/" className="flex items-center gap-2 text-gray-700 transition hover:text-blue-600">
                        <House size={18} />
                        {t.home}
                    </Link>
                    <Link href="/properties" className="flex items-center gap-2 text-gray-700 transition hover:text-blue-600">
                        <Building2 size={18} />
                        {t.properties}
                    </Link>
                    {user && (
                        <>
                            <Link href="/dashboard" className="text-gray-700 transition hover:text-blue-600">
                                {t.dashboard}
                            </Link>
                            <Link href="/favorites" className="flex items-center gap-2 text-gray-700 transition hover:text-red-500">
                                <Heart size={18} />
                                {t.favorites}
                            </Link>
                        </>
                    )}
                </nav>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={toggleLanguage}
                        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                    >
                        {locale === "en" ? "العربية" : "English"}
                    </button>

                    {user ? (
                        <>
                            <Link href="/my-properties" className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-100">
                                {t.myProperties}
                            </Link>
                            <Link href="/properties/create" className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700">
                                <Plus size={18} />
                                {t.addProperty}
                            </Link>
                            <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2">
                                <User size={18} className="text-gray-600" />
                                <span className="font-medium text-gray-800">{user.name}</span>
                            </div>
                            <button
                                type="button"
                                onClick={handleLogout}
                                title={t.logout}
                                aria-label={t.logout}
                                className="rounded-lg border border-red-500 px-4 py-2 text-red-600 transition hover:bg-red-50"
                            >
                                <LogOut size={18} />
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="rounded-lg border border-gray-300 px-5 py-2 font-medium text-gray-700 transition hover:bg-gray-100">
                                {t.login}
                            </Link>
                            <Link href="/register" className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700">
                                {t.register}
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
