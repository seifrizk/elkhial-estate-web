"use client";

import { Building2, Users, MapPinned } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function StatsSection() {
    const { t, locale } = useLanguage();

    const stats = [
        {
            key: "properties",
            value: "1,200+",
        },
        {
            key: "clients",
            value: "850+",
        },
        {
            key: "cities",
            value: "27",
        },
    ];

    return (
        <section
            dir={locale === "ar" ? "rtl" : "ltr"}
            className="-mt-14 relative z-10"
        >
            <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-3">

                {/* Properties */}
                <div
                    className="
                        rounded-2xl
                        bg-white
                        p-8
                        shadow-xl
                        transition
                        hover:-translate-y-1
                    "
                >
                    <Building2
                        size={40}
                        className="text-blue-600"
                    />

                    <h3 className="mt-5 text-4xl font-bold text-gray-900">
                        {stats[0].value}
                    </h3>

                    <p className="mt-2 text-gray-500">
                        {t.properties}
                    </p>
                </div>

                {/* Clients */}
                <div
                    className="
                        rounded-2xl
                        bg-white
                        p-8
                        shadow-xl
                        transition
                        hover:-translate-y-1
                    "
                >
                    <Users
                        size={40}
                        className="text-blue-600"
                    />

                    <h3 className="mt-5 text-4xl font-bold text-gray-900">
                        {stats[1].value}
                    </h3>

                    <p className="mt-2 text-gray-500">
                        {t.clients}
                    </p>
                </div>

                {/* Cities */}
                <div
                    className="
                        rounded-2xl
                        bg-white
                        p-8
                        shadow-xl
                        transition
                        hover:-translate-y-1
                    "
                >
                    <MapPinned
                        size={40}
                        className="text-blue-600"
                    />

                    <h3 className="mt-5 text-4xl font-bold text-gray-900">
                        {stats[2].value}
                    </h3>

                    <p className="mt-2 text-gray-500">
                        {t.cities}
                    </p>
                </div>

            </div>
        </section>
    );
}
