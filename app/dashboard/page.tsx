"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

import { getDashboard } from "@/services/dashboard";
import { getNotifications } from "@/services/notification";
import { getMyProperties } from "@/services/my-property";

interface DashboardData {
    my_properties: number;
    favorites: number;
    conversations: number;
    notifications: number;
}

interface Property {
    id: number;
    title: string;
    price: string | number;
    currency?: string;
    status?: string;
    address?: string;
}

interface Notification {
    id: number;
    title: string;
    body: string;
    read_at?: string | null;
    created_at?: string;
}

export default function DashboardPage() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [properties, setProperties] = useState<Property[]>([]);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const [
                    dashboardResponse,
                    propertiesResponse,
                    notificationsResponse,
                ] = await Promise.all([
                    getDashboard(),
                    getMyProperties(),
                    getNotifications(),
                ]);

                setData(dashboardResponse.data);

                setProperties(
                    propertiesResponse.data?.data ??
                    propertiesResponse.data ??
                    []
                );

                setNotifications(
                    notificationsResponse.data?.data ??
                    notificationsResponse.data ??
                    []
                );
            } catch (error) {
                console.error(
                    "Dashboard loading error:",
                    error
                );
            } finally {
                setLoading(false);
            }
        }

        load();
    }, []);

    return (
        <ProtectedRoute>
            <main className="min-h-screen bg-gray-50">
                <div className="mx-auto max-w-7xl px-6 py-10">

                    {/* Header */}

                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                        <div>
                            <p className="text-sm font-medium text-blue-600">
                                ElKhial Estate
                            </p>

                            <h1 className="mt-1 text-4xl font-extrabold text-gray-900">
                                Dashboard
                            </h1>

                            <p className="mt-2 text-gray-500">
                                Manage your properties, favorites and activity.
                            </p>
                        </div>

                        <Link
                            href="/properties/create"
                            className="
                                inline-flex
                                items-center
                                justify-center
                                rounded-xl
                                bg-blue-600
                                px-6
                                py-3
                                font-semibold
                                text-white
                                shadow-sm
                                transition
                                hover:bg-blue-700
                            "
                        >
                            + Add Property
                        </Link>

                    </div>

                    {loading ? (

                        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

                            {[1, 2, 3, 4].map((item) => (
                                <div
                                    key={item}
                                    className="
                                        h-32
                                        animate-pulse
                                        rounded-2xl
                                        bg-white
                                        shadow-sm
                                    "
                                />
                            ))}

                        </div>

                    ) : (

                        <>

                            {/* Statistics */}

                            <section className="mt-10">

                                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

                                    <StatCard
                                        title="My Properties"
                                        value={data?.my_properties ?? 0}
                                        icon="🏠"
                                        href="/my-properties"
                                    />

                                    <StatCard
                                        title="Favorites"
                                        value={data?.favorites ?? 0}
                                        icon="❤️"
                                        href="/favorites"
                                    />

                                    <StatCard
                                        title="Conversations"
                                        value={data?.conversations ?? 0}
                                        icon="💬"
                                        href="/messages"
                                    />

                                    <StatCard
                                        title="Notifications"
                                        value={data?.notifications ?? 0}
                                        icon="🔔"
                                        href="/dashboard"
                                    />

                                </div>

                            </section>

                            {/* Quick Actions */}

                            <section className="mt-12">

                                <div className="mb-5">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        Quick Actions
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Quickly access the most important sections.
                                    </p>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                                    <QuickAction
                                        href="/properties/create"
                                        icon="🏠"
                                        title="Add Property"
                                        description="Publish a new property"
                                    />

                                    <QuickAction
                                        href="/my-properties"
                                        icon="📋"
                                        title="My Properties"
                                        description="Manage your properties"
                                    />

                                    <QuickAction
                                        href="/favorites"
                                        icon="❤️"
                                        title="Favorites"
                                        description="View your saved properties"
                                    />

                                </div>

                            </section>

                            {/* Main Content */}

                            <div className="mt-12 grid gap-8 lg:grid-cols-2">

                                {/* My Properties */}

                                <section className="rounded-2xl border bg-white p-6 shadow-sm">

                                    <div className="flex items-center justify-between">

                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900">
                                                My Properties
                                            </h2>

                                            <p className="mt-1 text-sm text-gray-500">
                                                Your latest properties
                                            </p>
                                        </div>

                                        <Link
                                            href="/my-properties"
                                            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                                        >
                                            View all
                                        </Link>

                                    </div>

                                    <div className="mt-6 space-y-3">

                                        {properties.length === 0 ? (

                                            <div className="rounded-xl bg-gray-50 p-8 text-center">

                                                <div className="text-4xl">
                                                    🏠
                                                </div>

                                                <p className="mt-3 font-medium text-gray-700">
                                                    No properties yet
                                                </p>

                                                <Link
                                                    href="/properties/create"
                                                    className="mt-4 inline-block text-sm font-semibold text-blue-600"
                                                >
                                                    Add your first property
                                                </Link>

                                            </div>

                                        ) : (

                                            properties.slice(0, 5).map((property) => (

                                                <Link
                                                    key={property.id}
                                                    href={`/properties/${property.id}`}
                                                    className="
                                                        block
                                                        rounded-xl
                                                        border
                                                        p-4
                                                        transition
                                                        hover:border-blue-200
                                                        hover:bg-blue-50
                                                    "
                                                >

                                                    <div className="flex items-center justify-between gap-4">

                                                        <div className="min-w-0">

                                                            <h3 className="truncate font-semibold text-gray-900">
                                                                {property.title}
                                                            </h3>

                                                            <p className="mt-1 truncate text-sm text-gray-500">
                                                                {property.address ?? "Property"}
                                                            </p>

                                                        </div>

                                                        <div className="text-right">

                                                            <p className="whitespace-nowrap font-bold text-blue-600">
                                                                {property.price}{" "}
                                                                {property.currency ?? ""}
                                                            </p>

                                                            {property.status && (
                                                                <StatusBadge
                                                                    status={property.status}
                                                                />
                                                            )}

                                                        </div>

                                                    </div>

                                                </Link>

                                            ))

                                        )}

                                    </div>

                                </section>

                                {/* Notifications */}

                                <section className="rounded-2xl border bg-white p-6 shadow-sm">

                                    <div className="flex items-center justify-between">

                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900">
                                                Notifications
                                            </h2>

                                            <p className="mt-1 text-sm text-gray-500">
                                                Your latest activity
                                            </p>
                                        </div>

                                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                                            {notifications.length}
                                        </span>

                                    </div>

                                    <div className="mt-6 space-y-3">

                                        {notifications.length === 0 ? (

                                            <div className="rounded-xl bg-gray-50 p-8 text-center">

                                                <div className="text-4xl">
                                                    🔔
                                                </div>

                                                <p className="mt-3 font-medium text-gray-700">
                                                    No notifications
                                                </p>

                                                <p className="mt-1 text-sm text-gray-500">
                                                    You're all caught up.
                                                </p>

                                            </div>

                                        ) : (

                                            notifications
                                                .slice(0, 5)
                                                .map((notification) => (

                                                    <div
                                                        key={notification.id}
                                                        className={`
                                                            rounded-xl
                                                            border
                                                            p-4
                                                            ${
                                                                notification.read_at
                                                                    ? "bg-white"
                                                                    : "border-blue-100 bg-blue-50"
                                                            }
                                                        `}
                                                    >

                                                        <div className="flex gap-3">

                                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100">
                                                                🔔
                                                            </div>

                                                            <div className="min-w-0">

                                                                <h3 className="font-semibold text-gray-900">
                                                                    {notification.title}
                                                                </h3>

                                                                <p className="mt-1 text-sm text-gray-500">
                                                                    {notification.body}
                                                                </p>

                                                            </div>

                                                        </div>

                                                    </div>

                                                ))

                                        )}

                                    </div>

                                </section>

                            </div>

                        </>

                    )}

                </div>
            </main>
        </ProtectedRoute>
    );
}


