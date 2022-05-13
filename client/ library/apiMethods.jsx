import { fetchJSON, postJSON } from "./http";

export async function endSession() {
  const res = await fetch("/api/login", { method: "DELETE" });
  if (!res.ok) {
    throw new Error(`Failed to post ${res.status}: ${res.statusText}`);
  }
}

export async function fetchLogin() {
  return await fetchJSON("/api/login");
}

export async function registerLogin(provider, login) {
  return await postJSON(`/api/login/${provider}`, login);
}
