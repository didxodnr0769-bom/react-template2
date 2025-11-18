import { Navigate } from "react-router-dom";
import { useAuth } from "@/features/user/presentation/hooks/useAuth";
import { getUserRole, hasRole } from "@/shared/constants/roles";
import { URL } from "@/shared/constants/URL";

/**
 * ProtectedRoute 컴포넌트
 * 권한 기반 라우트 보호 컴포넌트
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - 보호할 컴포넌트
 * @param {string|string[]} props.allowedRoles - 접근 허용할 역할(들)
 * @param {boolean} props.requireAuth - 인증이 필요한지 여부 (기본값: true)
 * @param {boolean} props.guestOnly - 미인증 사용자만 접근 가능 (로그인/회원가입 페이지용)
 * @param {string} props.redirectTo - 권한 없을 때 리다이렉트할 경로
 */
function ProtectedRoute({
  children,
  allowedRoles = [],
  requireAuth,
  guestOnly = false,
  redirectTo,
}) {
  const { user, isAuthenticated, isLoading } = useAuth();
  console.log(guestOnly, requireAuth, isAuthenticated);
  // 로딩 중일 때는 아무것도 렌더링하지 않음
  if (isLoading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p>로딩 중...</p>
      </div>
    );
  }

  const userRole = getUserRole(user);

  // guestOnly: 로그인/회원가입 페이지처럼 미인증 사용자만 접근 가능한 경우
  if (guestOnly && isAuthenticated) {
    // 이미 로그인한 사용자는 홈으로 리다이렉트
    return <Navigate to={redirectTo || URL.HOME} replace />;
  }

  // requireAuth: 인증이 필요한 페이지인 경우
  if (requireAuth && !isAuthenticated) {
    // 인증되지 않은 사용자는 로그인 페이지로 리다이렉트
    return <Navigate to={redirectTo || URL.LOGIN} replace />;
  }

  // allowedRoles: 특정 역할만 접근 가능한 경우
  if (allowedRoles.length > 0 && !hasRole(userRole, allowedRoles)) {
    // 권한이 없는 사용자는 홈으로 리다이렉트
    return <Navigate to={redirectTo || URL.HOME} replace />;
  }

  // 모든 조건을 통과하면 children 렌더링
  return children;
}

export default ProtectedRoute;
