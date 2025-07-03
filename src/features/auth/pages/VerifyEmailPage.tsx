import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Loader2, CheckCircle2, AlertCircle, MailCheck } from "lucide-react";
import { useVerifyEmail } from "../hooks/useVerifyEmail";

export const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(7);
  const { mutate: verifyEmail } = useVerifyEmail();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setMessage("");
      return;
    }

    const verifyToken = async () => {
      verifyEmail(token, {
        onSuccess: () => {
          setStatus("success");
          setMessage("Your email has been successfully verified!");

          const timer = setInterval(() => {
            setCountdown((prev) => {
              if (prev === 1) {
                clearInterval(timer);
                navigate("/login", { replace: true });
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        },
        onError: (error) => {
          console.log(error);
          setStatus("error");
          setMessage(
            error.response?.data?.message ||
              "Email verification failed. Please try again."
          );
        },
      });
    };

    verifyToken();
  }, [searchParams, navigate, verifyEmail]);

  const handleResendEmail = () => {
    navigate("/resend-verification", { replace: true });
  };

  const handleLoginRedirect = () => {
    navigate("/login", { replace: true });
  };

  const renderIcon = () => {
    const iconClass = "mx-auto h-12 w-12 mb-4";

    switch (status) {
      case "loading":
        return <Loader2 className={`${iconClass} animate-spin`} />;
      case "success":
        return <CheckCircle2 className={`${iconClass} text-green-500`} />;
      case "error":
        return <AlertCircle className={`${iconClass} text-red-500`} />;
      default:
        return <MailCheck className={`${iconClass} text-blue-500`} />;
    }
  };

  const renderContent = () => {
    switch (status) {
      case "loading":
        return (
          <div className="text-center">
            <h2 className="text-xl font-semibold">Verifying your email</h2>
            <p className="text-muted-foreground mt-2">
              Please wait while we confirm your email address...
            </p>
          </div>
        );

      case "success":
        return (
          <div className="text-center">
            <h2 className="text-xl font-semibold">Email Verified!</h2>
            <p className="text-muted-foreground mt-2">{message}</p>
            <p className="mt-4 text-sm text-gray-500">
              Redirecting to dashboard in {countdown} seconds...
            </p>
          </div>
        );

      case "error":
        return (
          <div className="text-center">
            <h2 className="text-xl font-semibold">Verification Failed</h2>
            <p className="text-muted-foreground mt-2">{message}</p>
          </div>
        );
    }
  };

  const renderActions = () => {
    switch (status) {
      case "success":
        return (
          <Button className="w-full mt-4" onClick={handleLoginRedirect}>
            Login Now
          </Button>
        );

      case "error":
        return (
          <div className="flex flex-col gap-2 w-full mt-4">
            <Button variant="secondary" onClick={handleResendEmail}>
              Resend Verification Email
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto">{renderIcon()}</div>
          <h1 className="text-2xl font-bold">Email Verification</h1>
        </CardHeader>

        <CardContent>{renderContent()}</CardContent>

        <CardFooter className="flex justify-center">
          {renderActions()}
        </CardFooter>
      </Card>
    </div>
  );
};
