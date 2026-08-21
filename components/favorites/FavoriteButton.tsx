"use client";

import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

import {
    addFavorite,
    removeFavorite,
    checkFavorite,
} from "@/services/favorite";

interface FavoriteButtonProps {

    propertyId: number;

    initialSaved?: boolean;

}

export default function FavoriteButton({

    propertyId,

    initialSaved = false,

}: FavoriteButtonProps) {

    const [saved, setSaved] = useState(initialSaved);

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        async function loadFavorite() {

            try {

                const response =
                    await checkFavorite(propertyId);

                setSaved(response.is_favorite);

            } catch {

                // المستخدم غير مسجل دخول

            }

        }

        loadFavorite();

    }, [propertyId]);

    async function handleFavorite() {

        if (loading) return;

        setLoading(true);

        try {

            if (saved) {

                await removeFavorite(propertyId);

                setSaved(false);

            } else {

                await addFavorite(propertyId);

                setSaved(true);

            }

        } finally {

            setLoading(false);

        }

    }

    return (

        <button
            onClick={handleFavorite}
            className="flex items-center gap-2 border px-5 py-3 rounded-lg"
        >

            <Heart
                size={20}
                className={
                    saved
                        ? "fill-red-500 text-red-500"
                        : ""
                }
            />

            {saved ? "Saved" : "Favorite"}

        </button>

    );

}
