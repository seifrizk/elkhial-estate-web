"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import {
    uploadPropertyImage,
    deletePropertyImage,
} from "@/services/property";

interface UploadedImage {

    id: number;

    url: string;

    alt_text?: string | null;

    is_cover: boolean;

}

interface Props {

    propertyId: number;

    images: UploadedImage[];

}

export default function PropertyImagesUploader({

    propertyId,

    images: initialImages,

}: Props) {

    const inputRef = useRef<HTMLInputElement>(null);

    const [images, setImages] =
        useState(initialImages);

    const [uploading, setUploading] =
        useState(false);

    const [progress, setProgress] =
        useState(0);

    async function handleFiles(
        files: FileList | null
    ) {

        if (!files) return;

        setUploading(true);

        const uploaded: UploadedImage[] = [];

        try {

            for (let i = 0; i < files.length; i++) {

                const file = files[i];

                const formData = new FormData();

                formData.append(
                    "image",
                    file
                );

                formData.append(
                    "is_cover",
                    images.length === 0 && i === 0
                        ? "1"
                        : "0"
                );

                const response =
                    await uploadPropertyImage(
                        propertyId,
                        formData
                    );

                uploaded.push(
                    response.data
                );

                setProgress(
                    Math.round(
                        ((i + 1) /
                            files.length) *
                            100
                    )
                );

            }

            setImages([
                ...images,
                ...uploaded,
            ]);

        } catch (e) {

            console.error(e);

        } finally {

            setUploading(false);

            setProgress(0);

        }

    }

    async function removeImage(
        id: number
    ) {

        if (
            !confirm(
                "Delete this image?"
            )
        ) {
            return;
        }

        try {

            await deletePropertyImage(id);

            setImages(
                images.filter(
                    (image) =>
                        image.id !== id
                )
            );

        } catch (e) {

            console.error(e);

        }

    }

    return (

        <div className="space-y-5">

            <div className="flex justify-between items-center">

                <h2 className="text-2xl font-bold">

                    Property Images

                </h2>

                <button
                    onClick={() =>
                        inputRef.current?.click()
                    }
                    className="
                        bg-blue-600
                        text-white
                        px-5
                        py-2
                        rounded-lg
                    "
                >
                    Upload Images
                </button>

            </div>

            <input
                ref={inputRef}
                type="file"
                multiple
                hidden
                accept="image/*"
                onChange={(e) =>
                    handleFiles(
                        e.target.files
                    )
                }
            />

            {uploading && (

                <div>

                    <div className="mb-2">

                        Uploading...

                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-3">

                        <div
                            className="
                                bg-blue-600
                                h-3
                                rounded-full
                            "
                            style={{
                                width: `${progress}%`,
                            }}
                        />

                    </div>

                </div>

            )}

            <div className="grid md:grid-cols-4 gap-4">

                {images.map((image) => (

                    <div
                        key={image.id}
                        className="
                            border
                            rounded-xl
                            overflow-hidden
                        "
                    >

                        <Image
                            src={image.url}
                            alt="Property"
                            width={300}
                            height={200}
                            className="
                                w-full
                                h-44
                                object-cover
                            "
                        />

                        <div className="p-3">

                            {image.is_cover && (

                                <span
                                    className="
                                        text-xs
                                        bg-green-600
                                        text-white
                                        px-2
                                        py-1
                                        rounded
                                    "
                                >
                                    Cover
                                </span>

                            )}

                            <button
                                onClick={() =>
                                    removeImage(
                                        image.id
                                    )
                                }
                                className="
                                    mt-3
                                    w-full
                                    bg-red-600
                                    text-white
                                    py-2
                                    rounded-lg
                                "
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}
