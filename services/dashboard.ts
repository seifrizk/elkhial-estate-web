import api from "@/lib/axios";

export async function getDashboard() {
    const response = await api.get("/v1/dashboard");

    return response.data;
}
