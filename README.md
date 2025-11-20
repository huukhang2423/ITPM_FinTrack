# FinTrack - Personal Finance Web App

A user-friendly web application designed to help individuals, particularly students and young professionals, track their daily income and expenses.

## Team Members
- Nguyễn Hữu Khang - ITDSIU21002
- Nguyễn Bá Duy - ITDSIU21014
- Phạm Huỳnh Thanh Quân - ITDSIU21110
- Đặng Thái Sơn - ITDSIU21115
- Nguyễn Thị Mai Phương - ITDSIU20080

## Tech Stack

### Frontend
- React 18 + TypeScript
- Tailwind CSS
- Recharts (Data Visualization)
- React Router DOM
- Axios

### Backend
- Node.js + Express + TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication
- bcrypt

## Project Structure

```
ITPM_PROJ/
├── client/          # Frontend React App
├── server/          # Backend Express API
└── README.md
```

## Features

### Phase 1 - MVP (Core Features)
- [F-01] User Authentication (Register/Login)
- [F-02] Transaction Management (CRUD)
- [F-03] Transaction Categorization
- [F-04] Dashboard with Summary
- [F-05] Data Visualization (Charts)

### Phase 2 - Secondary Features
- [F-06] Budget Management
- [F-07] Transaction History & Filtering

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- PostgreSQL (v14+)
- npm or yarn

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/fintrack"
JWT_SECRET="your-secret-key"
PORT=3000
```

4. Run Prisma migrations:
```bash
npx prisma migrate dev
npx prisma generate
```

5. Seed default categories:
```bash
npm run seed
```

6. Start server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
VITE_API_URL=http://localhost:3000/api
```

4. Start development server:
```bash
npm run dev
```

## API Documentation

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Transactions
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create custom category

### Dashboard
- `GET /api/dashboard/summary` - Get dashboard summary
- `GET /api/dashboard/chart` - Get chart data

## License

This is an academic project for educational purposes.
