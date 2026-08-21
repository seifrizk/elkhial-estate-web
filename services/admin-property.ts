import api from "@/lib/axios";

/**
 * Pending properties
 */
export async function getPendingProperties() {
    return api.get("/v1/admin/properties/pending");
}

/**
 * Update property status
 */
export async function changePropertyStatus(
    id: number | string,
    status: string
) {
    return api.patch(
        `/v1/admin/properties/${id}/status`,
        {
            status,
        }
    );
}

/**
 * All admin properties
 */
export async function getAdminProperties(
    params?: Record<string, any>
) {
    return api.get("/v1/admin/properties", {
        params,
    });
}

/**
 * Admin property details
 */
export async function getAdminProperty(
    id: number | string
) {
    return api.get(
        `/v1/admin/properties/${id}`
    );
}

/**
 * Delete property
 */
export async function deleteAdminProperty(
    id: number | string
) {
    return api.delete(
        `/v1/admin/properties/${id}`
    );
}
