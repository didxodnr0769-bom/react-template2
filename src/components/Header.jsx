import { Link, useNavigate } from "react-router-dom";
import { URL } from "@/shared/constants/URL";
import "./Header.css";
import { useAuth } from "@/features/user/presentation/hooks/useAuth";

function Header() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate(URL.LOGIN);
  };

  const handleLogin = () => {
    navigate(URL.LOGIN);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to={URL.HOME}>
            <h1>React Template</h1>
          </Link>
        </div>

        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to={URL.HOME} className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to={URL.ABOUT} className="nav-link">
                About
              </Link>
            </li>
          </ul>
        </nav>

        <div className="auth-section">
          {isAuthenticated ? (
            <div className="user-info">
              <span className="user-name">{user?.name || user?.username}</span>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </div>
          ) : (
            <button onClick={handleLogin} className="login-button">
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
