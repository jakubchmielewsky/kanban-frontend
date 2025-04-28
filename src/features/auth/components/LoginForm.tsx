import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { TextInput } from "../../../shared/components/textInput/TextInput";
import { Button } from "../../../shared/components/button/Button";
import { Spinner } from "../../../shared/components/Spinner";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login.mutate({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
      <TextInput value={email} onChange={setEmail} label="Email" />
      <TextInput
        value={password}
        onChange={setPassword}
        label="Password"
        type="password"
      />
      <Button
        className="mt-4"
        type="submit"
        size="l"
        disabled={login.isPending}
      >
        {login.isPending ? (
          <Spinner size="md" className="text-white" />
        ) : (
          "Log In"
        )}
      </Button>
    </form>
  );
};
