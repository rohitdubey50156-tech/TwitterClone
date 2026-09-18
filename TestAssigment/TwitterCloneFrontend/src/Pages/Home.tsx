import { useEffect, useState } from "react";
import { getLatestTweets } from "../Services/TweetService";
import type { Tweet } from "../types/Tweet";
import TweetCard from "../Components/TweetCard";
import { useAuth } from "../Hooks/useAuth";

function Home() {
  const { user } = useAuth();

  const [tweets, setTweets] = useState<Tweet[]>([]);

useEffect(() => {
  async function loadTweets() {
    try {
      const data = await getLatestTweets();

      setTweets(data);
    } catch {
      alert("Failed to load tweets.");
    }
  }

  loadTweets();
}, []);

  return (
    <div>
      <h1>Home</h1>

      {user ? (
        <div>
          <h2>Welcome, {user.name}</h2>
          <p>User ID: {user.userId}</p>
        </div>
      ) : (
        <p>You are not logged in.</p>
      )}

      <h2>Latest Tweets</h2>

      {tweets.length === 0 ? (
        <p>No tweets found.</p>
      ) : (
       tweets.map((tweet) => (
  <TweetCard key={tweet.id} tweet={tweet} />
))
        
      )}
    </div>
  );
}

export default Home;