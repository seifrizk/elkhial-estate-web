"use client";

import {
    MapContainer,
    Marker,
    TileLayer,
    useMapEvents,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Props {
    latitude: string;
    longitude: string;
    onChange: (
        latitude: string,
        longitude: string
    ) => void;
}

const markerIcon = L.icon({
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

function LocationMarker({
    onChange,
}: {
    onChange: (
        latitude: string,
        longitude: string
    ) => void;
}) {
    useMapEvents({
        click(event) {
            const { lat, lng } = event.latlng;

            onChange(
                lat.toFixed(6),
                lng.toFixed(6)
            );
        },
    });

    return null;
}

export default function PropertyLocationPicker({
    latitude,
    longitude,
    onChange,
}: Props) {
    const hasLocation =
        latitude !== "" &&
        longitude !== "";

    const lat = hasLocation
        ? Number(latitude)
        : 30.0444;

    const lng = hasLocation
        ? Number(longitude)
        : 31.2357;

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

            <div className="border-b bg-gray-50 px-5 py-4">

                <h3 className="font-semibold text-gray-900">
                    Select Property Location
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                    Click anywhere on the map to set the
                    property location.
                </p>

            </div>

            <MapContainer
                center={[lat, lng]}
                zoom={hasLocation ? 15 : 10}
                scrollWheelZoom
                className="h-[400px] w-full"
            >

                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <LocationMarker
                    onChange={onChange}
                />

                {hasLocation && (
                    <Marker
                        position={[
                            Number(latitude),
                            Number(longitude),
                        ]}
                        icon={markerIcon}
                    />
                )}

            </MapContainer>

            <div className="grid grid-cols-2 gap-4 p-5">

                <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        Latitude
                    </p>

                    <p className="mt-1 font-semibold text-gray-800">
                        {latitude || "Not selected"}
                    </p>
                </div>

                <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        Longitude
                    </p>

                    <p className="mt-1 font-semibold text-gray-800">
                        {longitude || "Not selected"}
                    </p>
                </div>

            </div>

        </div>
    );
}
