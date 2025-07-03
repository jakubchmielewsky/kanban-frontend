import { AppRouter } from "./AppRouter";
import { useCurrentUser } from "../features/auth/hooks/useCurrentUser";
import { Toaster } from "sonner";

export default function App() {
  useCurrentUser();

  return (
    <>
      <AppRouter />
      <Toaster />
    </>
  );
}
