"use client";

import { useEffect, useState } from "react";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import MyPropertyCard from "@/components/property/MyPropertyCard";

import { getMyProperties } from "@/services/my-properties";

import { Property } from "@/types/property";

export default function MyPropertiesPage() {

    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProperties();
    }, []);

    async function loadProperties() {

        try {

            const response = await getMyProperties();

            setProperties(response.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    return (

        <ProtectedRoute>

            <main className="mx-auto max-w-7xl px-6 py-10">

                <div className="mb-8 flex items-center justify-between">

                    <h1 className="text-3xl font-bold">

                        My Properties

                    </h1>

                    <a
                        href="/properties/create"
                        className="rounded-lg bg-blue-600 px-5 py-3 text-white"
                    >
                        + Add Property
                    </a>

                </div>

                {loading ? (

                    <div>Loading...</div>

                ) : properties.length === 0 ? (

                    <div className="rounded-xl border bg-white p-10 text-center">

                        <h2 className="text-xl font-semibold">

                            No properties yet

                        </h2>

                        <p className="mt-2 text-gray-500">

                            Start by adding your first property.

                        </p>

                    </div>

                ) : (

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                        {properties.map((property) => (

                            <MyPropertyCard
                                key={property.id}
                                property={property}
                            />

                        ))}

                    </div>

                )}

            </main>

        </ProtectedRoute>

    );

}
