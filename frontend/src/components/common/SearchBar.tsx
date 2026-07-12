import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/Input'

export interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search...',
  className,
}: SearchBarProps) {
  return (
    <div className={`relative max-w-sm ${className ?? ''}`}>
      <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-9 pr-9"
        aria-label={placeholder}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          aria-label="Clear search"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  )
}
