const TOKEN_KEY = "accessToken";

export function getToken() {
  if (typeof window === "undefined") {
    return null;
  }
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  if (typeof window === "undefined") {
    return null;
  }
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken() {
  if (typeof window === "undefined") {
    return null;
  }
  localStorage.removeItem(TOKEN_KEY);
}
