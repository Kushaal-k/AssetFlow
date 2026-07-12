import { RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Select, type SelectOption } from '@/components/ui/Select'

export interface FilterConfig {
  label: string
  key: string
  options: SelectOption[]
}

export interface FiltersProps {
  filters: FilterConfig[]
  values: Record<string, string>
  onChange: (key: string, value: string) => void
  onReset: () => void
}

export function Filters({ filters, values, onChange, onReset }: FiltersProps) {
  const hasActiveFilters = Object.values(values).some((value) => value !== '')

  return (
    <div className="flex flex-wrap items-end gap-4">
      {filters.map((filter) => (
        <div key={filter.key} className="min-w-[160px] space-y-1.5">
          <label
            htmlFor={`filter-${filter.key}`}
            className="text-sm font-medium text-foreground"
          >
            {filter.label}
          </label>
          <Select
            id={`filter-${filter.key}`}
            options={[{ label: 'All', value: '' }, ...filter.options]}
            value={values[filter.key] ?? ''}
            onChange={(e) => onChange(filter.key, e.target.value)}
          />
        </div>
      ))}
      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={onReset} className="mb-0.5">
          <RotateCcw className="size-3.5" />
          Reset
        </Button>
      )}
    </div>
  )
}
