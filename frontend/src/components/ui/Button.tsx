import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'
import { clsx, type ClassValue } from 'clsx'
import { Loader2 } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-transparent text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        outline: 'border-border bg-background hover:bg-muted hover:text-foreground',
        ghost: 'hover:bg-muted hover:text-foreground',
        destructive: 'bg-destructive text-white hover:bg-destructive/90',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-6',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends ButtonPrimitive.Props,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
}

function Button({
  className,
  variant = 'default',
  size = 'default',
  isLoading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="animate-spin" />}
      {children}
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }
