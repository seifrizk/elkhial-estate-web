import Cookies from "js-cookie";

export function saveToken(token: string) {

    Cookies.set(
        "token",
        token,
        {
            expires: 30,
        }
    );

}

export function getToken() {

    return Cookies.get("token");

}

export function removeToken() {

    Cookies.remove("token");

}
