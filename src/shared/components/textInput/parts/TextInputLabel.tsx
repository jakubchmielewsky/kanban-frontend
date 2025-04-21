interface TextInputLabelProps {
  htmlFor: string;
  children: React.ReactNode;
}

export const TextInputLabel: React.FC<TextInputLabelProps> = ({
  htmlFor,
  children,
}) => (
  <label htmlFor={htmlFor} className="body-l text-medium-gray">
    {children}
  </label>
);
