import { AppRouter } from "./AppRouter";
import { useCurrentUser } from "../features/auth/hooks/useCurrentUser";

export default function App() {
  useCurrentUser();

  return <AppRouter />;
}
