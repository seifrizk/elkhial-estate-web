import api from "@/lib/axios";

export async function uploadPropertyImage(
    propertyId: number | string,
    data: FormData
) {
    const response = await api.post(
        `/properties/${propertyId}/images`,
        data
    );

    return response.data;
}

export async function deletePropertyImage(
    imageId: number | string
) {
    return api.delete(`/property-images/${imageId}`);
}

export async function uploadPropertyVideo(
    propertyId: number | string,
    data: FormData
) {
    const response = await api.post(
        `/properties/${propertyId}/videos`,
        data
    );

    return response.data;
}

export async function deletePropertyVideo(
    propertyId: number | string,
    videoId: number | string
) {
    return api.delete(
        `/properties/${propertyId}/videos/${videoId}`
    );
}
