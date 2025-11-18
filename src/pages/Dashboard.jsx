import { useAuth } from "@/features/user/presentation/hooks/useAuth";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>대시보드</h1>
      <div style={{ marginTop: "1rem" }}>
        <h2>환영합니다, {user?.username}님!</h2>
        <p>이 페이지는 로그인한 사용자만 접근할 수 있습니다.</p>
        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            backgroundColor: "#f0f0f0",
            borderRadius: "8px",
          }}
        >
          <h3>통계</h3>
          <p>여기에 사용자 대시보드 콘텐츠가 표시됩니다.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
