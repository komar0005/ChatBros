import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef } from "react";

export const Button = forwardRef<HTMLButtonElement, DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>>(({
  className, children, ...rest
}, ref) => {
  return <button ref={ref}
    className={`w-full bg-blue-500 px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-white font-medium hover:bg-blue-600 active:bg-blue-700 focus:ring-blue-500 transition-colors disabled:bg-blue-100 disabled:cursor-not-allowed ${className}`} {...rest}>{children}</button>
})