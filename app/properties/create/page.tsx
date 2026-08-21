"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import PropertyForm from "@/components/property/PropertyForm";
import { useLanguage } from "@/context/LanguageContext";

export default function CreatePropertyPage() {
    const { t, locale } = useLanguage();
    const isRTL = locale === "ar";

    return (
        <ProtectedRoute>
            <main className="min-h-screen bg-gray-50" dir={isRTL ? "rtl" : "ltr"}>
                <div className="mx-auto max-w-7xl px-6 py-10">
                    <div className="mb-10">
                        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                            {t.propertyManagement}
                        </p>

                        <h1 className="mt-2 text-4xl font-bold text-gray-900">
                            {t.addNewProperty}
                        </h1>

                        <p className="mt-3 max-w-2xl text-gray-500">
                            {t.addPropertyDescription}
                        </p>
                    </div>

                    {/* هنا سيتم عرض النموذج */}
                    <PropertyForm />
                </div>
            </main>
        </ProtectedRoute>
    );
}
