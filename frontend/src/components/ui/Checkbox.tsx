import { clsx, type ClassValue } from 'clsx'
import { Check } from 'lucide-react'
import { forwardRef, type InputHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const inputId = id ?? props.name

    return (
      <label
        htmlFor={inputId}
        className={cn('inline-flex cursor-pointer items-center gap-2', className)}
      >
        <span className="relative inline-flex size-4 shrink-0 items-center justify-center">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            className="peer sr-only"
            {...props}
          />
          <span className="size-4 rounded border border-input bg-background transition-colors peer-checked:border-primary peer-checked:bg-primary peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-disabled:cursor-not-allowed peer-disabled:opacity-50" />
          <Check className="pointer-events-none absolute size-3 text-primary-foreground opacity-0 peer-checked:opacity-100" />
        </span>
        {label && <span className="text-sm text-foreground">{label}</span>}
      </label>
    )
  },
)

Checkbox.displayName = 'Checkbox'

export { Checkbox }
