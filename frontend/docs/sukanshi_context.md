# 👤 SUKANSHI — AI CONTEXT (SUKANSHI'S PART)

> This file is for **Sukanshi (Dev 2)** only.
> Your AI assistant (Cursor / Copilot) should read THIS file before generating any code.
> Do NOT touch files owned by Dev 1. Do NOT modify shared files.

---

## ✅ YOUR RESPONSIBILITY

You are responsible for:

1. **All Reusable UI Components** — DataTable, StatCard, StatusBadge, Modals, Loaders, Forms, Badges
2. **Feature Pages** — Departments, Booking, Maintenance, Reports, Notifications
3. **Services** — department, booking, maintenance, report, notification, audit

---

## 🚫 DO NOT TOUCH (Dev 1's files)

```
src/app/
src/layouts/
src/routes/
src/store/
src/hooks/
src/lib/
src/config/
src/components/layout/
src/pages/auth/
src/pages/dashboard/
src/pages/assets/
src/pages/employees/
src/pages/organization/
src/services/auth.service.ts
src/services/asset.service.ts
src/services/employee.service.ts
src/services/organization.service.ts
src/main.tsx
```

---

## 📁 YOUR FILES — Complete List

```
src/
├── components/
│   ├── common/
│   │   ├── SearchBar.tsx            ← SUKANSHI
│   │   ├── Filters.tsx              ← SUKANSHI
│   │   └── ExportButton.tsx         ← SUKANSHI
│   │
│   ├── ui/
│   │   ├── Button.tsx               ← SUKANSHI (wrap Shadcn)
│   │   ├── Input.tsx                ← SUKANSHI
│   │   ├── Select.tsx               ← SUKANSHI
│   │   ├── Textarea.tsx             ← SUKANSHI
│   │   ├── Checkbox.tsx             ← SUKANSHI
│   │   ├── Switch.tsx               ← SUKANSHI
│   │   └── DatePicker.tsx           ← SUKANSHI
│   │
│   ├── table/
│   │   ├── DataTable.tsx            ← SUKANSHI (core reusable table)
│   │   └── Pagination.tsx           ← SUKANSHI
│   │
│   ├── loader/
│   │   ├── Skeleton.tsx             ← SUKANSHI
│   │   ├── Loader.tsx               ← SUKANSHI
│   │   └── EmptyState.tsx           ← SUKANSHI
│   │
│   ├── badges/
│   │   └── StatusBadge.tsx          ← SUKANSHI
│   │
│   ├── modal/
│   │   ├── FormModal.tsx            ← SUKANSHI
│   │   ├── DeleteModal.tsx          ← SUKANSHI
│   │   └── ConfirmationModal.tsx    ← SUKANSHI
│   │
│   ├── cards/
│   │   ├── StatCard.tsx             ← SUKANSHI
│   │   ├── ActivityCard.tsx         ← SUKANSHI
│   │   └── ChartCard.tsx            ← SUKANSHI
│   │
│   └── forms/
│       └── FormField.tsx            ← SUKANSHI (reusable field wrapper)
│
├── pages/
│   ├── departments/
│   │   ├── Departments.tsx          ← SUKANSHI
│   │   └── DepartmentDetail.tsx     ← SUKANSHI
│   ├── booking/
│   │   ├── Booking.tsx              ← SUKANSHI
│   │   └── MyBookings.tsx           ← SUKANSHI
│   ├── maintenance/
│   │   └── Maintenance.tsx          ← SUKANSHI
│   ├── reports/
│   │   └── Reports.tsx              ← SUKANSHI
│   ├── notifications/
│   │   └── Notifications.tsx        ← SUKANSHI
│   └── audit/
│       └── Audit.tsx                ← SUKANSHI
│
└── services/
    ├── department.service.ts        ← SUKANSHI
    ├── booking.service.ts           ← SUKANSHI
    ├── maintenance.service.ts       ← SUKANSHI
    ├── report.service.ts            ← SUKANSHI
    ├── notification.service.ts      ← SUKANSHI
    └── audit.service.ts             ← SUKANSHI
```

---

## 🧩 HOW TO USE DEV 1'S SHARED STUFF

> Dev 1 creates the foundation. You build ON TOP of it.
> Read `docs/shared_components.md` for the full list.

### Layouts — Dev 1 provides these, you just use them

All your pages AUTOMATICALLY get Navbar + Sidebar + Breadcrumb because they are wrapped in `MainLayout` by the router. You don't need to add them to your pages.

### Hooks you can use from Dev 1

```ts
import { useAuth } from '@/hooks/useAuth'
// gives: user, isAuthenticated, role

import { useRole } from '@/hooks/useRole'
// gives: isAdmin(), isAssetManager(), etc.

import { useTheme } from '@/hooks/useTheme'
// gives: theme, toggleTheme
```

### Types (shared)

```ts
import type { Department, Booking, MaintenanceRequest, Notification } from '@/types'
```

### Constants (shared)

