interface TextInputFieldProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  hasError?: boolean;
}

export const TextInputField: React.FC<TextInputFieldProps> = ({
  id,
  value,
  onChange,
  placeholder,
  type = "text",
  hasError = false,
}) => (
  <input
    id={id}
    className={`w-full border ${
      hasError ? "border-red" : "border-medium-gray/25"
    } rounded-[8px] px-4 py-2 text-sm text-black placeholder:text-medium-gray focus:outline-none body-l`}
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
  />
);
