# BusTrack — Bus Tracking and Ticketing System

A modern web application for managing bus transportation, built with React, Vite, and Tailwind CSS. It supports three user roles: **Passenger**, **Driver**, and **Admin**.

## Features

### Passenger
- Search and browse available trips
- Interactive seat selection and booking
- View and manage tickets
- Real-time bus tracking
- Submit feedback

### Driver
- View assigned trips
- Update trip status
- Access tracking interface

### Admin
- Dashboard with system overview
- Manage buses (add, edit, delete)
- Manage routes
- Manage trips and schedules

## Tech Stack

| Tool | Purpose |
|------|---------|
| [React 18](https://react.dev) | UI framework |
| [Vite 5](https://vitejs.dev) | Build tool & dev server |
| [TypeScript 5](https://www.typescriptlang.org) | Type safety |
| [Tailwind CSS 3](https://tailwindcss.com) | Utility-first styling |
| [React Router 6](https://reactrouter.com) | Client-side routing |
| [Axios](https://axios-http.com) | HTTP client with JWT interceptors |
| [Leaflet](https://leafletjs.com) + [React Leaflet](https://react-leaflet.js.org) | Map & bus tracking |
| [Recharts](https://recharts.org) | Dashboard charts |
| [shadcn/ui](https://ui.shadcn.com) | UI component library |
| [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) | Form handling & validation |
| [TanStack React Query](https://tanstack.com/query) | Server state management |
| [Lucide React](https://lucide.dev) | Icons |
| [Sonner](https://sonner.emilkowal.dev) | Toast notifications |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) (v18 or higher)
- [npm](https://www.npmjs.com/) or [bun](https://bun.sh/)

### Installation

```bash
git clone <your-repo-url>
cd <project-folder>
npm install
```

### Environment Variable

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

This points to your Django REST Framework backend. All API calls use this base URL with **trailing slashes** (Django requirement).

### Development

```bash
npm run dev
```

The app will start at **http://localhost:8080**.

### Build for Production

```bash
npm run build
npm run preview
```

## 🔐 Backend API Integration

This frontend is designed to work with a **Django REST Framework** backend using **JWT authentication** (`rest_framework_simplejwt`).

### API Layer (`src/lib/api.ts`)
- Axios instance with automatic **JWT token injection** (`Authorization: Bearer <token>`)
- **Auto token refresh** on 401 responses via `POST /api/auth/token/refresh/`
- All URLs include trailing slashes (Django requirement)

### Services (`src/services/`)

| Service | Endpoints | Access |
|---------|-----------|--------|
| `authService` | `/auth/register/`, `/auth/login/`, `/auth/me/` | Public |
| `busService` | `/admin/buses/` (CRUD), `/buses/` (read) | Admin / Public |
| `routeService` | `/admin/routes/` (CRUD) | Admin |
| `tripService` | `/admin/trips/`, `/passenger/trips/`, `/driver/trips/` | Role-based |
| `ticketService` | `/passenger/tickets/` (CRUD) | Passenger |

### Auth Flow

1. Register → `POST /api/auth/register/` (username, email, password, role)
2. Login → `POST /api/auth/login/` → receives `{ access, refresh }`
3. Tokens stored in `localStorage`, access token sent with every request
4. On 401 → auto-refresh via `POST /api/auth/token/refresh/`
5. User profile → `GET /api/auth/me/`

### Expected Backend Data Models

```
User     { id, username, email, role }
Bus      { id, plate_number, capacity }
Route    { id, origin, destination }
Trip     { id, bus, route, driver, departure_time, status }
Ticket   { id, trip, passenger, seat_number, status }
```

### Role-Based Routing

| Role | Dashboard | URL Prefix |
|------|-----------|------------|
| Admin | `/admin/dashboard` | `/api/admin/...` |
| Driver | `/driver/dashboard` | `/api/driver/...` |
| Passenger | `/dashboard` | `/api/passenger/...` |

## Project Structure

```
src/
├── components/       # Reusable UI components
│   └── ui/           # shadcn/ui components
├── contexts/         # React context providers (Auth)
├── hooks/            # Custom React hooks
├── layouts/          # Page layout wrappers
├── lib/              # API client & utilities
├── services/         # API service modules (auth, bus, route, trip, ticket)
├── pages/
│   ├── passenger/    # Passenger pages (Dashboard, Trips, Booking, etc.)
│   ├── driver/       # Driver pages
│   └── admin/        # Admin pages (ManageBuses, ManageRoutes, etc.)
└── main.tsx          # App entry point
```

## License

This project is for educational purposes.
