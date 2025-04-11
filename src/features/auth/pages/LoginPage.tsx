import { LoginForm } from "../components/LoginForm";
import LogoDark from "../../../assets/logo-dark.svg?react";
//import LogoLight from "../../../assets/logo-light.svg?react";

export const LoginPage = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-light-gray text-black">
      <div className="w-full flex flex-col items-center mx-4 max-w-[540px] bg-white shadow-xl rounded-[8px] px-6 py-8">
        <LogoDark />
        <h1 className="text-xl font-bold text-center mt-6">
          Welcome to Kanban
        </h1>
        <p className="text-sm text-center text-gray-500 mb-6">
          Please log in to your account
        </p>
        <LoginForm />
      </div>
    </div>
  );
};
