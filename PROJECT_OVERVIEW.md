# FinTrack - Project Overview

## 📁 Cấu trúc thư mục hiện tại

```
ITPM_PROJ/
│
├── 📄 Documentation Files
│   ├── README.md                    # Tổng quan project
│   ├── SETUP_GUIDE.md              # Hướng dẫn cài đặt chi tiết
│   ├── DEPLOYMENT_GUIDE.md         # Hướng dẫn deploy lên internet
│   ├── API_DOCUMENTATION.md        # Tài liệu API endpoints
│   ├── PROJECT_OVERVIEW.md         # File này - Tổng quan project
│   ├── create-database.sql         # Script tạo database
│   ├── check-postgres.md           # Hướng dẫn kiểm tra PostgreSQL
│   └── .gitignore                  # Git ignore file
│
├── 🔧 Backend (server/)
│   ├── src/
│   │   ├── controllers/            # 5 controllers
│   │   │   ├── authController.ts          # Đăng ký, đăng nhập
│   │   │   ├── transactionController.ts   # CRUD transactions
│   │   │   ├── categoryController.ts      # Quản lý categories
│   │   │   ├── dashboardController.ts     # Dashboard data & charts
│   │   │   └── budgetController.ts        # Budget management (Phase 2)
│   │   │
│   │   ├── routes/                 # 5 route files
│   │   │   ├── authRoutes.ts
│   │   │   ├── transactionRoutes.ts
│   │   │   ├── categoryRoutes.ts
│   │   │   ├── dashboardRoutes.ts
│   │   │   └── budgetRoutes.ts
│   │   │
│   │   ├── middleware/             # Middleware
│   │   │   ├── auth.ts                    # JWT authentication
│   │   │   └── validation.ts              # Input validation
│   │   │
│   │   ├── utils/                  # Utilities
│   │   │   └── jwt.ts                     # JWT token functions
│   │   │
│   │   ├── types/                  # TypeScript types
│   │   │   └── index.ts
│   │   │
│   │   ├── index.ts                # Entry point - Express server
│   │   └── seed.ts                 # Database seeding script
│   │
│   ├── prisma/
│   │   ├── schema.prisma           # Database schema (4 models)
│   │   └── migrations/             # Database migrations
│   │
│   ├── node_modules/               # Dependencies (220 packages)
│   ├── package.json                # NPM dependencies
│   ├── tsconfig.json               # TypeScript config
│   ├── .env                        # Environment variables (LOCAL)
│   └── .env.example                # Environment template
│
├── 💻 Frontend (client/)
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Layout.tsx             # Main layout wrapper
│   │   │   │   └── Navbar.tsx             # Navigation bar
│   │   │   │
│   │   │   ├── ui/                        # Reusable UI components
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   └── Modal.tsx
│   │   │   │
│   │   │   └── PrivateRoute.tsx           # Protected route wrapper
│   │   │
│   │   ├── pages/                         # Page components
│   │   │   ├── auth/
│   │   │   │   ├── Login.tsx              # Login page
│   │   │   │   └── Register.tsx           # Register page
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │   ├── Dashboard.tsx          # Dashboard page
│   │   │   │   └── ExpenseChart.tsx       # Pie chart component
│   │   │   │
│   │   │   └── transactions/
│   │   │       ├── Transactions.tsx       # Transactions list page
│   │   │       └── TransactionModal.tsx   # Add/Edit modal
│   │   │
│   │   ├── services/                      # API integration
│   │   │   ├── api.ts                     # Axios instance
│   │   │   ├── authService.ts             # Auth API calls
│   │   │   ├── transactionService.ts      # Transaction API calls
│   │   │   ├── categoryService.ts         # Category API calls
│   │   │   └── dashboardService.ts        # Dashboard API calls
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.tsx            # Authentication context
│   │   │
│   │   ├── types/
│   │   │   └── index.ts                   # TypeScript interfaces
│   │   │
│   │   ├── App.tsx                        # Main app component
│   │   ├── main.tsx                       # React entry point
│   │   └── index.css                      # Tailwind CSS
│   │
│   ├── node_modules/               # Dependencies (315 packages)
│   ├── public/                     # Static assets
│   ├── index.html                  # HTML template
│   ├── package.json                # NPM dependencies
│   ├── tsconfig.json               # TypeScript config
│   ├── vite.config.ts              # Vite config
│   ├── tailwind.config.js          # Tailwind CSS config
│   ├── postcss.config.js           # PostCSS config
│   ├── .env                        # Environment variables (LOCAL)
│   └── .env.example                # Environment template
│
└── 📊 Database (PostgreSQL)
    ├── fintrack (database)
    │   ├── users table             # User accounts
    │   ├── transactions table      # Financial transactions
    │   ├── categories table        # 14 default categories
    │   └── budgets table           # Budget data (Phase 2)
```

