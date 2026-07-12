import { clsx, type ClassValue } from 'clsx'
import { Calendar } from 'lucide-react'
import { forwardRef, type InputHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface DatePickerProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          ref={ref}
          type="date"
          className={cn(
            'flex h-9 w-full rounded-lg border border-input bg-background px-3 py-1 pr-9 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-destructive focus-visible:ring-destructive/30',
            className,
          )}
          {...props}
        />
        <Calendar className="pointer-events-none absolute top-1/2 right-2 size-4 -translate-y-1/2 text-muted-foreground" />
      </div>
    )
  },
)

DatePicker.displayName = 'DatePicker'

export { DatePicker }
