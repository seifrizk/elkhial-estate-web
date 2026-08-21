"use client";

import Image from "next/image";

interface Props {
    files: File[];
    onChange: (files: File[]) => void;
}

export default function PropertyCreateImages({
    files,
    onChange,
}: Props) {
    function handleFiles(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const selected = Array.from(
            event.target.files ?? []
        );

        if (!selected.length) {
            return;
        }

        onChange([
            ...files,
            ...selected,
        ]);

        // Allow selecting the same file again
        event.target.value = "";
    }

    function removeFile(index: number) {
        onChange(
            files.filter(
                (_, fileIndex) =>
                    fileIndex !== index
            )
        );
    }

    return (
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 bg-gray-50/70 px-6 py-5">
                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                    Property Media
                </p>

                <h2 className="mt-1 text-xl font-bold text-gray-900">
                    Property Images
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Upload photos of your property.
                    The first image will be used as the cover image.
                </p>
            </div>

            <div className="p-6">
                <label
                    className="
                        flex
                        cursor-pointer
                        flex-col
                        items-center
                        justify-center
                        rounded-2xl
                        border-2
                        border-dashed
                        border-gray-300
                        bg-gray-50
                        px-6
                        py-10
                        text-center
                        transition
                        hover:border-blue-400
                        hover:bg-blue-50
                    "
                >
                    <span className="text-lg font-semibold text-gray-800">
                        Add Property Photos
                    </span>

                    <span className="mt-2 text-sm text-gray-500">
                        Select one or multiple images
                    </span>

                    <span className="mt-4 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white">
                        Choose Images
                    </span>

                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={handleFiles}
                    />
                </label>

                {files.length > 0 && (
                    <div className="mt-6">
                        <div className="mb-3 flex items-center justify-between">
                            <p className="font-semibold text-gray-900">
                                Selected Images
                            </p>

                            <p className="text-sm text-gray-500">
                                {files.length}{" "}
                                {files.length === 1
                                    ? "image"
                                    : "images"}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                            {files.map((file, index) => {
                                const previewUrl =
                                    URL.createObjectURL(
                                        file
                                    );

                                return (
                                    <div
                                        key={`${file.name}-${index}`}
                                        className="overflow-hidden rounded-xl border border-gray-200 bg-white"
                                    >
                                        <div className="relative aspect-square bg-gray-100">
                                            <Image
                                                src={previewUrl}
                                                alt={file.name}
                                                fill
                                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                                className="object-cover"
                                            />

                                            {index === 0 && (
                                                <span className="absolute left-2 top-2 rounded-full bg-green-600 px-2.5 py-1 text-xs font-semibold text-white">
                                                    Cover
                                                </span>
                                            )}
                                        </div>

                                        <div className="p-2">
                                            <p className="truncate text-xs text-gray-500">
                                                {file.name}
                                            </p>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeFile(
                                                        index
                                                    )
                                                }
                                                className="mt-2 w-full rounded-lg bg-red-50 py-2 text-xs font-semibold text-red-600 hover:bg-red-100"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
