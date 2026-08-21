import api from "@/lib/axios";

export async function getMyProperties() {
    const response = await api.get("/v1/my-properties");

    return response.data;
}
