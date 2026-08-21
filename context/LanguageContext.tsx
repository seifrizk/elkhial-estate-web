"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import type { Locale } from "@/lib/i18n";
import { translations } from "@/lib/i18n";

interface LanguageContextType {
    locale: Locale;
    direction: "ltr" | "rtl";
    t: typeof translations.en;
    toggleLanguage: () => void;
}

const LanguageContext =
    createContext<LanguageContextType | null>(null);

export function LanguageProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [locale, setLocale] =
        useState<Locale>("en");

    useEffect(() => {
        const saved =
            localStorage.getItem(
                "locale"
            ) as Locale | null;

        if (
            saved === "ar" ||
            saved === "en"
        ) {
            setLocale(saved);
        }
    }, []);

    useEffect(() => {
        document.documentElement.lang =
            locale;

        document.documentElement.dir =
            locale === "ar"
                ? "rtl"
                : "ltr";

        localStorage.setItem(
            "locale",
            locale
        );
    }, [locale]);

    function toggleLanguage() {
        setLocale((current) =>
            current === "en"
                ? "ar"
                : "en"
        );
    }

    return (
        <LanguageContext.Provider
            value={{
                locale,
                direction:
                    locale === "ar"
                        ? "rtl"
                        : "ltr",
                t:
                    translations[
                        locale
                    ],
                toggleLanguage,
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context =
        useContext(LanguageContext);

    if (!context) {
        throw new Error(
            "useLanguage must be used inside LanguageProvider"
        );
    }

    return context;
}
