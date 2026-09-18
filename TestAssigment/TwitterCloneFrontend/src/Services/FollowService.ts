import type { Follow } from "../types/Follow";
import { ApiFetch } from "./Apifetch";

const API_URL = "http://localhost:5052";

// Follow user
export async function followUser(userIdToFollow: string) {
  const response = await ApiFetch(`${API_URL}/api/follows`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userIdToFollow,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to follow user");
  }

  const follow: Follow = await response.json();

  return follow;
}

// Check follow status
export async function isFollowing(userIdToCheck: string) {
  const response = await ApiFetch(
    `${API_URL}/api/follows/${userIdToCheck}`
  );

  if (!response.ok) {
    throw new Error("Failed to check follow status");
  }

  return await response.json();
}