import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Services/UserService";
import { useAuth } from "../Hooks/useAuth";

function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const user = await loginUser(userId, password);

      login(user);

      alert("Login successful!");

      navigate("/");
    } catch {
      alert("Invalid User ID or Password.");
    }
  }

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userId">User ID</label>
          <br />

          <input
            id="userId"
            name="userId"
            type="text"
            value={userId}
            onChange={(event) => setUserId(event.target.value)}
            autoComplete="username"
          />
        </div>

        <br />

        <div>
          <label htmlFor="password">Password</label>
          <br />

          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
          />
        </div>

        <br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;