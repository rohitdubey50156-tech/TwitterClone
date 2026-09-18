import type { Reply } from "../types/Reply";
import { ApiFetch } from "./Apifetch";

const API_URL = "http://localhost:5052";

// Get replies
export async function getReplies(tweetId: number) {
  const response = await ApiFetch(
    `${API_URL}/api/tweets/${tweetId}/replies`
  );

  if (!response.ok) {
    throw new Error("Failed to get replies");
  }

  const replies: Reply[] = await response.json();

  return replies;
}

// Create reply
export async function createReply(
  tweetId: number,
  content: string
) {
  const response = await ApiFetch(
    `${API_URL}/api/tweets/${tweetId}/replies`,
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
    throw new Error("Failed to create reply");
  }

  return await response.json();
}