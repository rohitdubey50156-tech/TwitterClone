import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTweet } from "../Services/TweetService";
import { useAuth } from "../Hooks/useAuth";

function AddTweet() {
  const [content, setContent] = useState("");

  const { user } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!user) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    if (content.trim() === "") {
      alert("Tweet cannot be empty.");
      return;
    }

    if (content.length > 140) {
      alert("Tweet cannot be more than 140 characters.");
      return;
    }

    try {
      await createTweet(content);

      alert("Tweet created successfully!");

      setContent("");

      navigate("/");
    } catch {
      alert("Failed to create tweet.");
    }
  }

  return (
    <div>
      <h1>Add Tweet</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="tweetContent">Tweet</label>
          <br />

          <textarea
            id="tweetContent"
            name="tweetContent"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            maxLength={140}
            rows={5}
            cols={40}
            placeholder="What's happening?"
          />
        </div>

        <p>Characters: {content.length} / 140</p>

        <button type="submit">Tweet</button>
      </form>
    </div>
  );
}

export default AddTweet;