import api from "@/lib/axios";

export async function getNotifications() {
    const response = await api.get("/v1/notifications");

    return response.data;
}
