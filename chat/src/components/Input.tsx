import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from "react";

export const Input = forwardRef<HTMLInputElement, DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>(({
  className, ...rest
}, ref) => {
  return <input {...rest} ref={ref}
    className={`w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring focus:ring-blue-500 focus:outline-none ${className}`} />
})