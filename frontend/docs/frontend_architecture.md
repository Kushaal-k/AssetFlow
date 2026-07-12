# Frontend Architecture

## Purpose

This document defines the complete frontend architecture for AssetFlow.

Every developer must follow this structure.

Do not create new folders unless necessary.

---

# Technology Stack

Framework

- React 19
- Vite

Routing

- React Router DOM

State Management

- Zustand
- React Query

Styling

- Tailwind CSS
- Shadcn UI

Icons

- Lucide React

Authentication

- Supabase Auth

Database

- Supabase PostgreSQL

---

# High Level Architecture

```

Browser

↓

React App

↓

Layouts

↓

Pages

↓

Reusable Components

↓

React Query

↓

Services

↓

Supabase

↓

Database

```

---

# Folder Structure

```
src

│

├── app
│ ├── App.jsx
│ ├── providers.jsx
│ └── router.jsx
│
├── assets
│ ├── images
│ ├── icons
│ └── logo
│
├── components
│ ├── common
│ ├── layout
│ ├── forms
│ ├── table
│ ├── ui
│ ├── cards
│ ├── badges
│ ├── charts
│ ├── modal
│ └── loader
│
├── config
│ ├── sidebar.js
│ ├── routes.js
│ └── constants.js
│
├── constants
│
├── contexts
│
├── hooks
│ ├── useAuth.js
│ ├── useRole.js
│ ├── useSidebar.js
│ └── useTheme.js
│
├── layouts
│ ├── MainLayout.jsx
│ └── AuthLayout.jsx
│
├── pages
│ │
│ ├── auth
│ │ ├── Login.jsx
│ │ └── Signup.jsx
│ │
│ ├── dashboard
│ │
│ ├── assets
│ │
│ ├── departments
│ │
│ ├── employees
│ │
│ ├── booking
│ │
│ ├── maintenance
│ │
│ ├── audit
│ │
│ ├── reports
│ │
│ ├── notifications
│ │
│ └── organization
│
├── routes
│ ├── AppRoutes.jsx
│ ├── ProtectedRoute.jsx
│ ├── PublicRoute.jsx
│ └── RoleRoute.jsx
│
├── services
│ ├── auth.service.js
│ ├── asset.service.js
│ ├── department.service.js
│ ├── booking.service.js
│ ├── maintenance.service.js
│ ├── audit.service.js
│ └── report.service.js
│
├── store
│ ├── authStore.js
│ ├── sidebarStore.js
│ └── themeStore.js
│
├── utils
│
├── lib
│ └── supabase.js
│
└── main.jsx

```

---

# Layouts

Two layouts only.

## AuthLayout

Used for

- Login
- Signup

No sidebar.

---

## MainLayout

Contains

- Navbar
- Sidebar
- Content
- Footer

Every page after login uses MainLayout.

---

# Routing Flow

```

User

↓

Login

↓

Authenticated?

↓

No

↓

/login

↓

Yes

↓

ProtectedRoute

↓

RoleRoute

↓

Dashboard

```

---

# State Management

Use Zustand only for

- User
- Token
- Sidebar
- Theme

Never store API response in Zustand.

---

# React Query

Use for

- Assets
- Departments
- Employees
- Booking
- Maintenance
- Reports

Caching

Refetching

Loading

Error Handling

---

# Services

Every module gets one service.

Example

```
asset.service.js

department.service.js

booking.service.js
```

No fetch code inside components.

---

# Components

Everything reusable.

```
Button

Input

Card

Table

Modal

Loader

Badge

Search

Pagination

Sidebar

Navbar
```

---

# Page Structure

Every page should look like

```
Header

↓

Breadcrumb

↓

Filters

↓

Actions

↓

Data Table

↓

Pagination

```

---

# Authentication

Supabase handles

- Login
- Logout
- Signup
- Session

Frontend only consumes auth service.

---

# Error Handling

Every page must support

Loading

Error

Empty State

Success

---

# Loading

Use Skeleton Loader.

Avoid spinner unless required.

---

# Responsive

Desktop

Laptop

Tablet

Mobile

Sidebar becomes Drawer on Mobile.

---

# Icons

Lucide React only.

---

# Forms

React Hook Form

+

Zod Validation

---

# Modals

Reusable.

Never create separate modal component for every page.

---

# Tables

Reusable.

Support

- Sorting
- Pagination
- Search
- Empty State

---

# Performance

Use

React.memo

Lazy Loading

Dynamic Import

Code Splitting

Only when required.

---

# Accessibility

Semantic HTML

Keyboard Navigation

Proper Labels

ARIA

Focus Management

---

# Best Practices

Small Components

Reusable Components

Single Responsibility

No Duplicate Code

Meaningful Naming

Consistent Folder Structure

Production Ready Code