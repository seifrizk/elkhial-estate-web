"use client";

import Image from "next/image";
import { useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    Play,
} from "lucide-react";

interface PropertyImage {
    id: number;
    url: string;
    alt_text?: string | null;
    is_cover: boolean;
}

interface PropertyVideo {
    id: number;
    url: string;
    thumbnail?: string | null;
    duration?: number | null;
    video_type?: string | null;
}

interface MediaItem {
    type: "image" | "video";
    id: number;
    url: string;
    thumbnail?: string | null;
    alt_text?: string | null;
}

interface Props {
    images: PropertyImage[];
    videos?: PropertyVideo[];
}

export default function PropertyGallery({
    images = [],
    videos = [],
}: Props) {
    const media: MediaItem[] = [
        ...(images ?? []).map((image) => ({
            type: "image" as const,
            id: image.id,
            url: image.url,
            alt_text: image.alt_text,
        })),

        ...(videos ?? []).map((video) => ({
            type: "video" as const,
            id: video.id,
            url: video.url,
            thumbnail: video.thumbnail,
        })),
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    if (media.length === 0) {
        return (
            <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                No Media
            </div>
        );
    }

    const activeMedia =
        media[activeIndex] ?? media[0];

    function previousMedia() {
        setActiveIndex((current) =>
            current === 0
                ? media.length - 1
                : current - 1
        );
    }

    function nextMedia() {
        setActiveIndex((current) =>
            current === media.length - 1
                ? 0
                : current + 1
        );
    }

    return (
        <div className="space-y-4">

            {/* ========================================================= */}
            {/* Main Media */}
            {/* ========================================================= */}

            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-100">

                <div className="relative min-h-[420px] md:min-h-[560px]">

                    {activeMedia.type === "image" ? (
                        <Image
                            src={activeMedia.url}
                            alt={
                                activeMedia.alt_text ??
                                "Property image"
                            }
                            fill
                            sizes="
                                (max-width: 768px) 100vw,
                                50vw
                            "
                            className="object-contain p-2"
                        />
                    ) : (
                        <video
                            key={activeMedia.id}
                            controls
                            playsInline
                            preload="metadata"
                            className="
                                h-full
                                min-h-[420px]
                                w-full
                                bg-black
                                object-contain
                                md:min-h-[560px]
                            "
                        >
                            <source
                                src={activeMedia.url}
                            />

                            Your browser does not support
                            video playback.
                        </video>
                    )}

                    {/* Media Counter / Type */}

                    <div className="absolute left-4 top-4 rounded-full bg-black/65 px-3 py-1.5 text-xs font-semibold text-white">
                        {activeMedia.type === "video"
                            ? "VIDEO"
                            : `${activeIndex + 1} / ${media.length}`}
                    </div>

                    {/* Navigation */}

                    {media.length > 1 && (
                        <>
                            <button
                                type="button"
                                onClick={previousMedia}
                                aria-label="Previous media"
                                className="
                                    absolute
                                    left-4
                                    top-1/2
                                    flex
                                    h-10
                                    w-10
                                    -translate-y-1/2
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-white/95
                                    text-gray-700
                                    shadow
                                    transition
                                    hover:bg-white
                                "
                            >
                                <ChevronLeft size={20} />
                            </button>

                            <button
                                type="button"
                                onClick={nextMedia}
                                aria-label="Next media"
                                className="
                                    absolute
                                    right-4
                                    top-1/2
                                    flex
                                    h-10
                                    w-10
                                    -translate-y-1/2
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-white/95
                                    text-gray-700
                                    shadow
                                    transition
                                    hover:bg-white
                                "
                            >
                                <ChevronRight size={20} />
                            </button>
                        </>
                    )}

                </div>
            </div>

            {/* ========================================================= */}
            {/* Thumbnails */}
            {/* ========================================================= */}

            {media.length > 1 && (
                <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">

                    {media.map((item, index) => (
                        <button
                            key={`${item.type}-${item.id}`}
                            type="button"
                            onClick={() =>
                                setActiveIndex(index)
                            }
                            aria-label={
                                item.type === "video"
                                    ? `Open video ${index + 1}`
                                    : `Open image ${index + 1}`
                            }
                            className={`
                                relative
                                aspect-[4/3]
                                overflow-hidden
                                rounded-xl
                                border-2
                                bg-gray-100
                                transition
                                ${
                                    index === activeIndex
                                        ? "border-blue-600 ring-2 ring-blue-100"
                                        : "border-transparent hover:border-gray-300"
                                }
                            `}
                        >

                            {/* Image Thumbnail */}

                            {item.type === "image" ? (
                                <Image
                                    src={item.url}
                                    alt={
                                        item.alt_text ??
                                        "Property thumbnail"
                                    }
                                    fill
                                    sizes="150px"
                                    className="object-cover"
                                />
                            ) : (
                                /* Video Thumbnail */
                                <>
                                    {item.thumbnail ? (
                                        <Image
                                            src={item.thumbnail}
                                            alt="Property video"
                                            fill
                                            sizes="150px"
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-gray-900">
                                            <Play
                                                size={30}
                                                className="text-white"
                                                fill="currentColor"
                                            />
                                        </div>
                                    )}

                                    {/* Video Overlay */}

                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow">

                                            <Play
                                                size={18}
                                                className="ml-0.5 text-gray-900"
                                                fill="currentColor"
                                            />

                                        </div>

                                    </div>

                                    {/* Video Label */}

                                    <div className="absolute bottom-2 left-2 rounded-full bg-black/70 px-2 py-1 text-[10px] font-bold text-white">
                                        VIDEO
                                    </div>
                                </>
                            )}

                        </button>
                    ))}

                </div>
            )}

        </div>
    );
}
