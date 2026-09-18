import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../Services/UserService";

function Register() {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await registerUser(userId, name, password);

      alert("Registration successful!");

      navigate("/login");
    } catch {
      alert("Registration failed. User ID may already exist.");
    }
  }

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>User ID</label>
          <br />

          <input
            type="text"
            value={userId}
            onChange={(event) => setUserId(event.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Name</label>
          <br />

          <input
            id="userId"
            name="userId"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />

          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
