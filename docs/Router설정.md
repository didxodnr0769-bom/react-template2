# React Router 설정 가이드

## 개요

이 프로젝트는 `react-router-dom`을 사용하여 클라이언트 사이드 라우팅을 구현하였습니다.

## 설치

```bash
npm install react-router-dom
```

**설치된 버전:** react-router-dom v7.9.4

## 프로젝트 구조

```
src/
├── App.jsx                 # 라우터 설정
├── system/
│   └── routes.js          # 라우트 관리 파일
├── pages/
│   ├── Home.jsx           # 홈 페이지
│   ├── About.jsx          # About 페이지
│   └── NotFound.jsx       # 404 페이지
├── assets/
├── App.css
├── index.css
└── main.jsx
```

## 라우트 목록

| 경로     | 컴포넌트       | 이름     | 설명                                                      |
| -------- | -------------- | -------- | --------------------------------------------------------- |
| `/`      | `Home.jsx`     | Home     | 홈 페이지 - 카운터와 React/Vite 로고가 포함된 메인 페이지 |
| `/about` | `About.jsx`    | About    | About 페이지 - 프로젝트 정보를 표시하는 페이지            |
| `*`      | `NotFound.jsx` | NotFound | 404 페이지 - 존재하지 않는 경로에 대한 폴백 페이지        |

## 라우터 설정

### system/routes.js

중앙 집중식 라우트 관리 파일입니다. 모든 라우트를 한 곳에서 정의하고 관리합니다.

```js
import Home from "../pages/Home";
import About from "../pages/About";
import NotFound from "../pages/NotFound";

// 애플리케이션의 모든 라우트 설정
export const routes = [
  {
    path: "/",
    component: Home,
    name: "Home",
    exact: true,
    meta: {
      title: "Home",
      description: "React Template Home Page",
    },
  },
  {
    path: "/about",
    component: About,
    name: "About",
    exact: true,
    meta: {
      title: "About",
      description: "About Page",
    },
  },
];

// 404 Not Found 라우트 설정
export const notFoundRoute = {
  path: "*",
  component: NotFound,
  name: "NotFound",
  meta: {
    title: "404 - Page Not Found",
    description: "Page not found",
  },
};
```

### App.jsx

