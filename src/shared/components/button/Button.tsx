import { buttonVariantClasses, buttonSizeClasses } from "./buttonVariants";

interface ButtonProps {
  variant?: "primary" | "secondary" | "destructive";
  size?: "l" | "s";
  className?: string;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  iconLeft?: React.ReactNode;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "s",
  className,
  children,
  type = "button",
  iconLeft,
  disabled = false,
  onClick,
}) => {
  const baseClasses =
    "font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-full";

  const finalClassName = `${baseClasses} ${buttonVariantClasses[variant]} ${
    buttonSizeClasses[size]
  } ${className || ""}`;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={finalClassName}
    >
      {iconLeft && <span className="mr-2">{iconLeft}</span>}
      {children}
    </button>
  );
};
