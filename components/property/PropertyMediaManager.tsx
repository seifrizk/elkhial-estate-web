"use client";

import { useRef, useState } from "react";

import {
    uploadPropertyImage,
    deletePropertyImage,
    uploadPropertyVideo,
    deletePropertyVideo,
} from "@/services/property";

import {
    setCoverImage,
} from "@/services/property";

interface Image {
    id: number;
    url: string;
    is_cover: boolean;
    alt_text?: string | null;
}

interface Video {
    id: number;
    url: string;
    thumbnail?: string | null;
}

interface Props {
    propertyId: number;
    images: Image[];
    videos?: Video[];
}

export default function PropertyMediaManager({
    propertyId,
    images: initialImages,
    videos: initialVideos = [],
}: Props) {
    const imageInput = useRef<HTMLInputElement>(null);
    const videoInput = useRef<HTMLInputElement>(null);

    const [images, setImages] = useState<Image[]>(
        initialImages ?? []
    );

    const [videos, setVideos] = useState<Video[]>(
        initialVideos ?? []
    );

    const [uploadingImages, setUploadingImages] =
        useState(false);

    const [uploadingVideo, setUploadingVideo] =
        useState(false);

    const [deletingId, setDeletingId] =
        useState<number | null>(null);

    const [error, setError] =
        useState<string | null>(null);

    /*
    |--------------------------------------------------------------------------
    | Upload Images
    |--------------------------------------------------------------------------
    */

    async function handleImageUpload(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const files = e.target.files;

        if (!files || files.length === 0) {
            return;
        }

        setError(null);
        setUploadingImages(true);

        try {
            const uploadedImages: Image[] = [];

            for (let i = 0; i < files.length; i++) {
                const file = files[i];

                const formData = new FormData();

                formData.append("image", file);

                /*
                 * If there is currently no cover,
                 * make the first uploaded image the cover.
                 */
                const hasCover =
                    images.some(
                        (image) => image.is_cover
                    );

                if (!hasCover && i === 0) {
                    formData.append(
                        "is_cover",
                        "1"
                    );
                } else {
                    formData.append(
                        "is_cover",
                        "0"
                    );
                }

                const response =
                    await uploadPropertyImage(
                        propertyId,
                        formData
                    );

                if (response?.data) {
                    uploadedImages.push(
                        response.data
                    );
                }
            }

            setImages((prev) => [
                ...prev,
                ...uploadedImages,
            ]);
        } catch (err) {
            console.error(
                "Failed to upload images:",
                err
            );

            setError(
                "Unable to upload one or more images."
            );
        } finally {
            setUploadingImages(false);

            if (imageInput.current) {
                imageInput.current.value = "";
            }
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Delete Image
    |--------------------------------------------------------------------------
    */

    async function handleDeleteImage(
        imageId: number
    ) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this image?"
        );

        if (!confirmed) {
            return;
        }

        setError(null);
        setDeletingId(imageId);

        try {
            await deletePropertyImage(
                imageId
            );

            setImages((prev) =>
                prev.filter(
                    (image) =>
                        image.id !== imageId
                )
            );
        } catch (err) {
            console.error(
                "Failed to delete image:",
                err
            );

            setError(
                "Unable to delete this image."
            );
        } finally {
            setDeletingId(null);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Set Cover
    |--------------------------------------------------------------------------
    */

    async function handleSetCover(
        imageId: number
    ) {
        setError(null);

        try {
            await setCoverImage(
                imageId
            );

            setImages((prev) =>
                prev.map((image) => ({
                    ...image,
                    is_cover:
                        image.id === imageId,
                }))
            );
        } catch (err) {
            console.error(
                "Failed to set cover image:",
                err
            );

            setError(
                "Unable to set this image as cover."
            );
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Upload Video
    |--------------------------------------------------------------------------
    */

    async function handleVideoUpload(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const file =
            e.target.files?.[0];

        if (!file) {
            return;
        }

        setError(null);
        setUploadingVideo(true);

        try {
            const formData =
                new FormData();

            formData.append(
                "video",
                file
            );

            const response =
                await uploadPropertyVideo(
                    propertyId,
                    formData
                );

            if (response?.data) {
                setVideos((prev) => [
                    ...prev,
                    response.data,
                ]);
            }
        } catch (err) {
            console.error(
                "Failed to upload video:",
                err
            );

            setError(
                "Unable to upload the video."
            );
        } finally {
            setUploadingVideo(false);

            if (videoInput.current) {
                videoInput.current.value = "";
            }
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Delete Video
    |--------------------------------------------------------------------------
    */

    async function handleDeleteVideo(
        videoId: number
    ) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this video?"
        );

        if (!confirmed) {
            return;
        }

        setError(null);
        setDeletingId(videoId);

        try {
            await deletePropertyVideo(
                propertyId,
                videoId
            );

            setVideos((prev) =>
                prev.filter(
                    (video) =>
                        video.id !== videoId
                )
            );
        } catch (err) {
            console.error(
                "Failed to delete video:",
                err
            );

            setError(
                "Unable to delete this video."
            );
        } finally {
            setDeletingId(null);
        }
    }

    return (
        <section className="space-y-10">

            {/* Header */}

            <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                    Property Media
                </p>

                <h2 className="mt-1 text-2xl font-bold text-gray-900">
                    Photos & Videos
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                    Add attractive photos and videos to
                    showcase your property.
                </p>
            </div>

            {/* Error */}

            {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            {/* ========================================================= */}
            {/* Images */}
            {/* ========================================================= */}

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                        <h3 className="text-xl font-bold text-gray-900">
                            Property Images
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                            {images.length}{" "}
                            {images.length === 1
                                ? "image"
                                : "images"}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            imageInput.current?.click()
                        }
                        disabled={uploadingImages}
                        className="
                            rounded-xl
                            bg-blue-600
                            px-5
                            py-3
                            text-sm
                            font-semibold
                            text-white
                            transition
                            hover:bg-blue-700
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        {uploadingImages
                            ? "Uploading..."
                            : "+ Upload Images"}
                    </button>

                </div>

                <input
                    ref={imageInput}
                    type="file"
                    hidden
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                />

                {/* Upload hint */}

                <div className="mt-5 rounded-xl bg-gray-50 p-4 text-sm text-gray-500">
                    You can select multiple images at once.
                    The first image will automatically become
                    the cover if no cover exists.
                </div>

                {/* Images Grid */}

                {images.length > 0 ? (

                    <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                        {images.map((image) => (

                            <div
                                key={image.id}
                                className="
                                    overflow-hidden
                                    rounded-2xl
                                    border
                                    border-gray-200
                                    bg-white
                                "
                            >

                                {/* Image */}

                                <div className="relative aspect-[4/3] bg-gray-100">

                                    <img
                                        src={image.url}
                                        alt={
                                            image.alt_text ??
                                            "Property image"
                                        }
                                        className="
                                            h-full
                                            w-full
                                            object-cover
                                        "
                                    />

                                    {image.is_cover && (

                                        <div className="absolute left-3 top-3">

                                            <span
                                                className="
                                                    rounded-full
                                                    bg-green-600
                                                    px-3
                                                    py-1.5
                                                    text-xs
                                                    font-bold
                                                    text-white
                                                    shadow
                                                "
                                            >
                                                ✓ Cover Image
                                            </span>

                                        </div>

                                    )}

                                </div>

                                {/* Controls */}

                                <div className="space-y-2 p-3">

                                    {!image.is_cover && (

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleSetCover(
                                                    image.id
                                                )
                                            }
                                            disabled={
                                                deletingId ===
                                                image.id
                                            }
                                            className="
                                                w-full
                                                rounded-lg
                                                border
                                                border-blue-200
                                                bg-blue-50
                                                px-3
                                                py-2.5
                                                text-sm
                                                font-semibold
                                                text-blue-700
                                                transition
                                                hover:bg-blue-100
                                            "
                                        >
                                            Set as Cover
                                        </button>

                                    )}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleDeleteImage(
                                                image.id
                                            )
                                        }
                                        disabled={
                                            deletingId ===
                                            image.id
                                        }
                                        className="
                                            w-full
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
                                        {deletingId ===
                                        image.id
                                            ? "Deleting..."
                                            : "Delete Image"}
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                ) : (

                    <div className="mt-6 rounded-2xl border-2 border-dashed border-gray-200 py-14 text-center">

                        <div className="text-4xl">
                            📷
                        </div>

                        <h4 className="mt-3 font-semibold text-gray-900">
                            No images yet
                        </h4>

                        <p className="mt-1 text-sm text-gray-500">
                            Upload photos to make your
                            property more attractive.
                        </p>

                    </div>

                )}

            </div>

            {/* ========================================================= */}
            {/* Videos */}
            {/* ========================================================= */}

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                        <h3 className="text-xl font-bold text-gray-900">
                            Property Videos
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                            {videos.length}{" "}
                            {videos.length === 1
                                ? "video"
                                : "videos"}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            videoInput.current?.click()
                        }
                        disabled={uploadingVideo}
                        className="
                            rounded-xl
                            bg-emerald-600
                            px-5
                            py-3
                            text-sm
                            font-semibold
                            text-white
                            transition
                            hover:bg-emerald-700
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        {uploadingVideo
                            ? "Uploading..."
                            : "+ Upload Video"}
                    </button>

                </div>

                <input
                    ref={videoInput}
                    type="file"
                    hidden
                    accept="video/*"
                    onChange={handleVideoUpload}
                />

                {videos.length > 0 ? (

                    <div className="mt-6 grid gap-5 md:grid-cols-2">

                        {videos.map((video) => (

                            <div
                                key={video.id}
                                className="
                                    overflow-hidden
                                    rounded-2xl
                                    border
                                    border-gray-200
                                    bg-gray-50
                                "
                            >

                                <video
                                    controls
                                    preload="metadata"
                                    className="
                                        aspect-video
                                        w-full
                                        bg-black
                                        object-cover
                                    "
                                >
                                    <source
                                        src={video.url}
                                    />
                                </video>

                                <div className="p-4">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleDeleteVideo(
                                                video.id
                                            )
                                        }
                                        disabled={
                                            deletingId ===
                                            video.id
                                        }
                                        className="
                                            w-full
                                            rounded-lg
                                            bg-red-50
                                            px-4
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
                                        {deletingId ===
                                        video.id
                                            ? "Deleting..."
                                            : "Delete Video"}
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                ) : (

                    <div className="mt-6 rounded-2xl border-2 border-dashed border-gray-200 py-14 text-center">

                        <div className="text-4xl">
                            🎬
                        </div>

                        <h4 className="mt-3 font-semibold text-gray-900">
                            No videos yet
                        </h4>

                        <p className="mt-1 text-sm text-gray-500">
                            Add a property video to give
                            visitors a better view.
                        </p>

                    </div>

                )}

            </div>

        </section>
    );
}
