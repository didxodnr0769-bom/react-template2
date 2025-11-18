import { Link } from "react-router-dom";
import { URL } from "@/shared/constants/URL";

function AdminSettings() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>시스템 설정</h1>

      <div style={{ marginBottom: "1rem" }}>
        <Link to={URL.ADMIN} style={{ textDecoration: "underline" }}>
          ← 관리자 페이지로 돌아가기
        </Link>
      </div>

      <div
        style={{
          marginTop: "2rem",
          padding: "1.5rem",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
        }}
      >
        <h2>시스템 설정 항목</h2>
        <div style={{ marginTop: "1rem" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <h3>일반 설정</h3>
            <p>시스템의 기본 설정을 관리합니다.</p>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <h3>보안 설정</h3>
            <p>로그인 정책, 비밀번호 규칙 등을 설정합니다.</p>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <h3>알림 설정</h3>
            <p>시스템 알림 및 이메일 설정을 관리합니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSettings;
