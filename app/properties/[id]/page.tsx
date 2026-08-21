import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { translations, type Locale } from "@/lib/i18n";
import api from "@/lib/axios";

import {
    MapPin,
    BedDouble,
    Bath,
    Car,
    Ruler,
    Building2,
    CalendarDays,
    Phone,
    MessageCircle,
} from "lucide-react";

import PropertyGallery from "@/components/property/PropertyGallery";
import FavoriteButton from "@/components/favorites/FavoriteButton";

async function getProperty(id: string) {
    try {
        const response = await api.get(`/v1/properties/${id}`);
        return response.data.data;
    } catch {
        return null;
    }
}

export default async function PropertyDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const property = await getProperty(id);

    if (!property) {
        notFound();
    }

    // قراءة اللغة من الكوكيز (التي يضعها LanguageContext)
    const cookieStore = await cookies();
    const locale = (cookieStore.get("locale")?.value || "en") as Locale;
    const t = translations[locale];
    const isRTL = locale === "ar";

    return (
        <main className="min-h-screen bg-gray-50" dir={isRTL ? "rtl" : "ltr"}>
            <section className="border-b bg-white">
                <div className="mx-auto max-w-7xl px-6 py-8">
                    <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                        ElKhial Estate
                    </p>
                    <h1 className="mt-2 text-3xl font-extrabold text-gray-900 md:text-4xl">
                        {t.propertyDetails}
                    </h1>
                    <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                        <MapPin size={17} />
                        <span>
                            {property.address || property.area?.name || t.locationUnavailable}
                        </span>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-8 md:py-10">
                <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                    <div>
                        <PropertyGallery images={property.images ?? []} videos={property.videos ?? []} />
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
                        <div className="flex flex-wrap gap-2">
                            {property.property_type?.name && (
                                <span className="rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-700">
                                    {property.property_type.name}
                                </span>
                            )}
                            {property.purpose && (
                                <span className="rounded-full bg-green-50 px-4 py-1.5 text-sm font-semibold capitalize text-green-700">
                                    {property.purpose.replace("_", " ")}
                                </span>
                            )}
                            {property.negotiable && (
                                <span className="rounded-full bg-purple-50 px-4 py-1.5 text-sm font-semibold text-purple-700">
                                    {t.negotiable}
                                </span>
                            )}
                        </div>

                        <h2 className="mt-5 text-3xl font-extrabold leading-tight text-gray-900 md:text-4xl">
                            {property.title}
                        </h2>

                        <div className="mt-4 flex items-center gap-2 text-gray-500">
                            <MapPin size={19} className="text-blue-600" />
                            <span>{property.address || property.area?.name || t.locationUnavailable}</span>
                        </div>

                        <div className="mt-7 rounded-2xl bg-blue-50 p-5">
                            <p className="text-sm font-medium text-gray-500">{t.priceLabel}</p>
                            <p className="mt-1 text-3xl font-extrabold text-blue-600 md:text-4xl">
                                {property.price} {property.currency}
                            </p>
                        </div>

                        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
                            <StatCard icon={<BedDouble size={21} />} label={t.bedrooms} value={property.bedrooms ?? "-"} />
                            <StatCard icon={<Bath size={21} />} label={t.bathrooms} value={property.bathrooms ?? "-"} />
                            <StatCard icon={<Car size={21} />} label={t.garages} value={property.garages ?? "-"} />
                            <StatCard icon={<Ruler size={21} />} label={t.area} value={property.area_size ? `${property.area_size} ${t.sqm}` : "-"} />
                            <StatCard icon={<Building2 size={21} />} label={t.floor} value={property.floor ?? "-"} />
                            <StatCard icon={<CalendarDays size={21} />} label={t.built} value={property.year_built ?? "-"} />
                        </div>

                        <div className="mt-7 rounded-2xl border border-gray-200 bg-gray-50 p-5">
                            <p className="text-sm font-semibold uppercase tracking-wide text-gray-400">{t.ownerLabel}</p>
                            <p className="mt-2 text-xl font-bold text-gray-900">{property.owner?.name ?? t.ownerLabel}</p>
                            {property.owner?.phone && (
                                <p className="mt-2 flex items-center gap-2 text-gray-500">
                                    <Phone size={17} /> {property.owner.phone}
                                </p>
                            )}
                            <div className="mt-5 grid grid-cols-2 gap-3">
                                {property.owner?.phone && (
                                    <>
                                        <a href={`tel:${property.owner.phone}`} className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700">
                                            <Phone size={18} /> {t.call}
                                        </a>
                                        <a href={`https://wa.me/${property.owner.phone}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 font-semibold text-white transition hover:bg-emerald-600">
                                            <MessageCircle size={18} /> {t.whatsapp}
                                        </a>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="mt-5">
                            <FavoriteButton propertyId={property.id} initialSaved={property.is_favorite} />
                        </div>
                    </div>
                </div>

                <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
                    <h2 className="text-2xl font-bold text-gray-900">{t.descriptionTitle}</h2>
                    <p className="mt-4 whitespace-pre-line leading-8 text-gray-600">
                        {property.description || t.noDescription}
                    </p>
                </section>

                {property.features?.length > 0 && (
                    <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
                        <h2 className="text-2xl font-bold text-gray-900">{t.featuresTitle}</h2>
                        <div className="mt-5 flex flex-wrap gap-3">
                            {property.features.map((feature: any) => (
                                <span key={feature.id} className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
                                    {feature.name}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {property.location?.latitude && property.location?.longitude && (
                    <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
                        <h2 className="text-2xl font-bold text-gray-900">{t.locationTitle}</h2>
                        <div className="mt-5 overflow-hidden rounded-2xl border">
                            <iframe
                                title="Property location"
                                className="h-[400px] w-full"
                                loading="lazy"
                                src={`https://maps.google.com/maps?q=${property.location.latitude},${property.location.longitude}&z=15&output=embed`}
                            />
                        </div>
                    </section>
                )}
            </section>
        </main>
    );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <div className="flex items-center gap-2 text-blue-600">
                {icon}
                <span className="text-xs font-medium text-gray-500">{label}</span>
            </div>
            <p className="mt-2 text-xl font-bold text-gray-900">{value}</p>
        </div>
    );
}
