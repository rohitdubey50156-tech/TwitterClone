import { useEffect, useState } from "react";
import type { Tweet } from "../types/Tweet";
import type { Reply } from "../types/Reply";
import ReplyBox from "./ReplyBox";
import { getReplies } from "../Services/ReplyService";
import { Link } from "react-router-dom";
interface TweetCardProps {
  tweet: Tweet;
}

function TweetCard({ tweet }: TweetCardProps) {
  const [replies, setReplies] = useState<Reply[]>([]);

  useEffect(() => {
    async function loadReplies() {
      try {
        const data = await getReplies(tweet.id);

        setReplies(data);
      } catch {
        alert("Failed to load replies.");
      }
    }

    loadReplies();
  }, [tweet.id]);

  async function refreshReplies() {
    try {
      const data = await getReplies(tweet.id);

      setReplies(data);
    } catch {
      alert("Failed to load replies.");
    }
  }

  return (
    <div>
      <h3>
        <Link to={`/tweets/${tweet.userId}`}>@{tweet.userId}</Link>
      </h3>
      <p>{tweet.content}</p>

      <small>{new Date(tweet.createdAt).toLocaleString()}</small>

      <ReplyBox tweetId={tweet.id} onReplyAdded={refreshReplies} />

      <h4>Replies</h4>

      {replies.length === 0 ? (
        <p>No replies yet.</p>
      ) : (
        replies.map((reply) => (
          <div key={reply.id}>
            <p>{reply.content}</p>

            <small>{new Date(reply.createdAt).toLocaleString()}</small>
          </div>
        ))
      )}

      <hr />
    </div>
  );
}

export default TweetCard;
