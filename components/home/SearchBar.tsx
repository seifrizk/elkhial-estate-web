"use client";

import {
    Search,
    MapPin,
    Home,
} from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";

export default function SearchBar() {
    const { t, locale } = useLanguage();

    return (
        <div
            dir={locale === "ar" ? "rtl" : "ltr"}
            className="w-full rounded-2xl bg-white p-3 shadow-2xl"
        >
            <div className="flex flex-col gap-3 lg:flex-row">

                {/* Location */}
                <div className="flex flex-1 items-center gap-3 rounded-xl border border-gray-200 px-5 py-4">
                    <MapPin
                        size={22}
                        className="text-blue-600"
                    />

                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-400">
                            {t.location}
                        </span>

                        <input
                            type="text"
                            placeholder={t.cityOrArea}
                            className="
                                w-full
                                bg-transparent
                                text-gray-800
                                outline-none
                            "
                        />
                    </div>
                </div>

                {/* Property type */}
                <div className="flex flex-1 items-center gap-3 rounded-xl border border-gray-200 px-5 py-4">
                    <Home
                        size={22}
                        className="text-blue-600"
                    />

                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-400">
                            {t.propertyType}
                        </span>

                        <select
                            className="
                                bg-transparent
                                text-gray-800
                                outline-none
                            "
                            defaultValue=""
                        >
                            <option value="" disabled>
                                {t.selectType}
                            </option>

                            <option value="apartment">
                                {t.apartment}
                            </option>

                            <option value="villa">
                                {t.villa}
                            </option>

                            <option value="house">
                                {t.house}
                            </option>
                        </select>
                    </div>
                </div>

                {/* Search */}
                <button
                    type="button"
                    className="
                        flex
                        min-h-[64px]
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-blue-600
                        px-8
                        font-semibold
                        text-white
                        transition
                        hover:bg-blue-700
                    "
                >
                    <Search size={20} />
                    {t.search}
                </button>

            </div>
        </div>
    );
}
