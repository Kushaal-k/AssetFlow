import { Download } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export interface ExportButtonProps {
  data: Record<string, unknown>[]
  filename: string
  label?: string
}

function convertToCSV(data: Record<string, unknown>[]) {
  if (data.length === 0) return ''

  const headers = Object.keys(data[0])
  const rows = data.map((row) =>
    headers
      .map((header) => {
        const value = row[header]
        const stringValue = value == null ? '' : String(value)
        return `"${stringValue.replace(/"/g, '""')}"`
      })
      .join(','),
  )

  return [headers.join(','), ...rows].join('\n')
}

export function ExportButton({
  data,
  filename,
  label = 'Export CSV',
}: ExportButtonProps) {
  const handleExport = () => {
    const csv = convertToCSV(data)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${filename}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleExport}
      disabled={data.length === 0}
    >
      <Download className="size-4" />
      {label}
    </Button>
  )
}
