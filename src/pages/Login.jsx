import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL } from "@/shared/constants/URL";
import "./Login.css";
import { useAuth } from "@/features/user/presentation/hooks/useAuth";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(formData.username, formData.password);
      // Redirect to home page after successful login
      navigate(URL.HOME);
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Login failed. Please check your credentials and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Login</h1>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your username"
              required
              autoComplete="username"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your password"
              required
              autoComplete="current-password"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={loading || !formData.username || !formData.password}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="login-info">
          <p className="info-text">Test Accounts:</p>
          <ul className="info-list">
            <li>
              <strong>Admin:</strong> username: admin / password: admin123
            </li>
            <li>
              <strong>User:</strong> username: user / password: user123
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Login;
