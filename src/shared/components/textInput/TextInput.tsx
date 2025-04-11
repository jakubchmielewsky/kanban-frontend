import { TextInputLabel } from "./parts/TextInputLabel";
import { TextInputField } from "./parts/TextInputField";
import { TextInputError } from "./parts/TextInputError";
import { TextInputResetButton } from "./parts/TextInputResetButton";

interface TextInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  isResetVisible?: boolean;
  error?: string;
  setError?: (error: string) => void;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  isResetVisible = false,
  error,
  setError,
}) => {
  const handleReset = () => {
    onChange("");
    if (error && setError) setError("");
  };

  return (
    <div>
      {label && <TextInputLabel htmlFor={label}>{label}</TextInputLabel>}
      <div className="w-full flex items-center gap-4 mt-1">
        <div className="w-full relative">
          <TextInputField
            id={label || ""}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            type={type}
            placeholder={placeholder}
            hasError={!!error}
          />
          <TextInputError error={error} />
        </div>
        {isResetVisible && <TextInputResetButton onClick={handleReset} />}
      </div>
    </div>
  );
};
