# 👤 DEV 1 — AI CONTEXT (YOUR PART)

> This file is for **Dev 1 (You)** only.
> Your AI assistant (Cursor / Copilot) should read THIS file before generating any code.
> Do NOT touch files owned by Sukanshi. Do NOT modify shared files after they are created.

---

## ✅ YOUR RESPONSIBILITY

You are responsible for:

1. **Foundation Setup** — folder structure, providers, router
2. **Auth** — Login page, Signup page, auth service, auth store
3. **Layout** — Navbar, Sidebar, Breadcrumb, Footer, MainLayout, AuthLayout
4. **Routing** — AppRoutes, ProtectedRoute, PublicRoute, RoleRoute
5. **State** — authStore, sidebarStore, themeStore
6. **Hooks** — useAuth, useRole, useSidebar, useTheme
7. **Config** — sidebar.ts (role-based nav config), routes.ts, constants.ts
8. **Core Pages** — Dashboard, Assets, Employees, Organization
9. **Services** — auth.service.ts, asset.service.ts, employee.service.ts, organization.service.ts

---

## 🚫 DO NOT TOUCH (Sukanshi's files)

```
src/components/common/
src/components/forms/
src/components/table/
src/components/cards/
src/components/badges/
src/components/modal/
src/components/loader/
src/pages/departments/
src/pages/booking/
src/pages/maintenance/
src/pages/reports/
src/pages/notifications/
src/services/department.service.ts
src/services/booking.service.ts
src/services/maintenance.service.ts
src/services/report.service.ts
src/services/notification.service.ts
src/services/audit.service.ts
```

---

## 📁 YOUR FILES — Complete List

```
src/
├── lib/
│   └── supabase.ts                  ← YOU create
│
├── types/
│   └── index.ts                     ← YOU create (shared, do not delete)
│
├── constants/
│   └── index.ts                     ← YOU create (shared, do not delete)
│
├── store/
│   ├── authStore.ts                 ← YOU
│   ├── sidebarStore.ts              ← YOU
│   └── themeStore.ts                ← YOU
│
├── hooks/
│   ├── useAuth.ts                   ← YOU
│   ├── useRole.ts                   ← YOU
│   ├── useSidebar.ts                ← YOU
│   └── useTheme.ts                  ← YOU
│
├── config/
│   ├── sidebar.ts                   ← YOU (role-based nav items)
│   ├── routes.ts                    ← YOU
│   └── constants.ts                 ← YOU
│
├── layouts/
│   ├── MainLayout.tsx               ← YOU
│   └── AuthLayout.tsx               ← YOU
│
├── routes/
│   ├── AppRoutes.tsx                ← YOU
│   ├── ProtectedRoute.tsx           ← YOU
│   ├── PublicRoute.tsx              ← YOU
│   └── RoleRoute.tsx                ← YOU
│
├── components/
│   └── layout/
│       ├── Navbar.tsx               ← YOU
│       ├── Sidebar.tsx              ← YOU
│       ├── Breadcrumb.tsx           ← YOU
│       └── Footer.tsx               ← YOU
│
├── pages/
│   ├── auth/
│   │   ├── Login.tsx                ← YOU
│   │   └── Signup.tsx               ← YOU
│   ├── dashboard/
│   │   └── Dashboard.tsx            ← YOU
│   ├── assets/
│   │   ├── Assets.tsx               ← YOU
│   │   └── AssetDetail.tsx          ← YOU
│   ├── employees/
│   │   └── Employees.tsx            ← YOU
│   └── organization/
│       └── Organization.tsx         ← YOU
│
├── services/
│   ├── auth.service.ts              ← YOU
│   ├── asset.service.ts             ← YOU
│   ├── employee.service.ts          ← YOU
│   └── organization.service.ts      ← YOU
│
├── app/
│   ├── App.tsx                      ← YOU
│   ├── providers.tsx                ← YOU
│   └── router.tsx                   ← YOU
│
└── main.tsx                         ← YOU
```

