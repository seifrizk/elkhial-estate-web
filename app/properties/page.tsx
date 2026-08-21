"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import PropertyCard from "@/components/property/PropertyCard";

import {
    getProperties,
    getPropertyTypes,
    getCities,
    getAreas,
} from "@/services/property";

interface PropertyType {
    id: number;
    name: string;
}

interface City {
    id: number;
    name: string;
}

interface Area {
    id: number;
    name: string;
    city_id?: number;
    city?: {
        id: number;
        name: string;
    };
}

export default function PropertiesPage() {
    const { t, locale } = useLanguage();
    const isRTL = locale === "ar";

    const [properties, setProperties] = useState<any[]>([]);
    const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [areas, setAreas] = useState<Area[]>([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [propertyTypeId, setPropertyTypeId] = useState("");
    const [cityId, setCityId] = useState("");
    const [areaId, setAreaId] = useState("");
    const [purpose, setPurpose] = useState("");
    const [sort, setSort] = useState("latest");

    /*
    |--------------------------------------------------------------------------
    | Load Lookup Data
    |--------------------------------------------------------------------------
    */
    useEffect(() => {
        async function loadLookups() {
            try {
                const [propertyTypesResponse, citiesResponse, areasResponse] = await Promise.all([
                    getPropertyTypes(),
                    getCities(),
                    getAreas(),
                ]);

                setPropertyTypes(propertyTypesResponse?.data ?? []);
                setCities(citiesResponse?.data ?? []);
                setAreas(areasResponse?.data ?? []);
            } catch (error) {
                console.error("Failed to load lookup data:", error);
            }
        }
        loadLookups();
    }, []);

    /*
    |--------------------------------------------------------------------------
    | Load Properties
    |--------------------------------------------------------------------------
    */
    async function loadProperties(params: Record<string, string> = {}) {
        setLoading(true);
        try {
            const response = await getProperties({ ...params, per_page: "12" });
            setProperties(response?.data ?? []);
        } catch (error) {
            console.error("Failed to load properties:", error);
            setProperties([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadProperties();
    }, []);

    /*
    |--------------------------------------------------------------------------
    | Search & Reset
    |--------------------------------------------------------------------------
    */
    function handleSearch() {
        const params: Record<string, string> = {};
        if (search.trim()) params.search = search.trim();
        if (propertyTypeId) params.property_type_id = propertyTypeId;
        if (areaId) params.area_id = areaId;
        if (purpose) params.purpose = purpose;
        if (sort === "price_asc") params.sort = "price_asc";
        if (sort === "price_desc") params.sort = "price_desc";
        
        loadProperties(params);
    }

    function handleReset() {
        setSearch("");
        setPropertyTypeId("");
        setCityId("");
        setAreaId("");
        setPurpose("");
        setSort("latest");
        loadProperties();
    }

    /*
    |--------------------------------------------------------------------------
    | Areas By City
    |--------------------------------------------------------------------------
    */
    const filteredAreas = cityId
        ? areas.filter((area) => {
              const currentCityId = area.city_id ?? area.city?.id;
              return String(currentCityId) === String(cityId);
          })
        : areas;

    function handleCityChange(value: string) {
        setCityId(value);
        setAreaId(""); // Reset area when city changes
    }

    // فئة مشتركة لضمان محاذاة النص بشكل صحيح في العربية والإنجليزية
    const inputClass = `
        rounded-xl border border-gray-200 bg-white px-5 py-4 text-gray-700 
        outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100
        ${isRTL ? "text-right" : "text-left"}
    `;

    return (
        <main className="min-h-screen bg-gray-50" dir={isRTL ? "rtl" : "ltr"}>
            {/* Header */}
            <section className="border-b bg-white">
                <div className="mx-auto max-w-7xl px-6 py-12">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
                        ElKhial Estate
                    </p>
                    <h1 className="text-4xl font-extrabold text-gray-900 md:text-5xl">
                        {t.propertiesPageTitle}
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg text-gray-500">
                        {t.propertiesPageSubtitle}
                    </p>
                </div>
            </section>

            {/* Search */}
            <section className="relative z-10 mx-auto -mt-6 max-w-7xl px-6">
                <div className="rounded-2xl bg-white p-5 shadow-xl">
                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                        
                        {/* Search Input */}
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            placeholder={t.searchPlaceholder}
                            className={inputClass}
                        />

                        {/* Property Type */}
                        <select value={propertyTypeId} onChange={(e) => setPropertyTypeId(e.target.value)} className={inputClass}>
                            <option value="">{t.allPropertyTypes}</option>
                            {propertyTypes.map((type) => (
                                <option key={type.id} value={type.id}>{type.name}</option>
                            ))}
                        </select>

                        {/* City */}
                        <select value={cityId} onChange={(e) => handleCityChange(e.target.value)} className={inputClass}>
                            <option value="">{t.allLocations}</option>
                            {cities.map((city) => (
                                <option key={city.id} value={city.id}>{city.name}</option>
                            ))}
                        </select>

                        {/* Area */}
                        <select 
                            value={areaId} 
                            onChange={(e) => setAreaId(e.target.value)} 
                            disabled={!cityId && areas.length === 0} 
                            className={`${inputClass} disabled:cursor-not-allowed disabled:bg-gray-100`}
                        >
                            <option value="">{t.allAreas}</option>
                            {filteredAreas.map((area) => (
                                <option key={area.id} value={area.id}>{area.name}</option>
                            ))}
                        </select>

                        {/* Purpose */}
                        <select value={purpose} onChange={(e) => setPurpose(e.target.value)} className={inputClass}>
                            <option value="">{t.anyPurpose}</option>
                            <option value="sale">{t.forSale}</option>
                            <option value="rent">{t.forRent}</option>
                        </select>

                        {/* Search Button */}
                        <button
                            type="button"
                            onClick={handleSearch}
                            disabled={loading}
                            className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading ? t.searching : t.search}
                        </button>

                        {/* Reset Button */}
                        <button
                            type="button"
                            onClick={handleReset}
                            className="rounded-xl border border-gray-200 bg-gray-50 px-8 py-4 font-semibold text-gray-700 transition hover:bg-gray-100"
                        >
                            {t.reset}
                        </button>
                    </div>
                </div>
            </section>

            {/* Properties List */}
            <section className="mx-auto max-w-7xl px-6 py-14">
                <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{t.availableProperties}</h2>
                        <p className="mt-1 text-gray-500">
                            {loading ? t.searching : `${properties.length} ${t.propertiesFound}`}
                        </p>
                    </div>

                    {/* Sort */}
                    <select
                        value={sort}
                        onChange={(e) => {
                            const value = e.target.value;
                            setSort(value);
                            const params: Record<string, string> = {};
                            if (search.trim()) params.search = search.trim();
                            if (propertyTypeId) params.property_type_id = propertyTypeId;
                            if (areaId) params.area_id = areaId;
                            if (purpose) params.purpose = purpose;
                            if (value !== "latest") params.sort = value;
                            loadProperties(params);
                        }}
                        className={`rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none ${isRTL ? "text-right" : "text-left"}`}
                    >
                        <option value="latest">{t.sortLatest}</option>
                        <option value="price_asc">{t.sortPriceAsc}</option>
                        <option value="price_desc">{t.sortPriceDesc}</option>
                    </select>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="h-[420px] animate-pulse rounded-2xl bg-gray-200" />
                        ))}
                    </div>
                ) : properties.length === 0 ? (
                    /* Empty State */
                    <div className="rounded-2xl bg-white py-20 text-center shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-900">{t.noPropertiesFound}</h3>
                        <p className="mt-2 text-gray-500">{t.tryChangingCriteria}</p>
                    </div>
                ) : (
                    /* Properties Grid */
                    <div className={properties.length === 1 ? "grid grid-cols-1" : "grid gap-7 sm:grid-cols-2 lg:grid-cols-3"}>
                        {properties.map((property) => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
