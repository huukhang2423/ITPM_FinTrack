# FinTrack - Setup Guide

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v14 or higher) - [Download](https://www.postgresql.org/download/)
- **npm** or **yarn** package manager
- **Git** (optional) - for version control

## Quick Start

### 1. Database Setup

#### Option A: Using PostgreSQL locally

1. Install and start PostgreSQL
2. Create a new database:

```sql
CREATE DATABASE fintrack;
```

3. Create a database user (optional):

```sql
CREATE USER fintrack_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE fintrack TO fintrack_user;
```

#### Option B: Using PostgreSQL with Docker

```bash
docker run --name fintrack-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=fintrack -p 5432:5432 -d postgres:14
```

### 2. Backend Setup

1. Navigate to the server directory:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file by copying from example:

```bash
cp .env.example .env
```

4. Edit `.env` file with your settings:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/fintrack"
JWT_SECRET="your-super-secret-jwt-key-change-this"
PORT=3000
NODE_ENV=development
```

**Important:**
- Replace `username` and `password` with your PostgreSQL credentials
- Generate a strong random JWT_SECRET (you can use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)

5. Run Prisma migrations:

```bash
npx prisma migrate dev --name init
```

6. Generate Prisma Client:

```bash
npx prisma generate
```

7. Seed default categories:

```bash
npm run seed
```

8. Start the development server:

```bash
npm run dev
```

The API should now be running at `http://localhost:3000`

#### Verify Backend

Test the API:
```bash
curl http://localhost:3000
```

You should see: `{"message":"Welcome to FinTrack API"}`

### 3. Frontend Setup

1. Open a new terminal and navigate to the client directory:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file:

```bash
cp .env.example .env
```

The default configuration should work:
```env
VITE_API_URL=http://localhost:3000/api
```

4. Start the development server:

```bash
npm run dev
```

The application should now be running at `http://localhost:5173`

### 4. Access the Application

1. Open your browser and navigate to `http://localhost:5173`
2. Click "Sign up" to create a new account
3. After registration, you'll be automatically logged in
4. Start tracking your finances!

## Default Categories

After seeding, the following categories will be available:

### Income Categories
- 💰 Salary
- 💼 Freelance
- 📈 Investment
- 🎁 Gift
- 💵 Other Income

### Expense Categories
- 🍔 Food & Dining
- 🚗 Transportation
- 🛍️ Shopping
- 🎮 Entertainment
- 📄 Bills & Utilities
- 🏥 Healthcare
- 📚 Education
- 🏠 Housing
- 💸 Other Expense

## Development Commands

### Backend (in `/server` directory)

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run Prisma Studio (Database GUI)
npm run prisma:studio

# Create new migration
npx prisma migrate dev --name <migration_name>

# Reset database (WARNING: Deletes all data)
npx prisma migrate reset

# Seed database
npm run seed
```

### Frontend (in `/client` directory)

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Troubleshooting

### Database Connection Issues

**Problem:** `Error: Can't reach database server`

**Solution:**
1. Ensure PostgreSQL is running
2. Check your DATABASE_URL in `.env`
3. Verify database credentials
4. Check if PostgreSQL is listening on the correct port (default: 5432)

```bash
# Check PostgreSQL status (Linux/Mac)
sudo systemctl status postgresql

# Check PostgreSQL status (Windows)
# Open Services and look for PostgreSQL
```

### Port Already in Use

**Problem:** `Error: Port 3000 is already in use`

**Solution:**
1. Stop the process using the port
2. Or change the PORT in `server/.env`

```bash
# Find process using port (Linux/Mac)
lsof -i :3000

# Find process using port (Windows)
netstat -ano | findstr :3000

# Kill process
kill -9 <PID>
```

### Prisma Migration Issues

**Problem:** `Migration failed`

**Solution:**
```bash
# Reset migrations (WARNING: Deletes all data)
npx prisma migrate reset

# Or force apply migration
npx prisma migrate deploy
```

### Frontend Build Issues

**Problem:** TypeScript errors during build

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Or try
npm run build -- --force
```

## Project Structure

```
ITPM_PROJ/
├── client/                    # Frontend application
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── context/         # React context
│   │   ├── types/           # TypeScript types
│   │   └── App.tsx          # Main app component
│   └── package.json
│
├── server/                   # Backend application
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Custom middleware
│   │   ├── types/           # TypeScript types
│   │   └── index.ts         # Entry point
│   ├── prisma/
│   │   └── schema.prisma    # Database schema
│   └── package.json
│
└── README.md
```

## Testing the Application

### Manual Testing Workflow

1. **Register a new user**
   - Go to `/register`
   - Enter name, email, and password
   - Should redirect to dashboard

2. **Add a transaction**
   - Click "Add Transaction" button
   - Fill in amount, category, date
   - Should appear in transactions list

3. **View dashboard**
   - Check summary cards (Income, Expense, Balance)
   - Verify pie chart shows expense breakdown
   - See recent transactions

4. **Filter transactions**
   - Use type and category filters
   - Verify results update correctly

5. **Edit transaction**
   - Click "Edit" on a transaction
   - Modify details
   - Should update successfully

6. **Delete transaction**
   - Click "Delete" on a transaction
   - Confirm deletion
   - Should remove from list

## Production Deployment

### Environment Variables

#### Backend (.env)
```env
DATABASE_URL="your-production-database-url"
JWT_SECRET="strong-random-secret-key"
PORT=3000
NODE_ENV=production
```

#### Frontend (.env)
```env
VITE_API_URL=https://your-api-domain.com/api
```

### Build Commands

```bash
# Backend
cd server
npm run build
npm start

# Frontend
cd client
npm run build
# Serve the 'dist' folder with any static file server
```

### Deployment Options

1. **Vercel** (Frontend) + **Railway** (Backend + Database)
2. **Netlify** (Frontend) + **Render** (Backend + Database)
3. **DigitalOcean App Platform** (Full stack)
4. **AWS** (EC2 + RDS)
5. **Heroku** (Full stack)

## Security Notes

1. **Never commit `.env` files** to version control
2. **Use strong JWT secrets** in production
3. **Enable HTTPS** in production
4. **Implement rate limiting** for API endpoints
5. **Validate all user inputs** on both client and server
6. **Use prepared statements** (Prisma handles this)
7. **Keep dependencies updated** regularly

## Support

For issues and questions:
- Check this documentation first
- Review error messages carefully
- Check browser console and server logs
- Verify all environment variables are set correctly

## Next Steps

After successful setup:

1. Create your user account
2. Add some sample transactions
3. Explore the dashboard
4. Try filtering transactions
5. Check the expense chart
6. Customize categories (Phase 2 feature)
7. Set budgets (Phase 2 feature)

Happy tracking! 💰
