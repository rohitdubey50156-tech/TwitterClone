import { ApiFetch } from "./Apifetch";
const API_URL = "http://localhost:5052";

export async function loginUser(
  userId: string,
  password: string
) {
  const response = await ApiFetch(
    `${API_URL}/api/users/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        password: password,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return await response.json();
}

export async function registerUser(
  userId: string,
  name: string,
  password: string
) {
  const response = await ApiFetch(
    `${API_URL}/api/users/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        name: name,
        password: password,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Registration failed");
  }

  return await response.json();
}

export async function searchUsers(name: string) {
  const response = await ApiFetch(
    `${API_URL}/api/users/search?name=${encodeURIComponent(name)}`
  );

  if (!response.ok) {
    throw new Error("User not found");
  }

  return await response.json();
}

export async function getUserByUserId(userId: string) {
  const response = await ApiFetch(
    `${API_URL}/api/users/${userId}`
  );

  if (!response.ok) {
    throw new Error("User not found");
  }

  return await response.json();
}