import api from "@/lib/axios";

export async function login(data: {
    email: string;
    password: string;
}) {
    const response = await api.post(
        "/v1/auth/login",
        data
    );

    return response.data;
}

export async function register(data: {
    name: string;
    email: string;
    phone?: string;
    password: string;
    password_confirmation: string;
    role_id?: number | string; // <-- تمت إضافة هذا السطر لحل المشكلة
}) {
    const response = await api.post(
        "/v1/auth/register",
        data
    );

    return response.data;
}

export async function getMe() {
    const response = await api.get(
        "/v1/auth/me"
    );

    return response.data;
}

/*
|--------------------------------------------------------------------------
| Backward compatibility
|--------------------------------------------------------------------------
| AuthContext uses authService.me()
| Keep it as an alias to getMe().
|--------------------------------------------------------------------------
*/

export async function me() {
    return getMe();
}

export async function logout() {
    return api.post(
        "/v1/auth/logout"
    );
}
