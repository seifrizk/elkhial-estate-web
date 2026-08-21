"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { useRouter } from "next/navigation";

import {
    Eye,
    Pencil,
    Trash2,
    Images,
    Video,
    MapPin,
    BedDouble,
    Bath,
    Ruler,
} from "lucide-react";

import { Property } from "@/types/property";
import { deleteProperty } from "@/services/property";

interface Props {
    property: Property;
}

function getStatusStyle(status?: string) {
    switch (status) {
        case "approved":
            return "bg-green-100 text-green-700";

        case "rejected":
            return "bg-red-100 text-red-700";

        case "pending":
            return "bg-yellow-100 text-yellow-700";

        default:
            return "bg-gray-100 text-gray-700";
    }
}

function formatStatus(status?: string) {
    if (!status) {
        return "Unknown";
    }

    return status
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function MyPropertyCard({
    property,
}: Props) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    async function handleDelete() {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${property.title}"?`
        );

        if (!confirmed) {
            return;
        }

        try {
            setLoading(true);

            await deleteProperty(property.id);

            router.refresh();
        } catch (error) {
            console.error(
                "Failed to delete property:",
                error
            );

            alert(
                "Unable to delete this property. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }

    const image =
        property.images?.find(
            (item) => item.is_cover
        )?.url ??
        property.images?.[0]?.url ??
        null;

    return (
        <article
            className="
                group
                overflow-hidden
                rounded-2xl
                border
                border-gray-200
                bg-white
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
            "
        >
            {/* Image */}
            <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                {image ? (
                    <Image
                        src={image}
                        alt={property.title}
                        fill
                        className="
                            object-cover
                            transition-transform
                            duration-500
                            group-hover:scale-105
                        "
                    />
                ) : (
                    <div
                        className="
                            flex
                            h-full
                            items-center
                            justify-center
                            text-sm
                            text-gray-400
                        "
                    >
                        No Image
                    </div>
                )}

                {/* Status */}
                <div className="absolute left-4 top-4">
                    <span
                        className={`
                            rounded-full
                            px-3
                            py-1.5
                            text-xs
                            font-semibold
                            ${getStatusStyle(property.status)}
                        `}
                    >
                        {formatStatus(property.status)}
                    </span>
                </div>

                {/* Property type */}
                {property.property_type?.name && (
                    <div className="absolute right-4 top-4">
                        <span
                            className="
                                rounded-full
                                bg-white/95
                                px-3
                                py-1.5
                                text-xs
                                font-semibold
                                text-gray-700
                                shadow-sm
                            "
                        >
                            {property.property_type.name}
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5">
                <h2
                    className="
                        line-clamp-1
                        text-xl
                        font-bold
                        text-gray-900
                    "
                >
                    {property.title}
                </h2>

                {/* Location */}
                <div
                    className="
                        mt-2
                        flex
                        items-center
                        gap-1.5
                        text-sm
                        text-gray-500
                    "
                >
                    <MapPin size={16} />

                    <span className="line-clamp-1">
                        {property.address ||
                            property.area?.name ||
                            "Location unavailable"}
                    </span>
                </div>

                {/* Price */}
                <div className="mt-5">
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        Price
                    </p>

                    <p className="mt-1 text-2xl font-bold text-blue-600">
                        {property.price}{" "}
                        {property.currency}
                    </p>
                </div>

                {/* Property stats */}
                <div
                    className="
                        mt-5
                        grid
                        grid-cols-3
                        gap-2
                        border-y
                        border-gray-100
                        py-4
                    "
                >
                    <div className="text-center">
                        <BedDouble
                            size={18}
                            className="mx-auto text-gray-400"
                        />

                        <p className="mt-1 text-xs text-gray-400">
                            Beds
                        </p>

                        <p className="font-semibold text-gray-800">
                            {property.bedrooms ?? "-"}
                        </p>
                    </div>

                    <div className="text-center">
                        <Bath
                            size={18}
                            className="mx-auto text-gray-400"
                        />

                        <p className="mt-1 text-xs text-gray-400">
                            Baths
                        </p>

                        <p className="font-semibold text-gray-800">
                            {property.bathrooms ?? "-"}
                        </p>
                    </div>

                    <div className="text-center">
                        <Ruler
                            size={18}
                            className="mx-auto text-gray-400"
                        />

                        <p className="mt-1 text-xs text-gray-400">
                            Area
                        </p>

                        <p className="font-semibold text-gray-800">
                            {property.area_size
                                ? `${property.area_size} m²`
                                : "-"}
                        </p>
                    </div>
                </div>

                {/* Media summary */}
                <div
                    className="
                        mt-4
                        flex
                        items-center
                        gap-4
                        text-xs
                        text-gray-500
                    "
                >
                    <span className="flex items-center gap-1.5">
                        <Images size={15} />

                        {property.images?.length ?? 0} Images
                    </span>

                    <span className="flex items-center gap-1.5">
                        <Video size={15} />

                        {property.videos?.length ?? 0} Videos
                    </span>
                </div>

                {/* Actions */}
                <div className="mt-5 grid grid-cols-3 gap-2">
                    <Link
                        href={`/properties/${property.id}`}
                        className="
                            flex
                            items-center
                            justify-center
                            gap-1.5
                            rounded-lg
                            bg-blue-600
                            px-3
                            py-2.5
                            text-sm
                            font-semibold
                            text-white
                            transition
                            hover:bg-blue-700
                        "
                    >
                        <Eye size={16} />
                        View
                    </Link>

                    <Link
                        href={`/properties/${property.id}/edit`}
                        className="
                            flex
                            items-center
                            justify-center
                            gap-1.5
                            rounded-lg
                            bg-gray-100
                            px-3
                            py-2.5
                            text-sm
                            font-semibold
                            text-gray-700
                            transition
                            hover:bg-gray-200
                        "
                    >
                        <Pencil size={16} />
                        Edit
                    </Link>

                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={loading}
                        className="
                            flex
                            items-center
                            justify-center
                            gap-1.5
                            rounded-lg
                            bg-red-50
                            px-3
                            py-2.5
                            text-sm
                            font-semibold
                            text-red-600
                            transition
                            hover:bg-red-100
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        <Trash2 size={16} />

                        {loading ? "Deleting..." : "Delete"}
                    </button>
                </div>

                {/* Manage media */}
                <Link
                    href={`/properties/${property.id}/edit`}
                    className="
                        mt-3
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-lg
                        border
                        border-gray-200
                        px-4
                        py-2.5
                        text-sm
                        font-medium
                        text-gray-600
                        transition
                        hover:border-blue-200
                        hover:bg-blue-50
                        hover:text-blue-600
                    "
                >
                    <Images size={16} />
                    Manage Property Media
                </Link>
            </div>
        </article>
    );
}
