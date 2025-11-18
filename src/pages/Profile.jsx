import { useAuth } from "@/features/user/presentation/hooks/useAuth";

function Profile() {
  const { user } = useAuth();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>프로필</h1>
      <div style={{ marginTop: "1rem" }}>
        <h2>사용자 정보</h2>
        <div style={{ marginTop: "1rem" }}>
          <p>
            <strong>이름:</strong> {user?.username || "N/A"}
          </p>
          <p>
            <strong>역할:</strong> {user?.role || "N/A"}
          </p>
          <p>
            <strong>이메일:</strong> {user?.email || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
