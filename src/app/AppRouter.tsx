// src/router.tsx
import { RegisterPage } from "../features/auth/pages/RegisterPage";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "../shared/routing/ProtectedRoute";
//import HomePage from './features/home/pages/HomePage'
//import BoardPage from './features/boards/pages/BoardPage'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/boards"
          element={
            <ProtectedRoute>
              <div>boards</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
