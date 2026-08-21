import api from "@/lib/axios";

import {
    LookupArea,
    LookupPropertyType,
} from "@/types/property";

interface PropertyTypesResponse {

    success: boolean;

    data: LookupPropertyType[];

}

interface AreasResponse {

    success: boolean;

    data: LookupArea[];

}

export async function getPropertyTypes() {

    const response =
        await api.get<PropertyTypesResponse>(
            "/v1/property-types"
        );

    return response.data.data;

}

export async function getAreas() {

    const response =
        await api.get<AreasResponse>(
            "/v1/areas"
        );

    return response.data.data;

}