```ts
import { BOOKING_STATUS, MAINTENANCE_STATUS, AUDIT_STATUS } from '@/constants'
```

---

## 🛠️ TECH STACK RULES

- React 19 + Vite + TypeScript
- Tailwind CSS only — no inline styles
- Shadcn UI for form elements
- React Query for all data fetching in pages
- Lucide React for icons only
- React Hook Form + Zod for all forms

---

## 📋 BUILD ORDER (Do in this exact order)

```
PHASE 1 — Component Library (build these FIRST, Dev 1 needs them)

1.  src/components/ui/Button.tsx
2.  src/components/ui/Input.tsx
3.  src/components/ui/Select.tsx
4.  src/components/ui/Textarea.tsx
5.  src/components/ui/Checkbox.tsx
6.  src/components/ui/Switch.tsx
7.  src/components/ui/DatePicker.tsx
8.  src/components/loader/Skeleton.tsx
9.  src/components/loader/Loader.tsx
10. src/components/loader/EmptyState.tsx
11. src/components/badges/StatusBadge.tsx
12. src/components/table/Pagination.tsx
13. src/components/table/DataTable.tsx
14. src/components/modal/FormModal.tsx
15. src/components/modal/DeleteModal.tsx
16. src/components/modal/ConfirmationModal.tsx
17. src/components/common/SearchBar.tsx
18. src/components/common/Filters.tsx
19. src/components/common/ExportButton.tsx
20. src/components/cards/StatCard.tsx
21. src/components/cards/ActivityCard.tsx
22. src/components/cards/ChartCard.tsx
23. src/components/forms/FormField.tsx

── NOTIFY Dev 1 that components are ready ──

PHASE 2 — Feature Pages (after Dev 1 has merged foundation to develop)

24. src/services/department.service.ts
25. src/pages/departments/Departments.tsx
26. src/pages/departments/DepartmentDetail.tsx
27. src/services/booking.service.ts
28. src/pages/booking/Booking.tsx
29. src/pages/booking/MyBookings.tsx
30. src/services/maintenance.service.ts
31. src/pages/maintenance/Maintenance.tsx
32. src/services/audit.service.ts
33. src/pages/audit/Audit.tsx
34. src/services/report.service.ts
35. src/pages/reports/Reports.tsx
36. src/services/notification.service.ts
37. src/pages/notifications/Notifications.tsx
```

---

## 📐 PAGE STRUCTURE — Every page must follow this

```tsx
// Example: Departments.tsx
const Departments = () => {
  // 1. Fetch data with React Query (useQuery)
  // 2. Render:
  return (
    <div>
      {/* Page Header with title + action button */}
      {/* SearchBar + Filters */}
      {/* DataTable (with loading/error/empty states) */}
      {/* Pagination */}
      {/* FormModal for Add/Edit */}
      {/* DeleteModal for delete */}
    </div>
  )
}
```

---

## 📊 STATUS BADGE COLORS

Your `StatusBadge` component must support:

| Status | Color |
|--------|-------|
| available | green |
| allocated | blue |
| reserved | amber |
| maintenance | orange |
| lost | red |
| retired | gray |
| pending | amber |
| approved | green |
| rejected | red |
| completed | blue |
| open | blue |
| in_progress | amber |
| resolved | green |
| closed | gray |

---

## 🔀 GIT WORKFLOW FOR SUKANSHI

```bash
# FIRST: pull develop after Dev 1 merges foundation
git checkout develop
git pull origin develop

# For Phase 1 — components
git checkout -b feature/sukanshi-components

# Work only in your files (components/ folder)

git add src/components/
git commit -m "feat: add DataTable reusable component"
git push origin feature/sukanshi-components

# Open PR → target: develop
# After merge, tell Dev 1 components are ready

# For Phase 2 — pages
git checkout develop
git pull origin develop
git checkout -b feature/sukanshi-departments
# build departments page
git checkout -b feature/sukanshi-booking
# build booking page... etc
```

---

## ⚠️ RULES

- All components must be reusable — no page-specific logic inside them
- Never call Supabase directly inside components — use services
- Always handle: Loading → Error → Empty → Data states
- Use Skeleton loader (not spinner) for loading
- Never add a route to AppRoutes.tsx — tell Dev 1 to add it
- Never modify authStore, sidebarStore, themeStore
- Use props + callbacks for all modals (controlled from the page)

---

## 🔌 HOW TO ADD A ROUTE (Tell Dev 1)

You don't add routes yourself. After you finish a page, tell Dev 1:

```
"I finished Departments.tsx at src/pages/departments/Departments.tsx
Please add route /departments in AppRoutes.tsx"
```

Dev 1 adds it in one line.

---

## 📚 OTHER DOCS TO READ

- `docs/frontend_architecture.md` — folder structure rules
- `docs/routes.md` — all routes (for context)
- `docs/schema.md` — database schema (never invent fields)
- `docs/projectrules.md` — coding standards
- `docs/shared_components.md` — component API reference (what you're building)