---

## 🎯 Nhiệm vụ của từng file/thư mục

### 📄 Documentation (Root level)

| File | Nhiệm vụ |
|------|----------|
| **README.md** | Giới thiệu tổng quan project, team members, features, tech stack |
| **SETUP_GUIDE.md** | Hướng dẫn cài đặt từ đầu (PostgreSQL, Backend, Frontend) |
| **DEPLOYMENT_GUIDE.md** | Hướng dẫn deploy lên Railway, Vercel, Render |
| **API_DOCUMENTATION.md** | Tài liệu chi tiết tất cả API endpoints với examples |
| **.gitignore** | File ignore cho Git (node_modules, .env, etc.) |

---

### 🔧 Backend (server/)

#### **Controllers** - Xử lý business logic
- `authController.ts` - Đăng ký, đăng nhập, lấy thông tin user
- `transactionController.ts` - CRUD operations cho transactions
- `categoryController.ts` - Quản lý categories (get, create, update, delete)
- `dashboardController.ts` - Tính toán summary, chart data, recent transactions
- `budgetController.ts` - Quản lý budgets (Phase 2)

#### **Routes** - Định nghĩa API endpoints
- `authRoutes.ts` - `/api/auth/*` endpoints
- `transactionRoutes.ts` - `/api/transactions/*` endpoints
- `categoryRoutes.ts` - `/api/categories/*` endpoints
- `dashboardRoutes.ts` - `/api/dashboard/*` endpoints
- `budgetRoutes.ts` - `/api/budgets/*` endpoints

#### **Middleware**
- `auth.ts` - Verify JWT token, protect routes
- `validation.ts` - Validate request body với express-validator

#### **Prisma**
- `schema.prisma` - Định nghĩa database schema (4 models)
- `migrations/` - Lịch sử thay đổi database

#### **Others**
- `index.ts` - Express server setup, khởi động app
- `seed.ts` - Tạo 14 default categories khi setup
- `.env` - Database URL, JWT secret (LOCAL - không commit)

---

### 💻 Frontend (client/)

#### **Pages** - Các trang chính
- **Login.tsx** - Trang đăng nhập
- **Register.tsx** - Trang đăng ký
- **Dashboard.tsx** - Trang dashboard với summary cards, chart, recent transactions
- **Transactions.tsx** - Danh sách transactions với filter
- **TransactionModal.tsx** - Modal thêm/sửa transaction
- **ExpenseChart.tsx** - Pie chart dùng Recharts

#### **Components**
- **Layout.tsx** - Wrapper cho authenticated pages
- **Navbar.tsx** - Navigation bar
- **Button, Input, Card, Modal** - Reusable UI components
- **PrivateRoute.tsx** - Protect routes, redirect nếu chưa đăng nhập

#### **Services** - API calls
- `api.ts` - Axios instance, interceptors
- `authService.ts` - register(), login(), getMe()
- `transactionService.ts` - CRUD functions
- `categoryService.ts` - get/create categories
- `dashboardService.ts` - getSummary(), getChartData()

#### **Context**
- `AuthContext.tsx` - Global authentication state, login/logout functions

---

## 🗄️ Database Schema

### **users**
- Lưu tài khoản người dùng
- Password được hash bằng bcrypt
- Quan hệ: 1 user → nhiều transactions, categories, budgets

### **categories**
- 14 default categories (Food, Salary, etc.)
- User có thể tạo custom categories
- Quan hệ: 1 category → nhiều transactions

