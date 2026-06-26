import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <h1 className="logo">Task Manager</h1>

      {/* Only show the user info and logout when somebody is logged in */}
      {user && (
        <div className="nav-right">
          <span>Hi, {user.name}</span>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
