import type { Tweet } from "../types/Tweet";
import { ApiFetch } from "./Apifetch";

const API_URL = "http://localhost:5052";

// Get latest Tweet API
export async function getLatestTweets() {
  const response = await ApiFetch(
    `${API_URL}/api/tweets`
  );

  if (!response.ok) {
    throw new Error("Failed to get tweets");
  }

  const tweets: Tweet[] = await response.json();

  return tweets;
}

// Create Tweet API
export async function createTweet(content: string) {
  const response = await ApiFetch(
    `${API_URL}/api/tweets`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: content,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create tweet");
  }

  return await response.json();
}

// Get User Tweets API
export async function getUserTweets(userId: string) {
  const response = await ApiFetch(
    `${API_URL}/api/users/${userId}/tweets`
  );

  if (!response.ok) {
    throw new Error("User not found");
  }

  const tweets: Tweet[] = await response.json();

  return tweets;
}