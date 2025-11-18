import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes, notFoundRoute } from "@/shared/route/routes";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import "@/App.css";
import { AuthProvider } from "./features/user/presentation/contexts/AuthProvider";

function App() {
  const basename = import.meta.env.VITE_BASE_PATH || "/";

  return (
    <AuthProvider>
      <BrowserRouter basename={basename}>
        <Header />
        <div style={{ display: "flex" }}>
          <Sidebar />
          <main style={{ flex: 1, padding: "0" }}>
            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <ProtectedRoute
                      allowedRoles={route.allowedRoles}
                      requireAuth={route.requireAuth}
                      guestOnly={route.guestOnly}
                    >
                      <route.component />
                    </ProtectedRoute>
                  }
                />
              ))}
              <Route
                path={notFoundRoute.path}
                element={<notFoundRoute.component />}
              />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