메인 라우터 설정 파일입니다. `routes.js`에서 라우트 설정을 가져와 동적으로 라우트를 생성합니다.

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes, notFoundRoute } from "./system/routes";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
          />
        ))}
        <Route
          path={notFoundRoute.path}
          element={<notFoundRoute.component />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

## 네비게이션

페이지 간 이동은 `react-router-dom`의 `Link` 컴포넌트를 사용합니다.

```jsx
import { Link } from 'react-router-dom'

// 사용 예시
<Link to="/about">Go to About</Link>
<Link to="/">Go to Home</Link>
```

### Link vs a 태그

- `<Link>`: SPA 방식으로 페이지 전환 (새로고침 없음)
- `<a>`: 전체 페이지 새로고침 발생

따라서 내부 페이지 이동 시에는 항상 `Link` 컴포넌트를 사용해야 합니다.

## 새로운 페이지 추가 방법

### 1단계: 페이지 컴포넌트 생성

`src/pages/` 디렉토리에 새 컴포넌트 파일을 생성합니다.

```jsx
// src/pages/NewPage.jsx
import { Link } from "react-router-dom";
import "../App.css";

function NewPage() {
  return (
    <div>
      <h1>New Page</h1>
      <p>This is a new page.</p>
      <nav style={{ marginTop: "2rem" }}>
        <Link to="/">Go to Home</Link>
      </nav>
    </div>
  );
}

export default NewPage;
```

### 2단계: routes.js에 라우트 추가

`src/system/routes.js` 파일의 `routes` 배열에 새 라우트를 추가합니다.

```js
import Home from "../pages/Home";
import About from "../pages/About";
import NewPage from "../pages/NewPage"; // 1. import 추가
import NotFound from "../pages/NotFound";

export const routes = [
  {
    path: "/",
    component: Home,
    name: "Home",
    exact: true,
    meta: {
      title: "Home",
      description: "React Template Home Page",
    },
  },
  {
    path: "/about",
    component: About,
    name: "About",
    exact: true,
    meta: {
      title: "About",
      description: "About Page",
    },
  },
  // 2. 새 라우트 추가
  {
    path: "/new",
    component: NewPage,
    name: "NewPage",
    exact: true,
    meta: {
      title: "New Page",
      description: "This is a new page",
    },
  },
];
```

### 3단계: 네비게이션 링크 추가 (선택사항)

다른 페이지에서 새 페이지로 이동할 수 있도록 Link를 추가합니다.

```jsx
import { Link } from "react-router-dom";

<Link to="/new">Go to New Page</Link>;
```

### 완료!

이제 `App.jsx`를 수정할 필요 없이 `routes.js`만 수정하면 자동으로 라우트가 적용됩니다.
브라우저에서 `http://localhost:5173/new`로 접속하여 새 페이지를 확인할 수 있습니다.

## routes.js 유틸리티 함수

`src/system/routes.js`는 라우트 관리를 위한 여러 유틸리티 함수를 제공합니다.

### findRouteByPath(path)

경로로 라우트 설정을 찾습니다.

```js
import { findRouteByPath } from "./system/routes";

const route = findRouteByPath("/");
console.log(route.name); // 'Home'
```

### findRouteByName(name)

라우트 이름으로 라우트 설정을 찾습니다.

```js
import { findRouteByName } from "./system/routes";

const route = findRouteByName("About");
console.log(route.path); // '/about'
```

### getPublicRoutes()

모든 공개 라우트를 반환합니다.

```js
import { getPublicRoutes } from "./system/routes";

const publicRoutes = getPublicRoutes();
// private: false 또는 없는 모든 라우트
```

### getPrivateRoutes()

인증이 필요한 모든 비공개 라우트를 반환합니다.

```js
import { getPrivateRoutes } from "./system/routes";

const privateRoutes = getPrivateRoutes();
// private: true인 모든 라우트
```

### generatePath(name, params)

라우트 이름으로 경로를 생성합니다. URL 파라미터가 있는 경우 치환합니다.

```js
import { generatePath } from "./system/routes";

const homePath = generatePath("Home");
console.log(homePath); // '/'

const aboutPath = generatePath("About");
console.log(aboutPath); // '/about'

// URL 파라미터가 있는 경우
const userPath = generatePath("UserDetail", { id: 123 });
console.log(userPath); // '/user/123'
```

### getNavigationRoutes()

네비게이션 메뉴를 위한 라우트 목록을 반환합니다. NotFound를 제외한 공개 라우트만 반환합니다.

```js
import { getNavigationRoutes } from "./system/routes";

const navRoutes = getNavigationRoutes();

// 네비게이션 메뉴 렌더링 예시
function Navigation() {
  const navItems = getNavigationRoutes();

  return (
    <nav>
      {navItems.map((item) => (
        <Link key={item.path} to={item.path}>
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
```

## 고급 기능

### URL 파라미터

routes.js에 URL 파라미터를 포함한 라우트를 추가할 수 있습니다.

```js
// src/system/routes.js
import UserDetail from "../pages/UserDetail";

export const routes = [
  // ... 다른 라우트들
  {
    path: "/user/:id",
    component: UserDetail,
    name: "UserDetail",
    exact: true,
    meta: {
      title: "User Detail",
      description: "User detail page",
    },
  },
];
```

```jsx
// src/pages/UserDetail.jsx
import { useParams, Link } from "react-router-dom";

function UserDetail() {
  const { id } = useParams();

  return (
    <div>
      <h1>User Detail</h1>
      <p>User ID: {id}</p>
      <Link to="/">Go to Home</Link>
    </div>
  );
}

export default UserDetail;
```

**사용 예시:**

```jsx
// 다른 페이지에서 사용
<Link to="/user/123">View User 123</Link>;

// 또는 generatePath 유틸리티 함수 사용
import { generatePath } from "./system/routes";
const userPath = generatePath("UserDetail", { id: 123 });
// userPath = '/user/123'
```

### 프로그래밍 방식 네비게이션

`useNavigate` 훅을 사용하여 프로그래밍 방식으로 페이지를 이동할 수 있습니다.

```jsx
import { useNavigate } from "react-router-dom";

function MyComponent() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/about");
  };

  return <button onClick={handleClick}>Go to About</button>;
}
```

**routes.js의 generatePath와 함께 사용:**

```jsx
import { useNavigate } from "react-router-dom";
import { generatePath } from "../system/routes";

function MyComponent() {
  const navigate = useNavigate();

  const goToUser = (userId) => {
    const path = generatePath("UserDetail", { id: userId });
    navigate(path);
  };

  return (
    <div>
      <button onClick={() => goToUser(123)}>View User 123</button>
      <button onClick={() => goToUser(456)}>View User 456</button>
    </div>
  );
}
```

### 중첩 라우트 (Nested Routes)

```jsx
<Route path="/dashboard" element={<Dashboard />}>
  <Route path="profile" element={<Profile />} />
  <Route path="settings" element={<Settings />} />
</Route>
```

## 주의사항

1. **404 라우트는 별도로 관리**: `notFoundRoute`는 `routes` 배열이 아닌 별도의 export로 관리됩니다. `path="*"` 라우트는 모든 경로와 매칭되므로 Routes의 가장 마지막에 위치해야 합니다.

2. **라우트 순서**: `routes` 배열의 순서가 중요합니다. 더 구체적인 경로를 먼저 정의하고, 덜 구체적인 경로를 나중에 정의해야 합니다.

   ```js
   // 좋은 예
   [
     { path: '/user/profile', ... },
     { path: '/user/:id', ... }
   ]

   // 나쁜 예 - /user/profile이 /user/:id에 매칭됨
   [
     { path: '/user/:id', ... },
     { path: '/user/profile', ... }
   ]
   ```

3. **라우트 이름의 고유성**: 각 라우트의 `name` 속성은 고유해야 합니다. `findRouteByName`과 `generatePath` 함수가 이 이름을 사용합니다.

4. **BrowserRouter vs HashRouter**:

   - `BrowserRouter`: 깨끗한 URL (예: `/about`)
   - `HashRouter`: 해시 기반 URL (예: `/#/about`)
   - 프로덕션 배포 시 서버 설정 필요 (BrowserRouter 사용 시)

5. **서버 설정**: SPA를 프로덕션에 배포할 때는 모든 경로를 index.html로 리다이렉트하도록 서버를 설정해야 합니다.

6. **라우트 메타 정보 활용**: `meta` 객체에 페이지 제목, 설명, 권한 정보 등을 저장하여 다양한 용도로 활용할 수 있습니다.
