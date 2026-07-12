# Routing

## Public Routes

| Route | Page |
|--------|------|
| / | Redirect |
| /login | Login |
| /signup | Signup |

---

## Protected Routes

| Route | Module |
|--------|----------|
| /dashboard | Dashboard |
| /organization | Organization |
| /departments | Departments |
| /employees | Employees |
| /assets | Assets |
| /booking | Booking |
| /maintenance | Maintenance |
| /audit | Audit |
| /reports | Reports |
| /notifications | Notifications |
| /profile | User Profile |

---

# Admin

Dashboard

Organization

Departments

Employees

Assets

Audit

Reports

Notifications

---

# Asset Manager

Dashboard

Assets

Booking

Maintenance

Notifications

---

# Department Head

Dashboard

Department Assets

Booking

Reports

Notifications

---

# Employee

Dashboard

My Assets

Booking

Maintenance

Notifications

---

# Route Protection

Unauthenticated

↓

Login

Authenticated

↓

Role Check

↓

Authorized

↓

Render

Else

↓

Unauthorized Page

---

# Future Routes

/settings

/help

/activity

/logs