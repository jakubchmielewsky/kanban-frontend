import { TextInput } from "../../../shared/components/textInput/TextInput";
import { Button } from "../../../shared/components/button/Button";
import { Spinner } from "../../../shared/components/Spinner";
import { useLoginForm } from "../hooks/useLoginForm";

export const LoginForm = () => {
  const { values, errors, handleChange, handleSubmit, isDisabled, isPending } =
    useLoginForm();

  let buttonContent;
  if (isPending) {
    buttonContent = <Spinner size="md" className="text-white" />;
  } else if (errors.api) {
    buttonContent = errors.api;
  } else {
    buttonContent = "Log In";
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
      <TextInput
        value={values.email}
        onChange={(value) => handleChange("email", value)}
        label="Email"
        error={errors.email}
      />
      <TextInput
        value={values.password}
        onChange={(value) => handleChange("password", value)}
        label="Password"
        type="password"
        error={errors.password}
      />
      <Button className="mt-4" type="submit" size="l" disabled={isDisabled}>
        {buttonContent}
      </Button>
    </form>
  );
};
