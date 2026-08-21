import api from "@/lib/axios";

export async function getFavorites() {
    const response = await api.get("/v1/favorites");
    return response.data;
}

export async function addFavorite(propertyId: number | string) {
    const response = await api.post(
        `/v1/favorites/${propertyId}`
    );

    return response.data;
}

export async function removeFavorite(propertyId: number | string) {
    const response = await api.delete(
        `/v1/favorites/${propertyId}`
    );

    return response.data;
}

export async function checkFavorite(
    propertyId: number | string
) {
    const response = await api.get(
        `/v1/favorites/${propertyId}/check`
    );

    return response.data;
}
