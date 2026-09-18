import { useState } from "react";

import { createReply } from "../Services/ReplyService";
import { useAuth } from "../Hooks/useAuth";

interface ReplyBoxProps {
  tweetId: number;
  onReplyAdded: () => void;
}

function ReplyBox({ tweetId, onReplyAdded }: ReplyBoxProps) {
  const [content, setContent] = useState("");

  const { user } = useAuth();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!user) {
      alert("Please login first.");
      return;
    }

    if (content.trim() === "") {
      alert("Reply cannot be empty.");
      return;
    }

    try {
      await createReply(tweetId,content);

      alert("Reply added successfully.");

      setContent("");

      onReplyAdded();
    } catch {
      alert("Failed to add reply.");
    }
  }

  return (
    <div>
      <h4>Reply</h4>

      <form onSubmit={handleSubmit}>
        <label htmlFor={`reply-${tweetId}`}>
          Write a reply
        </label>

        <br />

        <textarea
          id={`reply-${tweetId}`}
          name="reply"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Write a reply..."
          rows={3}
          cols={40}
        />

        <br />

        <button type="submit">Reply</button>
      </form>
    </div>
  );
}

export default ReplyBox;