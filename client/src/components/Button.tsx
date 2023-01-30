import React, {
  DetailedHTMLProps,
  forwardRef,
  ButtonHTMLAttributes,
} from "react";

const Button = forwardRef<
  HTMLButtonElement,
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
>(({ className, children, ...rest }, ref) => {
  return (
    <button
      className={`bg-blue-600 rounded px-4 py-2 text-white font-bold hover:bg-blue-500 focus:bg-blue-400 transition-colors disabled:bg-gray-500 w-full ${className}`}
      ref={ref}
      {...rest}
    >
      {children}
    </button>
  );
});

export default Button;
