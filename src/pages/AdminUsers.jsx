import { Link } from "react-router-dom";
import { URL } from "@/shared/constants/URL";

function AdminUsers() {
  // 예시 사용자 데이터
  const mockUsers = [
    { id: 1, username: "user1", role: "user", email: "user1@example.com" },
    { id: 2, username: "user2", role: "user", email: "user2@example.com" },
    { id: 3, username: "admin", role: "admin", email: "admin@example.com" },
  ];

  return (
    <div style={{ padding: "2rem" }}>
      <h1>사용자 관리</h1>

      <div style={{ marginBottom: "1rem" }}>
        <Link to={URL.ADMIN} style={{ textDecoration: "underline" }}>
          ← 관리자 페이지로 돌아가기
        </Link>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "#fff",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #ddd" }}>
                ID
              </th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #ddd" }}>
                사용자명
              </th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #ddd" }}>
                역할
              </th>
              <th style={{ padding: "0.75rem", textAlign: "left", border: "1px solid #ddd" }}>
                이메일
              </th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user) => (
              <tr key={user.id}>
                <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>
                  {user.id}
                </td>
                <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>
                  {user.username}
                </td>
                <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>
                  {user.role}
                </td>
                <td style={{ padding: "0.75rem", border: "1px solid #ddd" }}>
                  {user.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsers;
