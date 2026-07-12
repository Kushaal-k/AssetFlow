# 🧩 SHARED COMPONENTS — Reference Doc

> Built by **Sukanshi**. Used by **both**.
> Never duplicate these. Always import from `@/components/...`

---

## DataTable

**File**: `src/components/table/DataTable.tsx`  
**Owner**: Sukanshi  
**Used by**: Dev 1 (Assets, Employees), Sukanshi (Departments, Booking, Maintenance)

```tsx
import { DataTable } from '@/components/table/DataTable'

<DataTable
  columns={columns}        // column definitions
  data={data}              // array of rows
  isLoading={isLoading}    // shows Skeleton
  isError={isError}        // shows error state
  searchKey="name"         // which key to search by
  onRowClick={(row) => {}} // optional row click
/>
```

Supports: Search, Sorting, Pagination, Loading (Skeleton), Empty State, Error State

---

## Pagination

**File**: `src/components/table/Pagination.tsx`  
**Owner**: Sukanshi

```tsx
import { Pagination } from '@/components/table/Pagination'

<Pagination
  page={1}
  total={100}
  limit={10}
  onPageChange={(page) => {}}
/>
```

---

## StatusBadge

**File**: `src/components/badges/StatusBadge.tsx`  
**Owner**: Sukanshi  
**Used by**: Dev 1 (Assets page), Sukanshi (Booking, Maintenance)

```tsx
import { StatusBadge } from '@/components/badges/StatusBadge'

<StatusBadge status="available" />
<StatusBadge status="allocated" />
<StatusBadge status="pending" />
<StatusBadge status="in_progress" />
```

---

## StatCard

**File**: `src/components/cards/StatCard.tsx`  
**Owner**: Sukanshi  
**Used by**: Dev 1 (Dashboard)

```tsx
import { StatCard } from '@/components/cards/StatCard'

<StatCard
  title="Total Assets"
  value={248}
  icon={<Package />}
  trend="+12%"
  trendUp={true}
  color="blue"
/>
```

---

## ChartCard

**File**: `src/components/cards/ChartCard.tsx`  
**Owner**: Sukanshi  
**Used by**: Dev 1 (Dashboard), Sukanshi (Reports)

```tsx
import { ChartCard } from '@/components/cards/ChartCard'

<ChartCard title="Asset by Category">
  {/* chart content */}
</ChartCard>
```

---

## ActivityCard

**File**: `src/components/cards/ActivityCard.tsx`  
**Owner**: Sukanshi  
**Used by**: Dev 1 (Dashboard)

```tsx
import { ActivityCard } from '@/components/cards/ActivityCard'

<ActivityCard
  title="Recent Activity"
  items={activityList}
/>
```

---

## FormModal

**File**: `src/components/modal/FormModal.tsx`  
**Owner**: Sukanshi  
**Used by**: Both

```tsx
import { FormModal } from '@/components/modal/FormModal'

<FormModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Add Asset"
  onSubmit={handleSubmit}
  isLoading={isPending}
>
  {/* form fields go here */}
</FormModal>
```

---

## DeleteModal

**File**: `src/components/modal/DeleteModal.tsx`  
**Owner**: Sukanshi  
**Used by**: Both

```tsx
import { DeleteModal } from '@/components/modal/DeleteModal'

<DeleteModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onConfirm={handleDelete}
  isLoading={isPending}
  itemName="MacBook Pro #001"
/>
```

---

## ConfirmationModal

**File**: `src/components/modal/ConfirmationModal.tsx`  
**Owner**: Sukanshi  
**Used by**: Both

```tsx
import { ConfirmationModal } from '@/components/modal/ConfirmationModal'

<ConfirmationModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onConfirm={handleConfirm}
  title="Approve Booking?"
  description="This will notify the employee."
  confirmLabel="Approve"
  variant="success"
/>
```

---

## Skeleton

**File**: `src/components/loader/Skeleton.tsx`  
**Owner**: Sukanshi  
**Used by**: Both (for loading states)

```tsx
import { Skeleton } from '@/components/loader/Skeleton'
import { TableSkeleton } from '@/components/loader/Skeleton'

// For cards:
<Skeleton className="h-24 w-full" />

// For table rows:
<TableSkeleton rows={5} cols={4} />
```

---

## EmptyState

**File**: `src/components/loader/EmptyState.tsx`  
**Owner**: Sukanshi  
**Used by**: Both

```tsx
import { EmptyState } from '@/components/loader/EmptyState'

<EmptyState
  title="No assets found"
  description="Add your first asset to get started."
  action={<Button onClick={handleAdd}>Add Asset</Button>}
/>
```

---

## SearchBar

**File**: `src/components/common/SearchBar.tsx`  
**Owner**: Sukanshi  
**Used by**: Both

```tsx
import { SearchBar } from '@/components/common/SearchBar'

<SearchBar
  value={search}
  onChange={(value) => setSearch(value)}
  placeholder="Search assets..."
/>
```

---

## Filters

**File**: `src/components/common/Filters.tsx`  
**Owner**: Sukanshi  
**Used by**: Both

```tsx
import { Filters } from '@/components/common/Filters'

<Filters
  filters={[
    { label: 'Status', key: 'status', options: STATUS_OPTIONS },
    { label: 'Department', key: 'department_id', options: deptOptions },
  ]}
  values={activeFilters}
  onChange={(key, value) => setFilter(key, value)}
  onReset={() => clearFilters()}
/>
```

---

## ExportButton

**File**: `src/components/common/ExportButton.tsx`  
**Owner**: Sukanshi

```tsx
import { ExportButton } from '@/components/common/ExportButton'

<ExportButton
  data={tableData}
  filename="assets-report"
/>
```

---

## FormField

**File**: `src/components/forms/FormField.tsx`  
**Owner**: Sukanshi  
**Used by**: Both in forms

```tsx
import { FormField } from '@/components/forms/FormField'

<FormField
  label="Asset Name"
  error={errors.name?.message}
  required
>
  <Input {...register('name')} />
</FormField>
```

---

## UI Primitives (wrapped Shadcn)

All in `src/components/ui/`  
**Owner**: Sukanshi

```tsx
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { Checkbox } from '@/components/ui/Checkbox'
import { Switch } from '@/components/ui/Switch'
import { DatePicker } from '@/components/ui/DatePicker'
```

---

## 🚦 Component Status Tracker

| Component | Owner | Status |
|-----------|-------|--------|
| DataTable | Sukanshi | ⬜ not started |
| Pagination | Sukanshi | ⬜ not started |
| StatusBadge | Sukanshi | ⬜ not started |
| StatCard | Sukanshi | ⬜ not started |
| ChartCard | Sukanshi | ⬜ not started |
| ActivityCard | Sukanshi | ⬜ not started |
| FormModal | Sukanshi | ⬜ not started |
| DeleteModal | Sukanshi | ⬜ not started |
| ConfirmationModal | Sukanshi | ⬜ not started |
| Skeleton | Sukanshi | ⬜ not started |
| EmptyState | Sukanshi | ⬜ not started |
| SearchBar | Sukanshi | ⬜ not started |
| Filters | Sukanshi | ⬜ not started |
| ExportButton | Sukanshi | ⬜ not started |
| FormField | Sukanshi | ⬜ not started |
| Button / Input / Select | Sukanshi | ⬜ not started |
| Navbar | Dev 1 | ⬜ not started |
| Sidebar | Dev 1 | ⬜ not started |
| Breadcrumb | Dev 1 | ⬜ not started |

> Update ⬜ → ✅ as components get completed and merged to develop.
