const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001/api";

async function request(path, options) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed (${response.status})`);
  }

  return response.json();
}

export function getTodos() {
  return request("/todos");
}

export function createTodo(title) {
  return request("/todos", {
    method: "POST",
    body: JSON.stringify({ title }),
  });
}
