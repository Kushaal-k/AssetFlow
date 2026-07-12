import { clsx, type ClassValue } from 'clsx'
import { forwardRef, type InputHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          'flex h-9 w-full rounded-lg border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-destructive focus-visible:ring-destructive/30',
          className,
        )}
        {...props}
      />
    )
  },
)

Input.displayName = 'Input'

export { Input }
