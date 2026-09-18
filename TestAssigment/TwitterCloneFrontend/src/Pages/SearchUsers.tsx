import { useState } from "react";
import { Link } from "react-router-dom";
import { searchUsers } from "../Services/UserService";
import type { User } from "../types/User";

function SearchUsers() {
  const [name, setName] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  async function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (name.trim() === "") {
      alert("Please enter a name.");
      return;
    }

    try {
      const data = await searchUsers(name);

      setUsers(data);
    } catch {
      setUsers([]);
      alert("User not found.");
    }
  }

  return (
    <div>
      <h1>Search Users</h1>

      <form onSubmit={handleSearch}>
        <label htmlFor="searchName">Name</label>
        <br />

        <input
          id="searchName"
          name="searchName"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter name"
        />

        <button type="submit">Search</button>
      </form>

      <h2>Results</h2>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        users.map((user) => (
          <div key={user.id}>
            <h3>{user.name}</h3>

            <p>@{user.userId}</p>

            <Link to={`/tweets/${user.userId}`}>
              View Profile
            </Link>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default SearchUsers;