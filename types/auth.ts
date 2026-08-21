export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    avatar?: string | null;

    role?: {
        id: number;
        name: string;
        slug: string;
    };
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    role_id: number;
    name: string;
    phone: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    token: string;
    user: User;
}
