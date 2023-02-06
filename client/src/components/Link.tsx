import { LinkProps, Link as RouterLink } from "react-router-dom";

function Link({ children, className, ...rest }: LinkProps) {
  return (
    <RouterLink
      {...rest}
      className={`text-blue-500 underline underline-offset-2 hover:text-blue-600 ${className}`}
    >
      {children}
    </RouterLink>
  );
}

export default Link;
