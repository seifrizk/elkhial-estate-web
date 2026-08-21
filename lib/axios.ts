import axios from "axios";

console.log(
    "NEXT_PUBLIC_API_URL =",
    process.env.NEXT_PUBLIC_API_URL
);

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        Accept: "application/json",
    },
});

console.log(
    "Axios baseURL =",
    api.defaults.baseURL
);

api.interceptors.request.use((config) => {
    console.log(
        "Request:",
        `${config.baseURL}${config.url}`
    );

    if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization =
                `Bearer ${token}`;
        }
    }

    return config;
});

export default api;
