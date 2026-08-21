"use client";

import { create } from "zustand";

import { User } from "@/types/auth";

interface AuthStore {

    user: User | null;

    token: string |null;

    setAuth: (
        user: User,
        token: string
    ) => void;

    logout: () => void;

}

export const useAuthStore = create<AuthStore>((set) => ({

    user: null,

    token: null,

    setAuth: (user, token) =>

        set({

            user,

            token,

        }),

    logout: () =>

        set({

            user: null,

            token: null,

        }),

}));
