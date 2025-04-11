import { useState } from "react";
import { useRegister } from "../hooks/useRegister";
import { Button } from "../../../shared/components/button/Button";
import { Spinner } from "../../../shared/components/spinner/Spinner";
import { TextInput } from "../../../shared/components/textInput/TextInput";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const register = useRegister();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register.mutate({ email, password, passwordConfirm });
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
      <TextInput
        value={passwordConfirm}
        onChange={setPasswordConfirm}
        label="Password Confirm"
        type="password"
      />
      <Button
        className="mt-4"
        type="submit"
        size="l"
        disabled={register.isPending}
      >
        {register.isPending ? (
          <Spinner size="md" className="text-white" />
        ) : (
          "Log In"
        )}
      </Button>
    </form>
  );
};
