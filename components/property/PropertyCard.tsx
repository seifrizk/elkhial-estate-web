import Image from "next/image";
import Link from "next/link";

import {
    Bath,
    BedDouble,
    MapPin,
    Ruler,
} from "lucide-react";

import { Property } from "@/types/property";

interface Props {
    property: Property;
}

export default function PropertyCard({ property }: Props) {
    const image =
        property.images?.find(
            (img) => img.is_cover
        )?.url ??
        property.images?.[0]?.url ??
        null;

    return (
        <Link
            href={`/properties/${property.id}`}
            className="group block"
        >
            <article
                className="
                    overflow-hidden
                    rounded-2xl
                    bg-white
                    shadow-sm
                    ring-1
                    ring-gray-100
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-xl
                "
            >
                {/* Image */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">

                    {image ? (
                        <Image
                            src={image}
                            alt={property.title}
                            fill
                            sizes="
                                (max-width: 640px) 100vw,
                                (max-width: 1024px) 50vw,
                                33vw
                            "
                            className="
                                object-contain
                                p-2
                                transition-transform
                                duration-500
                                group-hover:scale-[1.02]
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

                    {/* Property Type */}
                    <div className="absolute left-4 top-4">
                        <span
                            className="
                                rounded-full
                                bg-white/95
                                px-3
                                py-1.5
                                text-xs
                                font-semibold
                                text-blue-700
                                shadow
                            "
                        >
                            {property.property_type?.name ?? "Property"}
                        </span>
                    </div>

                    {/* Price */}
                    <div className="absolute bottom-4 left-4">
                        <span
                            className="
                                rounded-lg
                                bg-blue-600
                                px-3
                                py-2
                                text-sm
                                font-bold
                                text-white
                                shadow-lg
                            "
                        >
                            {property.price} {property.currency}
                        </span>
                    </div>

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
                            {property.area?.name ?? "Location"}
                        </span>
                    </div>

                    {/* Features */}
                    <div
                        className="
                            mt-5
                            grid
                            grid-cols-3
                            divide-x
                            rounded-xl
                            border
                            bg-gray-50
                        "
                    >
                        {/* Bedrooms */}
                        <div className="flex flex-col items-center py-3">

                            <BedDouble
                                size={18}
                                className="text-blue-600"
                            />

                            <span className="mt-1 text-sm font-semibold text-gray-800">
                                {property.bedrooms ?? "-"}
                            </span>

                            <span className="text-xs text-gray-400">
                                Beds
                            </span>

                        </div>

                        {/* Bathrooms */}
                        <div className="flex flex-col items-center py-3">

                            <Bath
                                size={18}
                                className="text-blue-600"
                            />

                            <span className="mt-1 text-sm font-semibold text-gray-800">
                                {property.bathrooms ?? "-"}
                            </span>

                            <span className="text-xs text-gray-400">
                                Baths
                            </span>

                        </div>

                        {/* Area */}
                        <div className="flex flex-col items-center py-3">

                            <Ruler
                                size={18}
                                className="text-blue-600"
                            />

                            <span className="mt-1 text-sm font-semibold text-gray-800">
                                {property.area_size ?? "-"}
                            </span>

                            <span className="text-xs text-gray-400">
                                m²
                            </span>

                        </div>
                    </div>

                    {/* Footer */}
                    <div
                        className="
                            mt-5
                            flex
                            items-center
                            justify-between
                        "
                    >
                        <span className="text-sm font-medium text-gray-400">
                            View Property
                        </span>

                        <span
                            className="
                                rounded-lg
                                bg-blue-50
                                px-4
                                py-2
                                text-sm
                                font-semibold
                                text-blue-600
                                transition
                                group-hover:bg-blue-600
                                group-hover:text-white
                            "
                        >
                            Details →
                        </span>
                    </div>

                </div>
            </article>
        </Link>
    );
}
