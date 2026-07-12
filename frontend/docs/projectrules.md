# PROJECT RULES

This document contains the coding standards, reusable components, role permissions, UI guidelines, API conventions and AI prompts for AssetFlow.

---

# ROLE PERMISSIONS

## Admin

Permissions

- Dashboard
- Organization
- Departments
- Employees
- Assets
- Asset Categories
- Reports
- Audit
- Notifications
- User Management

Can

- Create
- Read
- Update
- Delete
- Approve
- Reject

---

## Asset Manager

Permissions

- Dashboard
- Assets
- Asset Allocation
- Transfer Requests
- Maintenance
- Booking
- Notifications

Can

- Create Assets
- Update Assets
- Allocate Assets
- Return Assets
- View Reports

Cannot

- Manage Organization
- Manage Departments

---

## Department Head

Permissions

- Dashboard
- Department Assets
- Booking
- Reports
- Notifications

Can

- View Department Assets
- Request Allocation
- View Department Reports

Cannot

- Delete Assets
- Manage Users

---

## Employee

Permissions

- Dashboard
- My Assets
- Booking
- Maintenance
- Notifications

Can

- View Assigned Assets
- Raise Maintenance Request
- Book Resources

Cannot

- Allocate Assets
- Delete Assets
- Access Reports

---

# UI GUIDELINES

## Layout

Navbar

↓

Sidebar

↓

Breadcrumb

↓

Page Header

↓

Action Buttons

↓

Filters

↓

Table / Cards

↓

Pagination

---

## Cards

Rounded XL

Soft Shadow

Hover Effect

Padding 24px

---

## Tables

Reusable

Search

Sorting

Pagination

Filters

Loading

Empty State

---

## Forms

Always use

React Hook Form

+

Zod

---

## Buttons

Primary

Secondary

Outline

Ghost

Danger

Loading

Disabled

---

## Colors

Primary

Blue

Success

Green

Warning

Amber

Danger

Red

Background

White

Border

Gray-200

---

## Icons

Lucide React Only

---

## Typography

Heading

Bold

Subheading

Semibold

Body

Regular

Caption

Muted

---

## Responsive

Desktop

Laptop

Tablet

Mobile

Sidebar

↓

Drawer

---

# REUSABLE COMPONENTS

## Layout

Navbar

Sidebar

MainLayout

AuthLayout

Breadcrumb

PageHeader

Footer

---

## Inputs

Input

Textarea

Select

Checkbox

Radio

Switch

Date Picker

Search

---

## Feedback

Toast

Alert

Confirmation Dialog

Loader

Skeleton

Empty State

---

## Data

DataTable

Pagination

StatusBadge

Filters

SearchBar

ExportButton

---

## Modals

FormModal

DeleteModal

ConfirmationModal

---

## Dashboard

StatCard

ActivityCard

ChartCard

RecentTable

QuickActions

---

# STATUS BADGES

Asset

Available

Allocated

Reserved

Maintenance

Lost

Retired

Booking

Pending

Approved

Rejected

Completed

Maintenance

Open

In Progress

Resolved

Closed

Audit

Pending

Completed

Failed

---

# API CONTRACT

Every module gets one service.

Example

services/

auth.service.js

asset.service.js

department.service.js

booking.service.js

maintenance.service.js

audit.service.js

report.service.js

organization.service.js

notification.service.js

No fetch() inside React Components.

Pages call Services.

Services call Supabase.

---

# ERROR HANDLING

Every page must support

Loading

Success

Error

Empty

Unauthorized

Forbidden

Not Found

---

# LOADING

Prefer

Skeleton Loader

Instead of Spinner.

---

# AI CODING RULES

Always

Read

AI_CONTEXT.md

FRONTEND_ARCHITECTURE.md

ROUTES.md

SCHEMA.md

Before generating code.

Never invent database fields.

Never rename schema.

Never redesign wireframes.

Always build reusable components.

Never duplicate code.

Always separate

UI

Business Logic

Services

State

---

# GIT RULES

Never push to main.

Always

feature/sidebar

feature/auth

feature/dashboard

feature/assets

feature/components

Commit Messages

feat: add sidebar

feat: add login page

feat: create protected routes

fix: sidebar responsive issue

refactor: extract reusable table

docs: update frontend architecture

---

# FOLDER NAMING

PascalCase

Components

camelCase

Variables

UPPER_SNAKE_CASE

Constants

kebab-case

Folders

---

# PROJECT CHECKLIST

Project Setup

Tailwind

Shadcn

React Router

React Query

Zustand

Supabase

Authentication

Protected Routes

Role Routes

Sidebar

Navbar

Dashboard

Organization

Assets

Departments

Employees

Booking

Maintenance

Reports

Notifications

Responsive

Dark Mode

Deployment

---

# CURSOR / COPILOT PROMPTS

## Prompt 1

Build the project strictly following

AI_CONTEXT.md

FRONTEND_ARCHITECTURE.md

ROUTES.md

SCHEMA.md

Never invent schema fields.

Explain every generated file.

---

## Prompt 2

Generate production-ready React code.

Use React 19.

Use Vite.

Use Tailwind.

Use Shadcn UI.

Use React Query.

Use Zustand.

Use reusable components.

---

## Prompt 3

Generate one feature only.

Do not generate the whole project.

Wait for confirmation before generating the next feature.

---

## Prompt 4

Whenever creating a page

Always include

Loading

Error

Empty State

Responsive Layout

Accessibility

---

## Prompt 5

Whenever creating a form

Use

React Hook Form

Zod

Shadcn Form Components

Accessible Labels

Validation

Meaningful Error Messages

---

## Prompt 6

Whenever creating a table

Use reusable DataTable.

Support

Sorting

Pagination

Search

Empty State

Loading

---

# HACKATHON DEVELOPMENT ORDER

1. Project Setup

2. Folder Structure

3. Tailwind

4. Shadcn

5. React Router

6. Zustand

7. React Query

8. Authentication

9. Main Layout

10. Sidebar

11. Navbar

12. Dashboard

13. Organization

14. Departments

15. Employees

16. Assets

17. Booking

18. Maintenance

19. Reports

20. Notifications

21. Responsive Design

22. Testing

23. Deployment

---

# FINAL RULE

Think like a Senior Frontend Engineer.

Generate production-quality code.

Keep components reusable.

Follow the schema.

Follow the wireframes.

Never over-engineer.

Prefer simplicity, readability, and scalability.