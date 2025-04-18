import { RegisterPage } from "../features/auth/pages/RegisterPage";
import { LoginPage } from "../features/auth/pages/LoginPage";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { ProtectedRoute } from "../shared/routing/ProtectedRoute";
import { ResponsiveLayout } from "./layout/ResponsiveLayout";
import { Board } from "../features/boards/pages/Board";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ResponsiveLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="boards" replace />} />
          <Route
            path="boards"
            element={
              <div className="bg-light-gray h-full">
                <Outlet />
              </div>
            }
          >
            <Route path=":boardId" element={<Board />}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
