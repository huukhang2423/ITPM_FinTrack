# FinTrack - Personal Finance Web App

A full-stack web application for tracking personal income and expenses, built with React, TypeScript, Node.js, and PostgreSQL. Features JWT authentication, interactive financial dashboards, and budget management tools.

---

## Features

- **Authentication** – Secure register/login with JWT and bcrypt password hashing
- **Transaction Management** – Full CRUD for income and expense records with category tagging
- **Dashboard** – Visual summaries with 6-month trends, income vs. expense breakdown, and recent activity
- **Budget Planning** – Set and track spending limits by category
- **Data Visualization** – Interactive charts via Recharts (bar, pie, line)
- **Responsive Design** – Mobile-friendly UI with dark mode support

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Tailwind CSS, Recharts |
| Backend | Node.js, Express, TypeScript |
| Database | PostgreSQL, Prisma ORM |
| Auth | JWT, bcrypt |
| Deployment | Vercel (frontend), Render (backend) |

---

## Project Structure

```
ITPM_FinTrack/
├── client/               # React frontend
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Route-level pages
│   │   └── services/     # Axios API calls
└── server/               # Express backend
    ├── src/
    │   ├── routes/        # API route handlers
    │   ├── controllers/   # Business logic
    │   └── middleware/    # Auth middleware
    └── prisma/            # DB schema & migrations
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- PostgreSQL v14+

### Backend Setup

```bash
cd server
npm install

# Configure environment
cp .env.example .env
# Fill in: DATABASE_URL, JWT_SECRET, PORT

# Run database migration
npx prisma migrate dev
npx prisma db seed   # Seed default categories

npm run dev
```

### Frontend Setup

```bash
cd client
npm install

# Configure environment
cp .env.example .env
# Fill in: VITE_API_URL=http://localhost:5000

npm run dev
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login & receive JWT |
| GET | `/api/transactions` | Get all transactions |
| POST | `/api/transactions` | Create transaction |
| PUT | `/api/transactions/:id` | Update transaction |
| DELETE | `/api/transactions/:id` | Delete transaction |
| GET | `/api/categories` | Get all categories |
| GET | `/api/dashboard` | Get dashboard metrics |
