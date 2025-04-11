interface TextInputErrorProps {
  error?: string;
}

export const TextInputError: React.FC<TextInputErrorProps> = ({ error }) =>
  error ? (
    <p className="absolute top-1/2 right-3 text-red body-l translate-y-[-50%]">
      {error}
    </p>
  ) : null;
