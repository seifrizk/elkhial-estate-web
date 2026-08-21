"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, ArrowRight, Home } from "lucide-react";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

import {
    getFavorites,
    removeFavorite,
} from "@/services/favorite";

interface Property {
    id: number;
    title: string;
    price: string | number;
    currency?: string;
    bedrooms?: number;
    bathrooms?: number;
    area_size?: number | string;
    address?: string;
    area?: {
        name?: string;
    };
    images?: {
        id?: number;
        url: string;
        is_cover?: boolean;
    }[];
    property_type?: {
        name?: string;
    };
}

export default function FavoritesPage() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [removingId, setRemovingId] = useState<number | null>(null);

    useEffect(() => {
        async function load() {
            try {
                const response = await getFavorites();

                setProperties(
                    response?.data?.data ??
                    response?.data ??
                    []
                );
            } catch (error) {
                console.error(
                    "Favorites loading error:",
                    error
                );
            } finally {
                setLoading(false);
            }
        }

        load();
    }, []);

    async function handleRemove(propertyId: number) {
        try {
            setRemovingId(propertyId);

            await removeFavorite(propertyId);

            setProperties((current) =>
                current.filter(
                    (property) =>
                        property.id !== propertyId
                )
            );
        } catch (error) {
            console.error(
                "Remove favorite error:",
                error
            );
        } finally {
            setRemovingId(null);
        }
    }

    return (
        <ProtectedRoute>
            <main className="min-h-screen bg-gray-50">

                <div className="mx-auto max-w-7xl px-6 py-10">

                    {/* Header */}

                    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

                        <div>

                            <div className="flex items-center gap-3">

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
                                    <Heart
                                        size={24}
                                        className="fill-red-500 text-red-500"
                                    />
                                </div>

                                <div>

                                    <h1 className="text-4xl font-extrabold text-gray-900">
                                        Favorites
                                    </h1>

                                    <p className="mt-1 text-gray-500">
                                        Properties you've saved for later
                                    </p>

                                </div>

                            </div>

                        </div>

                        {!loading && properties.length > 0 && (
                            <div className="rounded-xl bg-white px-5 py-3 shadow-sm ring-1 ring-gray-100">

                                <p className="text-sm text-gray-500">
                                    Saved Properties
                                </p>

                                <p className="text-2xl font-bold text-gray-900">
                                    {properties.length}
                                </p>

                            </div>
                        )}

                    </div>

                    {/* Loading */}

                    {loading ? (

                        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                            {[1, 2, 3, 4, 5, 6].map(
                                (item) => (
                                    <div
                                        key={item}
                                        className="
                                            h-[420px]
                                            animate-pulse
                                            rounded-3xl
                                            bg-white
                                        "
                                    />
                                )
                            )}

                        </div>

                    ) : properties.length === 0 ? (

                        /* Empty State */

                        <div className="mt-12 rounded-3xl border bg-white px-6 py-20 text-center shadow-sm">

                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50">

                                <Heart
                                    size={38}
                                    className="text-red-400"
                                />

                            </div>

                            <h2 className="mt-6 text-2xl font-bold text-gray-900">
                                No favorites yet
                            </h2>

                            <p className="mx-auto mt-2 max-w-md text-gray-500">
                                Save properties you love and
                                they'll appear here so you can
                                easily find them later.
                            </p>

                            <Link
                                href="/properties"
                                className="
                                    mt-7
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-xl
                                    bg-blue-600
                                    px-6
                                    py-3
                                    font-semibold
                                    text-white
                                    transition
                                    hover:bg-blue-700
                                "
                            >
                                <Home size={18} />

                                Browse Properties

                                <ArrowRight size={18} />

                            </Link>

                        </div>

                    ) : (

                        /* Favorites Grid */

                        <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

                            {properties.map(
                                (property) => {

                                    const image =
                                        property.images?.find(
                                            (img) =>
                                                img.is_cover
                                        )?.url ??
                                        property.images?.[0]
                                            ?.url ??
                                        null;

                                    const location =
                                        property.area?.name ??
                                        property.address ??
                                        "Egypt";

                                    return (
                                        <article
                                            key={property.id}
                                            className="
                                                group
                                                overflow-hidden
                                                rounded-3xl
                                                border
                                                bg-white
                                                shadow-sm
                                                transition
                                                duration-300
                                                hover:-translate-y-1
                                                hover:shadow-xl
                                            "
                                        >

                                            {/* Image */}

                                            <div className="relative h-64 overflow-hidden bg-gray-100">

                                                {image ? (

                                                    <img
                                                        src={image}
                                                        alt={
                                                            property.title
                                                        }
                                                        className="
                                                            h-full
                                                            w-full
                                                            object-cover
                                                            transition
                                                            duration-500
                                                            group-hover:scale-105
                                                        "
                                                    />

                                                ) : (

                                                    <div className="flex h-full items-center justify-center text-gray-400">
                                                        No Image
                                                    </div>

                                                )}

                                                {/* Property type */}

                                                {property.property_type?.name && (
                                                    <div className="absolute left-4 top-4">

                                                        <span className="rounded-full bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow">
                                                            {
                                                                property
                                                                    .property_type
                                                                    .name
                                                            }
                                                        </span>

                                                    </div>
                                                )}

                                                {/* Remove favorite */}

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleRemove(
                                                            property.id
                                                        )
                                                    }
                                                    disabled={
                                                        removingId ===
                                                        property.id
                                                    }
                                                    aria-label="Remove from favorites"
                                                    className="
                                                        absolute
                                                        right-4
                                                        top-4
                                                        flex
                                                        h-11
                                                        w-11
                                                        items-center
                                                        justify-center
                                                        rounded-full
                                                        bg-white
                                                        text-red-500
                                                        shadow-lg
                                                        transition
                                                        hover:scale-105
                                                        hover:bg-red-50
                                                        disabled:cursor-not-allowed
                                                        disabled:opacity-60
                                                    "
                                                >

                                                    <Heart
                                                        size={20}
                                                        className="fill-red-500"
                                                    />

                                                </button>

                                            </div>

                                            {/* Content */}

                                            <div className="p-6">

                                                <Link
                                                    href={`/properties/${property.id}`}
                                                >

                                                    <h2 className="line-clamp-1 text-xl font-bold text-gray-900 transition hover:text-blue-600">
                                                        {
                                                            property.title
                                                        }
                                                    </h2>

                                                </Link>

                                                <p className="mt-2 line-clamp-1 text-sm text-gray-500">
                                                    📍 {location}
                                                </p>

                                                {/* Details */}

                                                <div className="mt-5 grid grid-cols-3 gap-2">

                                                    <div className="rounded-xl bg-gray-50 px-2 py-3 text-center">

                                                        <p className="text-lg">
                                                            🛏
                                                        </p>

                                                        <p className="mt-1 text-xs text-gray-400">
                                                            Beds
                                                        </p>

                                                        <p className="font-bold text-gray-800">
                                                            {
                                                                property
                                                                    .bedrooms ??
                                                                "-"
                                                            }
                                                        </p>

                                                    </div>

                                                    <div className="rounded-xl bg-gray-50 px-2 py-3 text-center">

                                                        <p className="text-lg">
                                                            🚿
                                                        </p>

                                                        <p className="mt-1 text-xs text-gray-400">
                                                            Baths
                                                        </p>

                                                        <p className="font-bold text-gray-800">
                                                            {
                                                                property
                                                                    .bathrooms ??
                                                                "-"
                                                            }
                                                        </p>

                                                    </div>

                                                    <div className="rounded-xl bg-gray-50 px-2 py-3 text-center">

                                                        <p className="text-lg">
                                                            📐
                                                        </p>

                                                        <p className="mt-1 text-xs text-gray-400">
                                                            m²
                                                        </p>

                                                        <p className="font-bold text-gray-800">
                                                            {
                                                                property
                                                                    .area_size ??
                                                                "-"
                                                            }
                                                        </p>

                                                    </div>

                                                </div>

                                                {/* Bottom */}

                                                <div className="mt-6 flex items-end justify-between border-t pt-5">

                                                    <div>

                                                        <p className="text-xs text-gray-400">
                                                            Price
                                                        </p>

                                                        <p className="mt-1 text-xl font-extrabold text-blue-600">

                                                            {
                                                                property.price
                                                            }{" "}

                                                            {
                                                                property.currency ??
                                                                ""
                                                            }

                                                        </p>

                                                    </div>

                                                    <Link
                                                        href={`/properties/${property.id}`}
                                                        className="
                                                            flex
                                                            items-center
                                                            gap-1
                                                            text-sm
                                                            font-bold
                                                            text-blue-600
                                                            transition
                                                            hover:text-blue-700
                                                        "
                                                    >
                                                        View

                                                        <ArrowRight
                                                            size={16}
                                                        />

                                                    </Link>

                                                </div>

                                            </div>

                                        </article>
                                    );
                                }
                            )}

                        </div>

                    )}

                </div>

            </main>
        </ProtectedRoute>
    );
}
