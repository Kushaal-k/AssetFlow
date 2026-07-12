import { clsx, type ClassValue } from 'clsx'
import { Loader2 } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface LoaderProps {
  className?: string
  label?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'size-4',
  md: 'size-6',
  lg: 'size-8',
}

export function Loader({ className, label = 'Loading...', size = 'md' }: LoaderProps) {
  return (
    <div
      className={cn('flex flex-col items-center justify-center gap-2', className)}
      role="status"
      aria-live="polite"
    >
      <Loader2 className={cn('animate-spin text-muted-foreground', sizeClasses[size])} />
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  )
}
