import api from "@/lib/axios";

/*
|--------------------------------------------------------------------------
| Properties
|--------------------------------------------------------------------------
*/

export async function getProperties(
    params?: Record<string, any>
) {
    const response = await api.get(
        "/v1/properties",
        {
            params,
        }
    );

    return response.data;
}

export async function getProperty(
    id: number | string
) {
    const response = await api.get(
        `/v1/properties/${id}`
    );

    return response.data;
}

export async function getMyProperties() {
    const response = await api.get(
        "/v1/my-properties"
    );

    return response.data;
}

export async function createProperty(
    data: any
) {
    const response = await api.post(
        "/v1/properties",
        data
    );

    return response.data;
}

export async function updateProperty(
    id: number | string,
    data: any
) {
    const response = await api.put(
        `/v1/properties/${id}`,
        data
    );

    return response.data;
}

export async function deleteProperty(
    id: number | string
) {
    const response = await api.delete(
        `/v1/properties/${id}`
    );

    return response.data;
}

/*
|--------------------------------------------------------------------------
| Property Images
|--------------------------------------------------------------------------
*/

export async function uploadPropertyImage(
    propertyId: number | string,
    formData: FormData
) {
    const response = await api.post(
        `/v1/properties/${propertyId}/images`,
        formData
    );

    return response.data;
}

export async function deletePropertyImage(
    imageId: number | string
) {
    const response = await api.delete(
        `/v1/property-images/${imageId}`
    );

    return response.data;
}

export async function setCoverImage(
    imageId: number | string
) {
    const response = await api.patch(
        `/v1/property-images/${imageId}/cover`
    );

    return response.data;
}

/*
|--------------------------------------------------------------------------
| Property Videos
|--------------------------------------------------------------------------
*/

export async function uploadPropertyVideo(
    propertyId: number | string,
    formData: FormData
) {
    const response = await api.post(
        `/v1/properties/${propertyId}/videos`,
        formData
    );

    return response.data;
}

export async function deletePropertyVideo(
    propertyId: number | string,
    videoId: number | string
) {
    const response = await api.delete(
        `/v1/properties/${propertyId}/videos/${videoId}`
    );

    return response.data;
}

/*
|--------------------------------------------------------------------------
| Lookup
|--------------------------------------------------------------------------
*/

export async function getPropertyTypes() {
    const response = await api.get(
        "/v1/property-types"
    );

    return response.data;
}

export async function getCities() {
    const response = await api.get(
        "/v1/cities"
    );

    return response.data;
}

export async function getAreas() {
    const response = await api.get(
        "/v1/areas"
    );

    return response.data;
}
