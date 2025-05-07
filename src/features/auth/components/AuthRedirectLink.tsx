import { Link } from "react-router-dom";

interface AuthRedirectLinkProps {
  question: string;
  linkText: string;
  href: string;
}

export const AuthRedirectLink: React.FC<AuthRedirectLinkProps> = ({
  question,
  linkText,
  href,
}) => {
  return (
    <p className="text-sm text-center text-medium-gray mt-4">
      {question}{" "}
      <Link to={href} className="text-main-purple font-semibold">
        {linkText}
      </Link>
    </p>
  );
};
