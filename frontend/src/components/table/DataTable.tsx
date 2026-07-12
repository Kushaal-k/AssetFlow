import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import { useMemo, useState, type ReactNode } from 'react'
import { EmptyState } from '@/components/loader/EmptyState'
import { TableSkeleton } from '@/components/loader/Skeleton'
import { SearchBar } from '@/components/common/SearchBar'
import { Pagination } from '@/components/table/Pagination'

export interface Column<T> {
  key: string
  header: string
  sortable?: boolean
  render?: (row: T) => ReactNode
}

export interface DataTableProps<T extends object> {
  columns: Column<T>[]
  data: T[]
  isLoading?: boolean
  isError?: boolean
  searchKey?: keyof T & string
  pageSize?: number
  emptyTitle?: string
  emptyDescription?: string
  onRowClick?: (row: T) => void
}

type SortDirection = 'asc' | 'desc'

function getFieldValue<T extends object>(row: T, key: string): unknown {
  return (row as Record<string, unknown>)[key]
}

export function DataTable<T extends object>({
  columns,
  data,
  isLoading = false,
  isError = false,
  searchKey,
  pageSize = 10,
  emptyTitle = 'No data found',
  emptyDescription = 'There are no records to display.',
  onRowClick,
}: DataTableProps<T>) {
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [page, setPage] = useState(1)

  const filteredData = useMemo(() => {
    if (!searchKey || !search.trim()) return data

    const query = search.toLowerCase()
    return data.filter((row) => {
      const value = getFieldValue(row, searchKey)
      return String(value ?? '').toLowerCase().includes(query)
    })
  }, [data, search, searchKey])

  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData

    return [...filteredData].sort((a, b) => {
      const aVal = String(getFieldValue(a, sortKey) ?? '')
      const bVal = String(getFieldValue(b, sortKey) ?? '')
      const comparison = aVal.localeCompare(bVal, undefined, { numeric: true })
      return sortDirection === 'asc' ? comparison : -comparison
    })
  }, [filteredData, sortKey, sortDirection])

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize
    return sortedData.slice(start, start + pageSize)
  }, [sortedData, page, pageSize])

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDirection('asc')
    }
    setPage(1)
  }

  const getSortIcon = (key: string) => {
    if (sortKey !== key) return <ArrowUpDown className="size-3.5 text-muted-foreground" />
    return sortDirection === 'asc' ? (
      <ArrowUp className="size-3.5" />
    ) : (
      <ArrowDown className="size-3.5" />
    )
  }

  if (isLoading) {
    return <TableSkeleton rows={pageSize} cols={columns.length} />
  }

  if (isError) {
    return (
      <EmptyState
        title="Failed to load data"
        description="Something went wrong while fetching records. Please try again."
      />
    )
  }

  return (
    <div className="space-y-4">
      {searchKey && (
        <SearchBar
          value={search}
          onChange={(value) => {
            setSearch(value)
            setPage(1)
          }}
          placeholder="Search..."
        />
      )}

      {sortedData.length === 0 ? (
        <EmptyState title={emptyTitle} description={emptyDescription} />
      ) : (
        <>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-muted/50">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className="px-4 py-3 font-semibold text-foreground"
                    >
                      {column.sortable ? (
                        <button
                          type="button"
                          onClick={() => handleSort(column.key)}
                          className="inline-flex items-center gap-1 hover:text-primary"
                        >
                          {column.header}
                          {getSortIcon(column.key)}
                        </button>
                      ) : (
                        column.header
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row, index) => (
                  <tr
                    key={String(getFieldValue(row, 'id') ?? index)}
                    onClick={() => onRowClick?.(row)}
                    className={
                      onRowClick
                        ? 'cursor-pointer border-b border-border transition-colors hover:bg-muted/50'
                        : 'border-b border-border'
                    }
                  >
                    {columns.map((column) => (
                      <td key={column.key} className="px-4 py-3 text-muted-foreground">
                        {column.render
                          ? column.render(row)
                          : String(getFieldValue(row, column.key) ?? '—')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            page={page}
            total={sortedData.length}
            limit={pageSize}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  )
}
