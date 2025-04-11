import IconCross from "../../assets/icon-cross.svg?react";

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
  isResetVisible = true,
  error,
  setError,
}) => {
  const handleReset = () => {
    onChange("");
    if (error && setError) {
      setError("");
    }
  };

  return (
    <div>
      {label && (
        <label htmlFor={label} className="heading-m text-medium-gray">
          {label}
        </label>
      )}
      <div className="w-full flex items-center gap-4 mt-1">
        <div className="w-full relative">
          <input
            id={label}
            className={`w-full border ${
              error ? "border-red" : "border-medium-gray/25"
            } rounded-[8px] px-4 py-2 text-sm text-black placeholder:text-medium-gray focus:outline-none body-l`}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
          />
          {error && (
            <p className="absolute top-1/2 right-3 text-red body-l translate-y-[-50%]">
              {error}
            </p>
          )}
        </div>
        {isResetVisible && (
          <button
            onClick={handleReset}
            type="button"
            className="p-2 cursor-pointer"
          >
            <IconCross />
          </button>
        )}
      </div>
    </div>
  );
};
