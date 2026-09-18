import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

function Navbar() {
  const { user, logout } = useAuth();

  const location = useLocation();

  return (
    <nav>
      {/* Home */}
      {location.pathname !== "/" && (
        <>
          <Link to="/">Home</Link>
          {" | "}
        </>
      )}

      {/* Search Users */}
      {location.pathname !== "/search" && (
        <>
          <Link to="/search">Search Users</Link>
          {" | "}
        </>
      )}

      {user ? (
        <>
          {/* Add Tweet */}
          {location.pathname !== "/add-tweet" && (
            <>
              <Link to="/add-tweet">Add Tweet</Link>
              {" | "}
            </>
          )}

          {/* My Profile */}
          {location.pathname !== `/tweets/${user.userId}` && (
            <>
              <Link to={`/tweets/${user.userId}`}>
                My Profile
              </Link>
              {" | "}
            </>
          )}

          {/* Logout */}
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          {/* Login */}
          {location.pathname !== "/login" && (
            <>
              <Link to="/login">Login</Link>
              {" | "}
            </>
          )}

          {/* Register */}
          {location.pathname !== "/register" && (
            <>
              <Link to="/register">Register</Link>
            </>
          )}
        </>
      )}
    </nav>
  );
}

export default Navbar;