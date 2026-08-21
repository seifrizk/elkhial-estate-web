"use client";

import { useLanguage } from "@/context/LanguageContext";
import PropertyCard from "@/components/property/PropertyCard";

interface Props {
    properties: any[];
}

export default function LatestProperties({
    properties,
}: Props) {
    const { t, locale } = useLanguage();

    return (
        <section
            dir={locale === "ar" ? "rtl" : "ltr"}
            className="mx-auto max-w-7xl px-6 py-16"
        >
            <div className="mb-10">
                <h2 className="text-3xl font-bold text-gray-900">
                    {t.latestProperties}
                </h2>

                <p className="mt-2 text-gray-500">
                    {t.latestPropertiesDescription}
                </p>
            </div>

            {properties.length === 0 ? (
                <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-900">
                        {t.noProperties}
                    </h3>

                    <p className="mt-2 text-gray-500">
                        {t.checkBackLater}
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {properties.map((property: any) => (
                        <PropertyCard
                            key={property.id}
                            property={property}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
