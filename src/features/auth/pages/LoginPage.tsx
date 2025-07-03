import { LoginForm } from "../components/login-form";

export const LoginPage = () => {
  return (
    <div className="h-screen flex items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
        {/* <AuthRedirectLink
          question="Don't have an account?"
          linkText="Sign Up"
          href="/register"
        /> */}
      </div>
    </div>
  );
};
