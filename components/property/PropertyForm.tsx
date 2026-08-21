"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

import { createProperty, updateProperty } from "@/services/property";
import { uploadPropertyImage, uploadPropertyVideo } from "@/services/property-media";
import { getAreas, getPropertyTypes } from "@/services/lookup";

import { LookupArea, LookupPropertyType, Property } from "@/types/property";
import PropertyImagesUploader from "@/components/property/PropertyImagesUploader";
import PropertyCreateImages from "@/components/property/PropertyCreateImages";

import dynamic from "next/dynamic";

const PropertyLocationPicker = dynamic(
    () => import("@/components/property/PropertyLocationPicker"),
    { ssr: false }
);

interface PropertyFormProps {
    property?: Property;
    isEdit?: boolean;
}

interface FormState {
    property_type_id: string;
    area_id: string;
    title: string;
    description: string;
    purpose: string;
    price: string;
    currency: string;
    negotiable: boolean;
    area_size: string;
    bedrooms: string;
    bathrooms: string;
    garages: string;
    year_built: string;
    floor: string;
    address: string;
    latitude: string;
    longitude: string;
}

export default function PropertyForm({ property, isEdit = false }: PropertyFormProps) {
    const router = useRouter();
    const { t, locale } = useLanguage();
    const isRTL = locale === "ar";

    const [loading, setLoading] = useState(false);
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
    const [errors, setErrors] = useState<Record<string, string[]>>({});

    const [propertyTypes, setPropertyTypes] = useState<LookupPropertyType[]>([]);
    const [areas, setAreas] = useState<LookupArea[]>([]);

    const [form, setForm] = useState<FormState>({
        property_type_id: property?.property_type?.id?.toString() ?? "",
        area_id: property?.area?.id?.toString() ?? "",
        title: String(property?.title ?? ""),
        description: String(property?.description ?? ""),
        purpose: String(property?.purpose ?? "sale"),
        price: property?.price?.toString() ?? "",
        currency: String(property?.currency ?? "EGP"),
        negotiable: property?.negotiable ?? false,
        area_size: property?.area_size?.toString() ?? "0",
        bedrooms: property?.bedrooms?.toString() ?? "0",
        bathrooms: property?.bathrooms?.toString() ?? "0",
        garages: property?.garages?.toString() ?? "0",
        year_built: property?.year_built?.toString() ?? "",
        floor: property?.floor?.toString() ?? "",
        address: String(property?.address ?? ""),
        latitude: property?.location?.latitude?.toString() ?? "",
        longitude: property?.location?.longitude?.toString() ?? "",
    });

    useEffect(() => {
        async function loadLookups() {
            try {
                const [types, areaList] = await Promise.all([getPropertyTypes(), getAreas()]);
                setPropertyTypes(types);
                setAreas(areaList);
            } catch (error) {
                console.error("Failed to load property lookups:", error);
            }
        }
        loadLookups();
    }, []);

    function updateField(field: keyof FormState, value: string | boolean) {
        setForm((current) => ({ ...current, [field]: value }));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            let response;

            if (isEdit && property) {
                response = await updateProperty(property.id, form);
                if (selectedVideo) {
                    const formData = new FormData();
                    formData.append("video", selectedVideo);
                    await uploadPropertyVideo(property.id, formData);
                }
                router.push(`/properties/${property.id}`);
                return;
            }

            response = await createProperty(form);
            const propertyId = response.data.id;

            if (selectedImages.length > 0) {
                for (let i = 0; i < selectedImages.length; i++) {
                    const formData = new FormData();
                    formData.append("image", selectedImages[i]);
                    formData.append("is_cover", i === 0 ? "1" : "0");
                    await uploadPropertyImage(propertyId, formData);
                }
            }

            if (selectedVideo) {
                const formData = new FormData();
                formData.append("video", selectedVideo);
                await uploadPropertyVideo(propertyId, formData);
            }

            router.push(`/properties/${propertyId}`);
        } catch (err: any) {
            console.error("FORM ERROR:", err.response?.data);
            if (err.response?.status === 422) {
                setErrors(err.response?.data?.errors ?? {});
            }
        } finally {
            setLoading(false);
        }
    }

    function fieldError(field: string) {
        return errors[field]?.[0];
    }

    const inputClass = `
        mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 
        text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 
        focus:border-blue-500 focus:ring-4 focus:ring-blue-100
        ${isRTL ? "text-right" : "text-left"}
    `;

    const labelClass = "text-sm font-semibold text-gray-800";

    return (
        <form onSubmit={handleSubmit} className="space-y-8" dir={isRTL ? "rtl" : "ltr"}>
            
            {/* Basic Information */}
            <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-100 bg-gray-50/70 px-6 py-5">
                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                        {t.basicInfo}
                    </p>
                    <h2 className="mt-1 text-xl font-bold text-gray-900">{t.propertyDetailsForm}</h2>
                    <p className="mt-1 text-sm text-gray-500">{t.enterMainInfo}</p>
                </div>

                <div className="space-y-6 p-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <label className={labelClass}>{t.propertyType}</label>
                            <select className={inputClass} value={form.property_type_id} onChange={(e) => updateField("property_type_id", e.target.value)}>
                                <option value="">{t.selectPropertyType}</option>
                                {propertyTypes.map((type) => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                ))}
                            </select>
                            {fieldError("property_type_id") && <p className="mt-1 text-sm text-red-500">{fieldError("property_type_id")}</p>}
                        </div>

                        <div>
                            <label className={labelClass}>{t.area}</label>
                            <select className={inputClass} value={form.area_id} onChange={(e) => updateField("area_id", e.target.value)}>
                                <option value="">{t.selectArea}</option>
                                {areas.map((area) => (
                                    <option key={area.id} value={area.id}>{area.name} ({area.city.name})</option>
                                ))}
                            </select>
                            {fieldError("area_id") && <p className="mt-1 text-sm text-red-500">{fieldError("area_id")}</p>}
                        </div>
                    </div>

                    <div>
                        <label className={labelClass}>{t.propertyTitle}</label>
                        <input type="text" placeholder={t.titlePlaceholder} className={inputClass} value={form.title} onChange={(e) => updateField("title", e.target.value)} />
                        {fieldError("title") && <p className="mt-1 text-sm text-red-500">{fieldError("title")}</p>}
                    </div>

                    <div>
                        <label className={labelClass}>{t.description}</label>
                        <textarea rows={6} placeholder={t.descriptionPlaceholder} className={inputClass} value={form.description} onChange={(e) => updateField("description", e.target.value)} />
                        {fieldError("description") && <p className="mt-1 text-sm text-red-500">{fieldError("description")}</p>}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-100 bg-gray-50/70 px-6 py-5">
                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">{t.pricing}</p>
                    <h2 className="mt-1 text-xl font-bold text-gray-900">{t.priceAndPurpose}</h2>
                </div>

                <div className="space-y-6 p-6">
                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="md:col-span-2">
                            <label className={labelClass}>{t.price}</label>
                            <input type="number" min="0" placeholder={t.pricePlaceholder} className={inputClass} value={form.price} onChange={(e) => updateField("price", e.target.value)} />
                            {fieldError("price") && <p className="mt-1 text-sm text-red-500">{fieldError("price")}</p>}
                        </div>

                        <div>
                            <label className={labelClass}>{t.currency}</label>
                            <select className={inputClass} value={form.currency} onChange={(e) => updateField("currency", e.target.value)}>
                                <option value="EGP">EGP (ج.م)</option>
                                <option value="USD">USD ($)</option>
                                <option value="EUR">EUR (€)</option>
                                <option value="SAR">SAR (ر.س)</option>
                                <option value="AED">AED (د.إ)</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className={labelClass}>{t.purpose}</label>
                        <select className={inputClass} value={form.purpose} onChange={(e) => updateField("purpose", e.target.value)}>
                            <option value="sale">{t.sale}</option>
                            <option value="rent">{t.rent}</option>
                            <option value="daily_rent">{t.dailyRent}</option>
                        </select>
                    </div>

                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
                        <input type="checkbox" checked={form.negotiable} onChange={(e) => updateField("negotiable", e.target.checked)} className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <div>
                            <p className="font-semibold text-gray-900">{t.priceNegotiable}</p>
                            <p className="text-sm text-gray-500">{t.negotiableDesc}</p>
                        </div>
                    </label>
                </div>
            </section>

            {/* Specifications */}
            <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-100 bg-gray-50/70 px-6 py-5">
                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">{t.specifications}</p>
                    <h2 className="mt-1 text-xl font-bold text-gray-900">{t.propertyFeatures}</h2>
                </div>

                <div className="p-6">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <div>
                            <label className={labelClass}>{t.bedrooms}</label>
                            <input type="number" min="0" placeholder="0" className={inputClass} value={form.bedrooms} onChange={(e) => updateField("bedrooms", e.target.value)} />
                        </div>
                        <div>
                            <label className={labelClass}>{t.bathrooms}</label>
                            <input type="number" min="0" placeholder="0" className={inputClass} value={form.bathrooms} onChange={(e) => updateField("bathrooms", e.target.value)} />
                        </div>
                        <div>
                            <label className={labelClass}>{t.garages}</label>
                            <input type="number" min="0" placeholder="0" className={inputClass} value={form.garages} onChange={(e) => updateField("garages", e.target.value)} />
                        </div>
                        <div>
                            <label className={labelClass}>{t.floor}</label>
                            <input type="number" placeholder="0" className={inputClass} value={form.floor} onChange={(e) => updateField("floor", e.target.value)} />
                        </div>
                        <div>
                            <label className={labelClass}>{t.yearBuilt}</label>
                            <input type="number" placeholder="2025" className={inputClass} value={form.year_built} onChange={(e) => updateField("year_built", e.target.value)} />
                        </div>
                        <div>
                            <label className={labelClass}>{t.propertyVideo}</label>
                            <input type="file" accept="video/*" className={inputClass} onChange={(e) => setSelectedVideo(e.target.files?.[0] ?? null)} />
                            {selectedVideo && <p className="mt-2 text-sm text-gray-500">{t.selectedFile}: {selectedVideo.name}</p>}
                        </div>
                    </div>

                    <div className="mt-6 max-w-sm">
                        <label className={labelClass}>{t.areaSize}</label>
                        <div className="relative">
                            <input type="number" min="0" step="any" placeholder={t.areaSizePlaceholder} className={`${inputClass} ${isRTL ? "pl-14" : "pr-14"}`} value={form.area_size} onChange={(e) => updateField("area_size", e.target.value)} />
                            <span className={`absolute top-1/2 -translate-y-1/2 text-sm font-medium text-gray-400 ${isRTL ? "left-4" : "right-4"}`}>m²</span>
                        </div>
                        {fieldError("area_size") && <p className="mt-1 text-sm text-red-500">{fieldError("area_size")}</p>}
                    </div>
                </div>
            </section>

            {/* Location */}
            <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-100 bg-gray-50/70 px-6 py-5">
                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">{t.location}</p>
                    <h2 className="mt-1 text-xl font-bold text-gray-900">{t.propertyLocation}</h2>
                    <p className="mt-1 text-sm text-gray-500">{t.address}</p>
                </div>

                <div className="space-y-6 p-6">
                    <div>
                        <label className={labelClass}>{t.address}</label>
                        <input type="text" placeholder={t.addressPlaceholder} className={inputClass} value={form.address} onChange={(e) => updateField("address", e.target.value)} />
                        {fieldError("address") && <p className="mt-1 text-sm text-red-500">{fieldError("address")}</p>}
                    </div>

                    <div className="space-y-4">
                        <PropertyLocationPicker
                            latitude={form.latitude}
                            longitude={form.longitude}
                            onChange={(latitude, longitude) => setForm({ ...form, latitude, longitude })}
                        />
                        <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700">
                            {t.mapTip}
                        </div>
                    </div>

                    <div className="rounded-xl bg-blue-50 px-4 py-3 text-sm text-blue-700">
                        {t.coordinatesTip}
                    </div>
                </div>
            </section>

            {!isEdit && (
                <PropertyCreateImages files={selectedImages} onChange={setSelectedImages} />
            )}

            {/* Submit */}
            <div className={`flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row ${isRTL ? "sm:justify-start" : "sm:justify-end"}`}>
                <button type="button" onClick={() => router.back()} disabled={loading} className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50">
                    {t.cancel}
                </button>

                <button type="submit" disabled={loading} className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50">
                    {loading ? (isEdit ? t.updating : t.creating) : (isEdit ? t.updateProperty : t.createProperty)}
                </button>
            </div>
        </form>
    );
}
