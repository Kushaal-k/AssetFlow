# AssetFlow

AssetFlow is a comprehensive Enterprise Resource Planning (ERP) application focused on asset management. It is designed to track organizational assets, manage allocations and transfers, handle shared resource bookings, and streamline maintenance and audit lifecycles.

## Project Structure

The project is structured as a monorepo containing both the frontend client and the backend API:

- **Frontend**: A React application built with Vite, styled with Tailwind CSS, and utilizing Shadcn UI components.
- **Backend**: A Node.js application built with Express and TypeScript, utilizing Prisma ORM for database interactions.

## Key Features

### 1. Asset Directory and Master Data
- Centralized registration and tracking of physical and digital assets.
- Automated asset tag generation and categorization.
- Department and Employee management with role-based access control (Asset Manager, Department Head, Employee).

### 2. Allocations and Transfers
- Seamless allocation of assets to employees or departments.
- Workflow for asset transfer requests and approvals.
- Full condition logging upon return of assets.

### 3. Resource Bookings
- Shared resource management with calendar integration.
- Strict scheduling controls with native overlapping time slot validation to prevent double-booking.

### 4. Maintenance and Audits
- Maintenance request lifecycle (Pending, Approved, Resolved) to ensure assets remain in working condition.
- Audit cycle generation for physical inventory verification, identifying missing or damaged items.
- Real-time dashboard aggregating available assets, active allocations, and overdue returns.

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database ORM**: Prisma
- **Database**: PostgreSQL (via Supabase)

### Frontend
- **Framework**: React.js (via Vite)
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Routing**: React Router DOM

## Development Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- PostgreSQL database (or Supabase account)

### Backend Configuration
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Configure your environment variables by creating a `.env` file based on the schema requirements (e.g., `DATABASE_URL`).
4. Apply the Prisma schema to your database: `npx prisma db push`
5. Seed the database with initial master data: `npx tsx prisma/seed.ts`
6. Start the development server: `npm run dev`

### Frontend Configuration
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## Contribution Guidelines

Development is currently organized into parallel tracks focusing on Core Setup, Workflows & Logic, Shell & Core Screens, and Interactive Workflows. Please refer to the project roadmap for detailed phase breakdowns and specific module assignments to prevent merge conflicts.
