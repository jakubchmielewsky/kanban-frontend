import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { TextInput } from "../../../shared/components/textInput/TextInput";

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
      <button type="submit">Log In</button>
    </form>
  );
};