### **transactions**
- Lưu tất cả giao dịch thu/chi
- Thuộc về 1 user và 1 category
- Có amount, type (INCOME/EXPENSE), date, description

### **budgets** (Phase 2)
- Đặt ngân sách theo category và tháng
- Tính toán spent, remaining, percentage

---

## ⚙️ Servers đang chạy

### Khi development:

| Service | Port | URL | Nhiệm vụ |
|---------|------|-----|----------|
| **Backend API** | 3000 | http://localhost:3000/api | REST API |
| **Frontend** | 5174 | http://localhost:5174 | React app |
| **Prisma Studio** | 5555 | http://localhost:5555 | Database GUI |
| **PostgreSQL** | 5432 | localhost:5432 | Database server |

---

## 🔐 Environment Variables

### Backend (.env)
```env
DATABASE_URL="postgresql://postgres:postgres123@localhost:5432/fintrack"
JWT_SECRET="a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6"
PORT=3000
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000/api
```

---

## 📊 Statistics

### Backend
- **Controllers**: 5 files
- **Routes**: 5 files
- **Middleware**: 2 files
- **Database Models**: 4 models
- **API Endpoints**: 20+ endpoints
- **Dependencies**: 220 packages

### Frontend
- **Pages**: 5 pages (Login, Register, Dashboard, Transactions, Chart)
- **Components**: 9 components
- **Services**: 5 API service files
- **Dependencies**: 315 packages

### Total Lines of Code
- Backend: ~1,500 lines
- Frontend: ~2,000 lines
- Total: ~3,500 lines

---

## ✅ Tính năng đã hoàn thành

### Phase 1 - MVP (Core Features)
- ✅ [F-01] User Authentication (Register/Login)
- ✅ [F-02] Transaction Management (CRUD)
- ✅ [F-03] Transaction Categorization (14 default categories)
- ✅ [F-04] Dashboard (Income, Expense, Balance summary)
- ✅ [F-05] Data Visualization (Pie chart)

### Phase 2 - Secondary Features (Code sẵn sàng)
- ✅ [F-06] Budgeting (Backend API hoàn chỉnh)
- ✅ [F-07] History & Filtering (Filter by date, category, type)

---

## 🚀 Trạng thái hiện tại

### ✅ Đã hoàn thành:
- [x] Backend API hoàn chỉnh
- [x] Frontend UI hoàn chỉnh
- [x] Database setup với PostgreSQL
- [x] Authentication với JWT
- [x] Dashboard với charts
- [x] Transaction CRUD
- [x] Category management
- [x] Full documentation
- [x] Chạy local thành công

### 🔄 Có thể làm tiếp:
- [ ] Deploy lên internet (Railway + Vercel)
- [ ] Implement Phase 2 features frontend
- [ ] Add unit tests
- [ ] Add more charts (line chart, bar chart)
- [ ] Export to PDF/CSV
- [ ] Dark mode
- [ ] Multi-language

---

## 📚 Tech Stack Summary

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Auth**: JWT + bcrypt
- **Validation**: express-validator

### Frontend
- **Library**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form
- **Charts**: Recharts
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast

### Database
- **DBMS**: PostgreSQL 14+
- **GUI Tools**: pgAdmin 4, Prisma Studio

---

## 🎓 Phù hợp cho Academic Project

✅ **Full-stack web application**
✅ **Modern tech stack**
✅ **Clean architecture**
✅ **Complete documentation**
✅ **Best practices** (validation, authentication, error handling)
✅ **Scalable design**
✅ **Production-ready code**
✅ **Good for CV/Portfolio**

---

## 📞 Next Steps

### Option A: Sử dụng Local
- App đang chạy ở http://localhost:5174
- Chỉ dùng trên máy của bạn
- Cần chạy 2 servers (backend + frontend)

### Option B: Deploy lên Internet
- Deploy Backend lên Railway
- Deploy Frontend lên Vercel
- URL công khai cho mọi người truy cập
- Không cần máy bạn bật

### Option C: Upload lên GitHub
- Version control
- Share code với team
- Backup project
- Add to portfolio

---

Created: November 20, 2025
Last Updated: November 20, 2025
