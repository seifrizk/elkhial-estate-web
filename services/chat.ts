import api from "@/lib/axios";

export async function getConversations() {

    const response = await api.get(
        "/v1/conversations"
    );

    return response.data;

}

export async function getConversation(
    id: number | string
) {

    const response = await api.get(
        `/conversations/${id}`
    );

    return response.data;

}

export async function sendMessage(
    conversationId: number | string,
    message: string
) {

    const response = await api.post(
        `/conversations/${conversationId}/messages`,
        {
            message,
        }
    );

    return response.data;

}

export async function markConversationRead(
    conversationId: number | string
) {

    const response = await api.patch(
        `/conversations/${conversationId}/read`
    );

    return response.data;

}