---

## 🧩 SHARED COMPONENTS — Use These (Sukanshi builds them)

> Read `docs/shared_components.md` to see all shared components and how to use them.
> Import from `@/components/...`

Key ones you will use:
- `DataTable` — for Assets, Employees tables
- `StatusBadge` — for Asset status
- `StatCard` — for Dashboard stats
- `FormModal` — for Add/Edit Asset, Employee forms
- `DeleteModal` — for delete confirmations
- `Skeleton` — for loading states
- `EmptyState` — for empty data states
- `SearchBar` — in filter bars
- `Pagination` — below tables

---

## 🛠️ TECH STACK RULES

- React 19 + Vite + TypeScript
- Tailwind CSS only — no inline styles
- Shadcn UI for form elements
- Zustand for client state (auth, sidebar, theme)
- React Query for all server data
- Lucide React for icons only
- React Hook Form + Zod for all forms

---

## 📋 BUILD ORDER (Do in this exact order)

```
1. src/lib/supabase.ts
2. src/types/index.ts
3. src/constants/index.ts
4. src/store/authStore.ts
5. src/store/sidebarStore.ts
6. src/store/themeStore.ts
7. src/hooks/useAuth.ts
8. src/hooks/useRole.ts
9. src/hooks/useSidebar.ts
10. src/hooks/useTheme.ts
11. src/config/sidebar.ts
12. src/config/routes.ts
13. src/layouts/AuthLayout.tsx
14. src/layouts/MainLayout.tsx
15. src/routes/ProtectedRoute.tsx
16. src/routes/PublicRoute.tsx
17. src/routes/RoleRoute.tsx
18. src/routes/AppRoutes.tsx
19. src/components/layout/Navbar.tsx
20. src/components/layout/Sidebar.tsx
21. src/components/layout/Breadcrumb.tsx
22. src/components/layout/Footer.tsx
23. src/services/auth.service.ts
24. src/pages/auth/Login.tsx
25. src/pages/auth/Signup.tsx
26. src/app/providers.tsx
27. src/app/App.tsx
28. src/main.tsx
── WAIT for Sukanshi to finish shared components ──
29. src/services/asset.service.ts
30. src/pages/dashboard/Dashboard.tsx
31. src/pages/assets/Assets.tsx
32. src/services/employee.service.ts
33. src/pages/employees/Employees.tsx
34. src/services/organization.service.ts
35. src/pages/organization/Organization.tsx
```

---

## 🔀 GIT WORKFLOW FOR YOU

```bash
# Setup once
git checkout -b develop
git push -u origin develop

# For every feature
git checkout develop
git pull origin develop
git checkout -b feature/dev1-foundation    # or auth, dashboard, assets

# Work only in YOUR files

# Commit
git add src/store/ src/hooks/ src/lib/    # only your directories
git commit -m "feat: add auth store and hooks"
git push origin feature/dev1-foundation

# Open PR → target: develop
# Merge only after Sukanshi reviews (or vice versa)
```

---

## 🔑 SIDEBAR CONFIG RULE

The sidebar must be driven by a config object, not hardcoded.

```ts
// src/config/sidebar.ts
// Structure: array of nav items, each with allowed roles
// Sidebar component reads this config + current user role and renders only allowed items
```

Roles: `admin` | `asset_manager` | `department_head` | `employee`

---

## ⚠️ RULES

- Never put fetch/API calls inside components
- Never store API responses in Zustand
- Always use React Query for data fetching
- Always handle: Loading → Error → Empty → Data states
- Never push directly to main or develop
- Always use Skeleton loader, not spinner

---

## 📚 OTHER DOCS TO READ

- `docs/frontend_architecture.md` — folder structure rules
- `docs/routes.md` — all routes
- `docs/schema.md` — database schema mapping
- `docs/projectrules.md` — coding standards
- `docs/shared_components.md` — Sukanshi's components (how to use them)
