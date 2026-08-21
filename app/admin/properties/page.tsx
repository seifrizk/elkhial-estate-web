"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

import {
    getPendingProperties,
    changePropertyStatus,
} from "@/services/admin-property";

interface Property {
    id: number;
    title: string;
    price: string | number;
    currency?: string;
    status?: string;
    address?: string;
    property_code?: string;
}

export default function AdminPropertiesPage() {
    const [properties, setProperties] = useState<Property[]>(
        []
    );

    const [loading, setLoading] = useState(true);

    const [processingId, setProcessingId] =
        useState<number | null>(null);

    async function loadProperties() {
        try {
            setLoading(true);

            const response =
                await getPendingProperties();

            console.log(
                "PENDING PROPERTIES:",
                response.data
            );

            setProperties(
                response.data?.data?.data ??
                response.data?.data ??
                []
            );
        } catch (error: any) {
            console.error(
                "========== ADMIN PROPERTIES ERROR =========="
            );

            console.error(
                "STATUS:",
                error.response?.status
            );

            console.error(
                "DATA:",
                error.response?.data
            );

            console.error(
                "URL:",
                error.config?.url
            );

            console.error(
                "BASE URL:",
                error.config?.baseURL
            );

            console.error(
                "FULL URL:",
                `${error.config?.baseURL}${error.config?.url}`
            );

            console.error(
                "============================================"
            );
        }
          finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadProperties();
    }, []);

    async function handleStatus(
        id: number,
        status: "published" | "rejected"
    ) {
        try {
            setProcessingId(id);

            const response =
                await changePropertyStatus(
                    id,
                    status
                );

            console.log(
                "STATUS UPDATED:",
                response.data
            );

            setProperties((current) =>
                current.filter(
                    (property) =>
                        property.id !== id
                )
            );
        } catch (error: any) {
            console.error(
                "Failed to change property status:",
                error.response?.data ?? error
            );

            alert(
                error.response?.data?.message ??
                "Failed to update property status."
            );
        } finally {
            setProcessingId(null);
        }
    }

    return (
        <ProtectedRoute>
            <main className="min-h-screen bg-gray-50">
                <div className="mx-auto max-w-7xl px-6 py-10">

                    {/* Header */}

                    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                        <div>
                            <p className="text-sm font-semibold text-blue-600">
                                Admin Panel
                            </p>

                            <h1 className="mt-1 text-3xl font-extrabold text-gray-900">
                                Pending Properties
                            </h1>

                            <p className="mt-2 text-gray-500">
                                Review and approve property listings.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={loadProperties}
                            className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
                        >
                            Refresh
                        </button>

                    </div>

                    {/* Loading */}

                    {loading && (
                        <div className="rounded-2xl border bg-white p-12 text-center shadow-sm">
                            <div className="text-lg font-semibold text-gray-700">
                                Loading pending properties...
                            </div>
                        </div>
                    )}

                    {/* Empty */}

                    {!loading &&
                        properties.length === 0 && (
                            <div className="rounded-2xl border bg-white p-12 text-center shadow-sm">

                                <div className="text-5xl">
                                    ✅
                                </div>

                                <h2 className="mt-4 text-xl font-bold text-gray-900">
                                    No pending properties
                                </h2>

                                <p className="mt-2 text-gray-500">
                                    All properties have been reviewed.
                                </p>

                            </div>
                        )}

                    {/* Properties */}

                    {!loading &&
                        properties.length > 0 && (
                            <div className="space-y-4">

                                {properties.map(
                                    (property) => (
                                        <div
                                            key={
                                                property.id
                                            }
                                            className="rounded-2xl border bg-white p-6 shadow-sm"
                                        >

                                            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                                                {/* Information */}

                                                <div className="min-w-0">

                                                    <div className="flex flex-wrap items-center gap-3">

                                                        <h2 className="text-xl font-bold text-gray-900">
                                                            {
                                                                property.title
                                                            }
                                                        </h2>

                                                        <span className="rounded-full bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-700">
                                                            pending
                                                        </span>

                                                    </div>

                                                    <p className="mt-2 text-sm text-gray-500">
                                                        {
                                                            property.address ??
                                                            "No address"
                                                        }
                                                    </p>

                                                    <p className="mt-3 text-lg font-bold text-blue-600">
                                                        {
                                                            property.price
                                                        }{" "}
                                                        {
                                                            property.currency ??
                                                            "EGP"
                                                        }
                                                    </p>

                                                    <p className="mt-1 text-xs text-gray-400">
                                                        Property ID:{" "}
                                                        {
                                                            property.id
                                                        }
                                                    </p>

                                                </div>

                                                {/* Actions */}

                                                <div className="flex flex-wrap gap-3">

                                                    <Link
                                                        href={`/properties/${property.id}`}
                                                        className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                                                    >
                                                        View
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        disabled={
                                                            processingId ===
                                                            property.id
                                                        }
                                                        onClick={() =>
                                                            handleStatus(
                                                                property.id,
                                                                "rejected"
                                                            )
                                                        }
                                                        className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                                                    >
                                                        {processingId ===
                                                        property.id
                                                            ? "Processing..."
                                                            : "Reject"}
                                                    </button>

                                                    <button
                                                        type="button"
                                                        disabled={
                                                            processingId ===
                                                            property.id
                                                        }
                                                        onClick={() =>
                                                            handleStatus(
                                                                property.id,
                                                                "published"
                                                            )
                                                        }
                                                        className="rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                                                    >
                                                        {processingId ===
                                                        property.id
                                                            ? "Processing..."
                                                            : "Approve"}
                                                    </button>

                                                </div>

                                            </div>

                                        </div>
                                    )
                                )}

                            </div>
                        )}

                </div>
            </main>
        </ProtectedRoute>
    );
}
