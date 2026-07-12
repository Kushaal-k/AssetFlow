# AssetFlow

Enterprise Asset & Resource Management System

---

## Project Goal

Build a scalable enterprise-grade Asset Management System.

The frontend must be modern, responsive, accessible and reusable.

The UI should follow the supplied Excalidraw wireframes.

Do not redesign the application.

---

## My Responsibility

I am responsible ONLY for frontend.

My tasks are

- React Router
- Protected Routes
- Public Routes
- Role Based Navigation
- Login
- Signup
- Sidebar
- Navbar
- Main Layout
- DataTable
- Status Badge
- Form Modal
- Loader
- Empty State

I am NOT responsible for backend APIs.

Whenever API calls are required, create placeholder services.

---

## Tech Stack

React 19

Vite

React Router DOM

Tailwind CSS

Shadcn UI

React Query

Zustand

Lucide React

Supabase

---

## Design Rules

Use the supplied Excalidraw wireframes.

Keep layouts identical.

Maintain consistent spacing.

Use responsive design.

Desktop First.

Tablet Responsive.

Mobile Drawer Sidebar.

---

## Color Palette

Primary

Blue

Secondary

Slate

Success

Green

Warning

Amber

Danger

Red

Background

White

Dark Mode Ready

---

## Typography

Inter

Font Weight

400

500

600

700

---

## UI Rules

Never use inline CSS.

Use Tailwind only.

Use Shadcn whenever possible.

No Bootstrap.

No Material UI.

No Chakra.

---

## Coding Rules

Functional Components

Arrow Functions

Hooks

Reusable Components

No Duplicate Code

Small Components

Single Responsibility Principle

---

## Routing

Public

/login

/signup

Protected

/dashboard

/assets

/organization

/departments

/booking

/maintenance

/reports

/audit

/notifications

Role Based

Admin

Asset Manager

Department Head

Employee

---

## Authentication

Signup creates Employee account only.

Never provide Role dropdown.

Role assignment happens by Admin.

---

## Sidebar

Sidebar is generated using configuration.

Do not hardcode menus.

Menus change according to role.

---

## Components

Navbar

Sidebar

Dashboard Cards

DataTable

Status Badge

Loader

Empty State

Form Modal

Confirmation Dialog

Search Bar

Pagination

Filters

---

## State

Use Zustand

Only for

Current User

JWT Token

Sidebar

Theme

Use React Query

For Server Data

---

## API

Create services only.

Example

services/

asset.service.js

department.service.js

auth.service.js

booking.service.js

maintenance.service.js

No mock backend logic.

---

## Git

Small commits.

Meaningful messages.

One feature per commit.

Never push broken code.

---

## AI Rules

Never invent schema fields.

Never invent routes.

Never change wireframe.

Never rename database columns.

Always match schema.

Always explain code.

Always generate scalable code.

Always use reusable components.