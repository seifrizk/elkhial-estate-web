"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import * as authService from "@/services/auth";

interface User {

    id: number;

    name: string;

    email: string;

    role?: {
        id: number;
        name: string;
        slug: string;
    };

}

interface AuthContextType {

    user: User | null;

    loading: boolean;

    login: (
        token: string,
        user: User
    ) => void;

    logout: () => void;

}

const AuthContext = createContext<AuthContextType | null>(
    null
);

export function AuthProvider({

    children,

}: {

    children: React.ReactNode;

}) {

    const [user, setUser] = useState<User | null>(
        null
    );

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const token = localStorage.getItem(
            "token"
        );

        if (!token) {

            setLoading(false);

            return;

        }

        authService
            .me()
            .then((response: any) => {

                setUser(response.user);

            })
            .catch(() => {

                localStorage.removeItem("token");

            })
            .finally(() => {

                setLoading(false);

            });

    }, []);

    function login(
        token: string,
        user: User
    ) {

        localStorage.setItem(
            "token",
            token
        );

        setUser(user);

    }

    function logout() {

        localStorage.removeItem(
            "token"
        );

        setUser(null);

    }

    return (

        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    const context = useContext(
        AuthContext
    );

    if (!context) {

        throw new Error(
            "useAuth must be used inside AuthProvider"
        );

    }

    return context;

}
