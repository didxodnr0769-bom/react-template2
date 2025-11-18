# Role-Based Access Control (RBAC) 가이드

이 프로젝트는 역할 기반 접근 제어(RBAC) 시스템을 구현하고 있습니다.

## 📋 목차

- [역할 개요](#역할-개요)
- [시스템 구조](#시스템-구조)
- [사용 방법](#사용-방법)
- [새로운 페이지 추가하기](#새로운-페이지-추가하기)
- [권한 설정하기](#권한-설정하기)
- [테스트 계정](#테스트-계정)

## 역할 개요

시스템은 3가지 역할을 지원합니다:

### 1. **GUEST** (미로그인)
- 접근 가능한 페이지:
  - 홈 (`/`)
  - 소개 (`/about`)
- 로그인 페이지 (`/login`)에만 접근 가능

### 2. **USER** (일반 사용자)
- 접근 가능한 페이지:
  - 홈 (`/`)
  - 소개 (`/about`)
  - 프로필 (`/profile`)
  - 대시보드 (`/dashboard`)
- 로그인 페이지 접근 불가 (자동으로 홈으로 리다이렉트)

### 3. **ADMIN** (관리자)
- 모든 페이지 접근 가능:
  - 일반 사용자 권한 + 관리자 페이지
  - 관리자 대시보드 (`/admin`)
  - 사용자 관리 (`/admin/users`)
  - 시스템 설정 (`/admin/settings`)

## 시스템 구조

### 핵심 파일

```
src/
├── shared/
│   ├── constants/
│   │   ├── roles.js              # 역할 타입 및 권한 유틸리티
│   │   └── URL.js                # 페이지 경로 상수
│   └── route/
│       └── routes.js             # 라우트 설정 및 권한 정의
├── components/
│   ├── ProtectedRoute.jsx        # 권한 검증 컴포넌트
│   └── Sidebar.jsx               # 사이드바 메뉴 (역할별 필터링)
└── pages/
    ├── Home.jsx                  # 공개 페이지
    ├── About.jsx                 # 공개 페이지
    ├── Login.jsx                 # 로그인 페이지 (guest only)
    ├── Profile.jsx               # 사용자 페이지
    ├── Dashboard.jsx             # 사용자 페이지
    ├── Admin.jsx                 # 관리자 페이지
    ├── AdminUsers.jsx            # 관리자 페이지
    └── AdminSettings.jsx         # 관리자 페이지
```

## 사용 방법

### 로그인

개발 서버를 시작하고 다음 테스트 계정으로 로그인:

```bash
npm run dev
```

**관리자 계정:**
- ID: `admin`
- PW: `1234`

**일반 사용자 계정:**
- ID: `user`
- PW: `1234`

### 사이드바 메뉴

- 로그인 상태와 역할에 따라 **자동으로** 접근 가능한 메뉴만 표시됩니다
- 권한이 없는 페이지는 메뉴에 표시되지 않습니다
- 로그인/로그아웃 상태에 따라 버튼이 동적으로 변경됩니다

## 새로운 페이지 추가하기

### 1. 페이지 컴포넌트 생성

```jsx
// src/pages/MyNewPage.jsx
function MyNewPage() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>새로운 페이지</h1>
      <p>이 페이지는 특정 역할만 접근 가능합니다.</p>
    </div>
  );
}

export default MyNewPage;
```

### 2. URL 상수 추가

```javascript
// src/shared/constants/URL.js
export const URL = {
  // ... 기존 코드
  MY_NEW_PAGE: "/my-new-page",  // 추가
};
```

### 3. 라우트 설정 추가

```javascript
// src/shared/route/routes.js
import MyNewPage from "@/pages/MyNewPage";

export const routes = [
  // ... 기존 라우트
  {
    path: URL.MY_NEW_PAGE,
    component: MyNewPage,
    name: "MyNewPage",
    exact: true,
    requireAuth: true,                    // 인증 필요
    allowedRoles: [ROLES.USER, ROLES.ADMIN],  // 접근 가능한 역할
    showInSidebar: true,                  // 사이드바에 표시
    meta: {
      title: "새로운 페이지",
      description: "My New Page",
      icon: "🆕",                         // 선택사항: 아이콘
    },
  },
];
```

**끝!** 이제 자동으로:
- 권한 검증이 적용됩니다
- 사이드바에 메뉴가 표시됩니다 (권한이 있는 사용자에게만)
- 권한이 없는 사용자는 자동으로 리다이렉트됩니다

## 권한 설정하기

### 라우트 설정 옵션

| 옵션 | 타입 | 설명 |
|------|------|------|
| `allowedRoles` | `string[]` | 접근 가능한 역할 배열<br/>예: `[ROLES.USER, ROLES.ADMIN]` |
| `requireAuth` | `boolean` | 인증 필요 여부<br/>`true`: 로그인 필요 |
| `guestOnly` | `boolean` | 미인증 사용자만 접근 가능<br/>로그인/회원가입 페이지용 |
| `showInSidebar` | `boolean` | 사이드바에 표시할지 여부 |

### 예시: 다양한 권한 설정

#### 1. 모든 사용자 접근 가능
```javascript
{
  path: URL.PUBLIC_PAGE,
  component: PublicPage,
  allowedRoles: [ROLES.GUEST, ROLES.USER, ROLES.ADMIN],
  showInSidebar: true,
  meta: { title: "공개 페이지" },
}
```

#### 2. 로그인한 사용자만 접근 가능
```javascript
{
  path: URL.PROTECTED_PAGE,
  component: ProtectedPage,
  requireAuth: true,
  allowedRoles: [ROLES.USER, ROLES.ADMIN],
  showInSidebar: true,
  meta: { title: "보호된 페이지" },
}
```

#### 3. 관리자만 접근 가능
```javascript
{
  path: URL.ADMIN_ONLY_PAGE,
  component: AdminOnlyPage,
  requireAuth: true,
  allowedRoles: [ROLES.ADMIN],
  showInSidebar: true,
  meta: { title: "관리자 전용" },
}
```

#### 4. 미로그인 사용자만 접근 가능 (로그인 페이지)
```javascript
{
  path: URL.LOGIN,
  component: Login,
  guestOnly: true,  // 로그인한 사용자는 접근 불가
  showInSidebar: false,
  meta: { title: "로그인" },
}
```

#### 5. 사이드바에 표시하지 않는 페이지 (내부 페이지)
```javascript
{
  path: URL.ADMIN_SETTINGS,
  component: AdminSettings,
  requireAuth: true,
  allowedRoles: [ROLES.ADMIN],
  showInSidebar: false,  // 관리자 페이지 내부 링크로만 접근
  meta: { title: "시스템 설정" },
}
```

## 테스트 계정

개발 환경에서 사용할 수 있는 테스트 계정:

| 역할 | 아이디 | 비밀번호 | 접근 가능 페이지 |
|------|--------|----------|------------------|
| 관리자 | `admin` | `1234` | 모든 페이지 |
| 일반 사용자 | `user` | `1234` | 홈, 소개, 프로필, 대시보드 |
| 미로그인 | - | - | 홈, 소개 |

### 테스트 시나리오

1. **미로그인 상태에서 테스트**
   - 홈, 소개 페이지만 사이드바에 표시됨
   - 다른 페이지 접근 시 로그인 페이지로 리다이렉트

2. **일반 사용자로 로그인 (`user` / `1234`)**
   - 홈, 소개, 프로필, 대시보드 메뉴 표시
   - 관리자 메뉴는 표시되지 않음
   - `/admin` 접근 시 홈으로 리다이렉트

3. **관리자로 로그인 (`admin` / `1234`)**
   - 모든 메뉴 표시 (관리자 메뉴 포함)
   - 모든 페이지 접근 가능

## 헬퍼 함수

### roles.js

```javascript
import { ROLES, hasRole, getUserRole } from "@/shared/constants/roles";

// 사용자가 특정 역할을 가지고 있는지 확인
hasRole(userRole, [ROLES.ADMIN, ROLES.USER])  // true/false

// 사용자 객체에서 역할 추출 (미인증 시 GUEST 반환)
getUserRole(user)  // "admin" | "user" | "guest"
```

### routes.js

```javascript
import {
  getSidebarRoutes,
  getDefaultRouteForRole,
  findRouteByPath
} from "@/shared/route/routes";

// 역할에 따른 사이드바 메뉴 가져오기
const menuItems = getSidebarRoutes(userRole);

// 역할에 따른 기본 리다이렉트 경로
const defaultPath = getDefaultRouteForRole("admin");  // "/admin"
```

## 권장 사항

### 1. 역할 기반 UI 렌더링
컴포넌트 내에서도 역할에 따라 UI를 조건부로 렌더링할 수 있습니다:

```jsx
import { useAuth } from "@/features/user/presentation/hooks/useAuth";
import { getUserRole, ROLES } from "@/shared/constants/roles";

function MyComponent() {
  const { user } = useAuth();
  const userRole = getUserRole(user);

  return (
    <div>
      <h1>내 페이지</h1>
      {userRole === ROLES.ADMIN && (
        <button>관리자 전용 기능</button>
      )}
    </div>
  );
}
```

### 2. 확장성을 고려한 설계
- 새로운 역할이 필요하면 `src/shared/constants/roles.js`에 추가
- 페이지 추가 시 `routes.js`에만 설정 추가하면 자동으로 권한 검증 적용
- Mock 사용자 데이터는 `mock/data/USER_LIST.json`에서 관리

### 3. 보안 고려사항
- **클라이언트 권한 검증은 UX 개선용**입니다
- **실제 보안은 서버에서 구현**해야 합니다
- API 요청 시 서버에서도 권한을 검증하세요

## 문제 해결

### Q: 로그인 후에도 메뉴가 표시되지 않아요
A: 사용자 객체에 `role` 필드가 포함되어 있는지 확인하세요. Mock 서버는 자동으로 role을 반환합니다.

### Q: 새로운 페이지를 추가했는데 사이드바에 표시되지 않아요
A: `routes.js`에서 `showInSidebar: true`로 설정했는지, 그리고 `allowedRoles`에 현재 사용자 역할이 포함되어 있는지 확인하세요.

### Q: 권한이 있는데 페이지 접근이 안 돼요
A: `ProtectedRoute`의 `allowedRoles`, `requireAuth`, `guestOnly` 설정이 올바른지 확인하세요.

## 추가 자료

- React Router: https://reactrouter.com/
- 인증 컨텍스트: `src/features/user/presentation/contexts/AuthProvider.jsx`
- Mock 서버 설정: `mock/user.mock.js`
