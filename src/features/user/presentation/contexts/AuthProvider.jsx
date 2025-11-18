import { useEffect, useMemo, useState } from "react";
import { tokenStorage } from "@/features/user/infrastructure/storage/tokenStorage";
import { httpClient } from "@/shared/system/http/axios";
import { authService } from "../../application/service/authService";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // 앱 로딩 상태

  // 앱 시작 시 토큰 확인 및 사용자 정보 로드
  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true);
      const token = tokenStorage.getAccessToken();
      if (token) {
        try {
          const userData = await authService.fetchUserProfile();
          setUser(userData);
        } catch (e) {
          console.log(e);
          // fetchUserProfile 내부에서 401 처리(갱신)가 실패하면
          // 토큰이 지워지므로 user는 null 상태 유지
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    loadUser();
  }, []);

  const login = async (username, password) => {
    try {
      const userData = await authService.login(username, password);
      setUser(userData);
    } catch (error) {
      setUser(null);
      throw error; // 로그인 페이지에서 에러를 처리할 수 있도록 다시 던짐
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    // apiClient의 기본 헤더도 초기화 (선택적)
    delete httpClient.defaults.headers.common.Authorization;
  };

  // context value 최적화
  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
    }),
    [user, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
