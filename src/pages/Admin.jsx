import { Link } from "react-router-dom";
import { URL } from "@/shared/constants/URL";
import { useAuth } from "@/features/user/presentation/hooks/useAuth";

function Admin() {
  const { user } = useAuth();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>관리자 페이지</h1>
      <div style={{ marginTop: "1rem" }}>
        <h2>환영합니다, {user?.username} 관리자님!</h2>
        <p>이 페이지는 관리자만 접근할 수 있습니다.</p>

        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            backgroundColor: "#f0f0f0",
            borderRadius: "8px",
          }}
        >
          <h3>관리 메뉴</h3>
          <ul style={{ marginTop: "1rem", listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: "0.5rem" }}>
              <Link
                to={URL.ADMIN_USERS}
                style={{ fontSize: "1.1rem", textDecoration: "underline" }}
              >
                사용자 관리
              </Link>
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <Link
                to={URL.ADMIN_SETTINGS}
                style={{ fontSize: "1.1rem", textDecoration: "underline" }}
              >
                시스템 설정
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Admin;
