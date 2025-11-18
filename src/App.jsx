import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes, notFoundRoute } from "@/shared/route/routes";
import Header from "@/components/Header";
import "@/App.css";
import { AuthProvider } from "./features/user/presentation/contexts/AuthProvider";

function App() {
  const basename = import.meta.env.VITE_BASE_PATH || "/";

  return (
    <AuthProvider>
      <BrowserRouter basename={basename}>
        <Header />
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
    </AuthProvider>
  );
}

export default App;
