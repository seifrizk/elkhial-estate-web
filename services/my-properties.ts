import api from "@/lib/axios";

export interface MyPropertiesResponse {
    success: boolean;
    data: any[];
    meta?: {
        current_page?: number;
        last_page?: number;
        per_page?: number;
        total?: number;
    };
}

export async function getMyProperties() {
    const response =
        await api.get<MyPropertiesResponse>(
            "/v1/my-properties"
        );

    return response.data;
}
