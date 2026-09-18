import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserByUserId } from "../Services/UserService";
import { getUserTweets } from "../Services/TweetService";
import { followUser, isFollowing } from "../Services/FollowService";
import type { User } from "../types/User";
import type { Tweet } from "../types/Tweet";
import { useAuth } from "../Hooks/useAuth";

function Profile() {
  const { userId } = useParams();
  const { user } = useAuth();

  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    async function loadUser() {
      if (!userId) {
        return;
      }

      try {
        const data = await getUserByUserId(userId);

        setProfileUser(data);
      } catch {
        alert("User not found.");
      }
    }

    loadUser();
  }, [userId]);

  useEffect(() => {
    async function loadTweets() {
      if (!userId) {
        return;
      }

      try {
        const data = await getUserTweets(userId);

        setTweets(data);
      } catch {
        alert("Failed to load tweets.");
      }
    }

    loadTweets();
  }, [userId]);

  useEffect(() => {
    async function checkFollowStatus() {
      if (!user || !userId) {
        return;
      }

      if (user.userId === userId) {
        return;
      }

      try {
        const data = await isFollowing(userId);

        setFollowing(data.isFollowing);
      } catch {
        alert("Failed to check follow status.");
      }
    }

    checkFollowStatus();
  }, [user, userId]);

  async function handleFollow() {
    if (!user || !userId) {
      alert("Please login first.");
      return;
    }

    if (user.userId === userId) {
      alert("You cannot follow yourself.");
      return;
    }

    try {
      await followUser(userId);

      setFollowing(true);

      alert("User followed successfully.");
    } catch {
      alert("Unable to follow user.");
    }
  }

  return (
    <div>
      <h1>User Profile</h1>

      {profileUser ? (
        <div>
          <h2>{profileUser.name}</h2>

          <p>@{profileUser.userId}</p>

          {user && user.userId === profileUser.userId ? (
            <p>This is your profile.</p>
          ) : (
            <button
              onClick={handleFollow}
              disabled={following}
            >
              {following ? "Following" : "Follow"}
            </button>
          )}

          <h3>Tweets</h3>

          {tweets.length === 0 ? (
            <p>No tweets yet.</p>
          ) : (
            tweets.map((tweet) => (
              <div key={tweet.id}>
                <p>{tweet.content}</p>

                <small>{tweet.createdAt}</small>

                <hr />
              </div>
            ))
          )}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

export default Profile;