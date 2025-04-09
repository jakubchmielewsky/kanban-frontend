// src/router.tsx
import { RegisterPage } from "../features/auth/pages/RegisterPage";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import HomePage from './features/home/pages/HomePage'
//import BoardPage from './features/boards/pages/BoardPage'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
