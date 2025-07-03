import { ResendVerificationForm } from "../components/ResendVerificationForm";

export const ResendVerificationPage = () => {
  return (
    <div className="h-screen flex items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ResendVerificationForm />
      </div>
    </div>
  );
};
