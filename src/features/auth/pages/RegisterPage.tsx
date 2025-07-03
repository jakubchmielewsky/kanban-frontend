import { RegisterForm } from "../components/RegisterForm";

export const RegisterPage = () => {
  return (
    <div className="h-screen flex items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </div>
  );
};