/*
|--------------------------------------------------------------------------
| Stat Card
|--------------------------------------------------------------------------
*/

function StatCard({
    title,
    value,
    icon,
    href,
}: {
    title: string;
    value: number;
    icon: string;
    href: string;
}) {
    return (
        <Link
            href={href}
            className="
                group
                rounded-2xl
                border
                bg-white
                p-6
                shadow-sm
                transition
                hover:-translate-y-1
                hover:border-blue-200
                hover:shadow-lg
            "
        >

            <div className="flex items-center justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                    {icon}
                </div>

                <span className="text-gray-300 transition group-hover:text-blue-500">
                    →
                </span>

            </div>

            <p className="mt-5 text-sm font-medium text-gray-500">
                {title}
            </p>

            <p className="mt-1 text-3xl font-extrabold text-gray-900">
                {value}
            </p>

        </Link>
    );
}


/*
|--------------------------------------------------------------------------
| Quick Action
|--------------------------------------------------------------------------
*/

function QuickAction({
    href,
    icon,
    title,
    description,
}: {
    href: string;
    icon: string;
    title: string;
    description: string;
}) {
    return (
        <Link
            href={href}
            className="
                group
                rounded-2xl
                border
                bg-white
                p-5
                shadow-sm
                transition
                hover:-translate-y-1
                hover:border-blue-200
                hover:shadow-md
            "
        >

            <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-xl transition group-hover:bg-blue-50">
                    {icon}
                </div>

                <div>

                    <h3 className="font-bold text-gray-900">
                        {title}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                        {description}
                    </p>

                </div>

            </div>

        </Link>
    );
}


/*
|--------------------------------------------------------------------------
| Status Badge
|--------------------------------------------------------------------------
*/

function StatusBadge({
    status,
}: {
    status: string;
}) {
    const normalized = status.toLowerCase();

    const styles =
        normalized === "published"
            ? "bg-green-50 text-green-700"
            : normalized === "pending"
                ? "bg-yellow-50 text-yellow-700"
                : normalized === "rejected"
                    ? "bg-red-50 text-red-700"
                    : "bg-gray-100 text-gray-600";

    return (
        <span
            className={`
                mt-1
                inline-block
                rounded-full
                px-2
                py-0.5
                text-[10px]
                font-semibold
                ${styles}
            `}
        >
            {status}
        </span>
    );
}
