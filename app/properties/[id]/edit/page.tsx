"use client";

import { useEffect, useState } from "react";
import {
    useParams,
    useRouter,
} from "next/navigation";
import PropertyMediaManager from "@/components/property/PropertyMediaManager";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import PropertyForm from "@/components/property/PropertyForm";

import { getProperty } from "@/services/property";

import { Property } from "@/types/property";

export default function EditPropertyPage() {

    const { id } = useParams();
    const router = useRouter();
    const [property, setProperty] =
        useState<Property | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        async function loadProperty() {

            try {

                const response =
                    await getProperty(id as string);

                setProperty(response.data);

            } finally {

                setLoading(false);

            }

        }

        loadProperty();

    }, [id]);

    if (loading) {

        return (
            <div className="p-10">
                Loading...
            </div>
        );

    }

    if (!property) {

    return (

        <ProtectedRoute>

            <main className="max-w-5xl mx-auto py-10 px-6">

                <h1 className="text-3xl font-bold">

                    Property not found

                </h1>

            </main>

        </ProtectedRoute>

    );

}
    return (

        <ProtectedRoute>

            <main className="max-w-5xl mx-auto py-10 px-6">

                <h1 className="text-3xl font-bold mb-8">

                    Edit Property

                </h1>

                <PropertyForm

                    property={property}

                    isEdit

                />

                <div className="mt-12">

                    <PropertyMediaManager
                        propertyId={property.id}
                        images={property.images ?? []}
                        videos={property.videos ?? []}
                    />

                </div>
            </main>

        </ProtectedRoute>

    );

}
