"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

import { getConversations } from "@/services/chat";

export default function MessagesPage() {

    const [loading, setLoading] =
        useState(true);

    const [conversations, setConversations] =
        useState<any[]>([]);

    useEffect(() => {

        async function load() {

            try {

                const response =
                    await getConversations();

                setConversations(
                    response.data
                );

            } finally {

                setLoading(false);

            }

        }

        load();

    }, []);

    return (

        <ProtectedRoute>

            <main className="
                mx-auto
                max-w-5xl
                p-8
            ">

                <h1 className="
                    mb-8
                    text-3xl
                    font-bold
                ">
                    Messages
                </h1>

                {loading && (

                    <p>
                        Loading...
                    </p>

                )}

                {!loading &&
                 conversations.length === 0 && (

                    <p>
                        No conversations yet.
                    </p>

                )}

                <div className="space-y-4">

                    {conversations.map(
                        (conversation) => (

                        <Link
                            key={conversation.id}
                            href={`/messages/${conversation.id}`}
                            className="
                                block
                                rounded-xl
                                border
                                p-5
                                transition
                                hover:bg-gray-50
                            "
                        >

                            <div className="
                                flex
                                items-center
                                justify-between
                            ">

                                <div>

                                    <h2 className="
                                        text-lg
                                        font-semibold
                                    ">

                                        {
                                            conversation.property
                                                ?.title
                                        }

                                    </h2>

                                    <p className="text-gray-500">

                                        {
                                            conversation.last_message
                                                ?.message ??
                                            "No messages"

                                        }

                                    </p>

                                </div>

                                <span
                                    className="
                                        text-sm
                                        text-gray-400
                                    "
                                >

                                    {
                                        conversation.last_message
                                            ?.created_at
                                    }

                                </span>

                            </div>

                        </Link>

                    ))}

                </div>

            </main>

        </ProtectedRoute>

    );

}
