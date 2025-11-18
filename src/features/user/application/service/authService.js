import { httpClient } from "@/shared/system/http/axios";
import { tokenStorage } from "../../infrastructure/storage/tokenStorage";

export const authService = {
  login: async (username, password) => {
    try {
      const response = await httpClient.post("/api/auth/login", {
        username,
        password,
      });

      const { accessToken, refreshToken, user } = response.data.data;

      // 토큰 저장
      tokenStorage.setAccessToken(accessToken);
      tokenStorage.setRefreshToken(refreshToken);

      // 사용자 정보 반환
      return user;
    } catch (error) {
      // 에러 처리 (예: 로그인 실패)
      console.error("Login failed:", error);
      throw error;
    }
  },
  logout: async () => {
    try {
      // (선택 사항) 서버에 로그아웃 요청 보내기
      const refreshToken = tokenStorage.getRefreshToken();
      if (refreshToken) {
        await httpClient.post("/auth/logout", { refreshToken });
      }
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      // 클라이언트 측 토큰 제거
      tokenStorage.clearTokens();
    }
  },

  // 앱 로드 시 사용자 정보 가져오기
  fetchUserProfile: async () => {
    try {
      // 이 요청은 httpClient를 사용하므로 자동으로 401 처리가 됨
      const response = await httpClient.get("/api/auth/me");
      return response.data.data;
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      // 토큰이 유효하지 않으면 null 반환
      return null;
    }
  },
};
