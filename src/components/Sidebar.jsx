import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/features/user/presentation/hooks/useAuth";
import { getUserRole } from "@/shared/constants/roles";
import { getSidebarRoutes } from "@/shared/route/routes";
import { URL } from "@/shared/constants/URL";

function Sidebar() {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const userRole = getUserRole(user);
  const sidebarRoutes = getSidebarRoutes(userRole);

  return (
    <aside
      style={{
        width: "250px",
        minHeight: "calc(100vh - 60px)",
        backgroundColor: "#2c3e50",
        color: "#ecf0f1",
        padding: "1rem",
        boxSizing: "border-box",
      }}
    >
      {/* 사용자 정보 */}
      <div
        style={{
          padding: "1rem",
          backgroundColor: "#34495e",
          borderRadius: "8px",
          marginBottom: "1.5rem",
        }}
      >
        {isAuthenticated ? (
          <>
            <p style={{ margin: 0, fontSize: "0.9rem", color: "#95a5a6" }}>
              로그인 상태
            </p>
            <p
              style={{
                margin: "0.5rem 0 0 0",
                fontSize: "1.1rem",
                fontWeight: "bold",
              }}
            >
              {user?.username || "사용자"}
            </p>
            <p style={{ margin: "0.25rem 0 0 0", fontSize: "0.85rem", color: "#bdc3c7" }}>
              역할: {userRole}
            </p>
            <button
              onClick={logout}
              style={{
                marginTop: "0.75rem",
                padding: "0.5rem 1rem",
                backgroundColor: "#e74c3c",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "0.9rem",
                width: "100%",
              }}
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <p style={{ margin: 0, fontSize: "0.9rem", color: "#95a5a6" }}>
              미로그인 상태
            </p>
            <Link
              to={URL.LOGIN}
              style={{
                display: "inline-block",
                marginTop: "0.75rem",
                padding: "0.5rem 1rem",
                backgroundColor: "#3498db",
                color: "white",
                textDecoration: "none",
                borderRadius: "4px",
                fontSize: "0.9rem",
                textAlign: "center",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              로그인
            </Link>
          </>
        )}
      </div>

      {/* 메뉴 목록 */}
      <nav>
        <h3
          style={{
            fontSize: "0.85rem",
            fontWeight: "600",
            textTransform: "uppercase",
            color: "#95a5a6",
            marginBottom: "1rem",
            letterSpacing: "0.5px",
          }}
        >
          메뉴
        </h3>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {sidebarRoutes.map((route) => {
            const isActive = location.pathname === route.path;
            return (
              <li key={route.path} style={{ marginBottom: "0.5rem" }}>
                <Link
                  to={route.path}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0.75rem 1rem",
                    backgroundColor: isActive ? "#3498db" : "transparent",
                    color: isActive ? "white" : "#ecf0f1",
                    textDecoration: "none",
                    borderRadius: "6px",
                    transition: "background-color 0.2s",
                    fontSize: "0.95rem",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = "#34495e";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  {route.icon && (
                    <span style={{ marginRight: "0.75rem", fontSize: "1.2rem" }}>
                      {route.icon}
                    </span>
                  )}
                  <span>{route.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
