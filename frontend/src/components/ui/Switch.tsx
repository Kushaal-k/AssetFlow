import { clsx, type ClassValue } from 'clsx'
import { forwardRef, type InputHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, id, ...props }, ref) => {
    const inputId = id ?? props.name

    return (
      <label
        htmlFor={inputId}
        className={cn('inline-flex cursor-pointer items-center gap-2', className)}
      >
        <span className="relative inline-flex h-5 w-9 shrink-0 items-center">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            role="switch"
            className="peer sr-only"
            {...props}
          />
          <span className="h-5 w-9 rounded-full bg-input transition-colors peer-checked:bg-primary peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-disabled:cursor-not-allowed peer-disabled:opacity-50" />
          <span className="absolute left-0.5 size-4 rounded-full bg-background shadow-sm transition-transform peer-checked:translate-x-4" />
        </span>
        {label && <span className="text-sm text-foreground">{label}</span>}
      </label>
    )
  },
)

Switch.displayName = 'Switch'

export { Switch }
