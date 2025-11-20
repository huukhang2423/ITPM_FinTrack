# FinTrack API Documentation

Base URL: `http://localhost:3000/api` (development)

All API requests require authentication except for registration and login endpoints.

## Authentication

Include the JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

---

## Endpoints

### Authentication

#### Register New User

```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "token": "jwt.token.here"
}
```

---

#### Login

```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "token": "jwt.token.here"
}
```

---

#### Get Current User

```http
GET /api/auth/me
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### Transactions

#### Get All Transactions

```http
GET /api/transactions?startDate=2024-01-01&endDate=2024-01-31&categoryId=uuid&type=EXPENSE
```

**Query Parameters:**
- `startDate` (optional): ISO date string
- `endDate` (optional): ISO date string
- `categoryId` (optional): Category UUID
- `type` (optional): INCOME | EXPENSE

**Response (200):**
```json
{
  "transactions": [
    {
      "id": "uuid",
      "amount": 50000,
      "type": "EXPENSE",
      "description": "Lunch at restaurant",
      "date": "2024-01-15T12:00:00Z",
      "createdAt": "2024-01-15T12:05:00Z",
      "updatedAt": "2024-01-15T12:05:00Z",
      "userId": "uuid",
      "categoryId": "uuid",
      "category": {
        "id": "uuid",
        "name": "Food & Dining",
        "type": "EXPENSE",
        "icon": "🍔",
        "color": "#EF4444"
      }
    }
  ]
}
```

---

#### Get Single Transaction

```http
GET /api/transactions/:id
```

**Response (200):**
```json
{
  "transaction": {
    "id": "uuid",
    "amount": 50000,
    "type": "EXPENSE",
    "description": "Lunch at restaurant",
    "date": "2024-01-15T12:00:00Z",
    "createdAt": "2024-01-15T12:05:00Z",
    "updatedAt": "2024-01-15T12:05:00Z",
    "userId": "uuid",
    "categoryId": "uuid",
    "category": {
      "id": "uuid",
      "name": "Food & Dining",
      "type": "EXPENSE",
      "icon": "🍔",
      "color": "#EF4444"
    }
  }
}
```

---

#### Create Transaction

```http
POST /api/transactions
```

**Request Body:**
```json
{
  "amount": 50000,
  "type": "EXPENSE",
  "description": "Lunch at restaurant",
  "date": "2024-01-15T12:00:00Z",
  "categoryId": "uuid"
}
```

**Response (201):**
```json
{
  "message": "Transaction created successfully",
  "transaction": {
    "id": "uuid",
    "amount": 50000,
    "type": "EXPENSE",
    "description": "Lunch at restaurant",
    "date": "2024-01-15T12:00:00Z",
    "category": {
      "id": "uuid",
      "name": "Food & Dining"
    }
  }
}
```

---

#### Update Transaction

```http
PUT /api/transactions/:id
```

**Request Body:**
```json
{
  "amount": 60000,
  "type": "EXPENSE",
  "description": "Updated description",
  "date": "2024-01-15T12:00:00Z",
  "categoryId": "uuid"
}
```

**Response (200):**
```json
{
  "message": "Transaction updated successfully",
  "transaction": { /* updated transaction */ }
}
```

---

#### Delete Transaction

```http
DELETE /api/transactions/:id
```

**Response (200):**
```json
{
  "message": "Transaction deleted successfully"
}
```

---

### Categories

#### Get All Categories

```http
GET /api/categories?type=EXPENSE
```

**Query Parameters:**
- `type` (optional): INCOME | EXPENSE

**Response (200):**
```json
{
  "categories": [
    {
      "id": "uuid",
      "name": "Food & Dining",
      "type": "EXPENSE",
      "icon": "🍔",
      "color": "#EF4444",
      "isDefault": true,
      "userId": null
    }
  ]
}
```

---

#### Create Custom Category

```http
POST /api/categories
```

**Request Body:**
```json
{
  "name": "Gaming",
  "type": "EXPENSE",
  "icon": "🎮",
  "color": "#8B5CF6"
}
```

**Response (201):**
```json
{
  "message": "Category created successfully",
  "category": {
    "id": "uuid",
    "name": "Gaming",
    "type": "EXPENSE",
    "icon": "🎮",
    "color": "#8B5CF6",
    "isDefault": false
  }
}
```

---

#### Update Category

```http
PUT /api/categories/:id
```

**Request Body:**
```json
{
  "name": "Updated Name",
  "icon": "🎯",
  "color": "#10B981"
}
```

**Response (200):**
```json
{
  "message": "Category updated successfully",
  "category": { /* updated category */ }
}
```

---

#### Delete Category

```http
DELETE /api/categories/:id
```

**Response (200):**
```json
{
  "message": "Category deleted successfully"
}
```

**Error (400):**
```json
{
  "error": "Cannot delete category that is being used in transactions"
}
```

---

### Dashboard

#### Get Dashboard Summary

```http
GET /api/dashboard/summary?month=1&year=2024
```

**Query Parameters:**
- `month` (optional): 1-12, defaults to current month
- `year` (optional): defaults to current year

**Response (200):**
```json
{
  "summary": {
    "income": 5000000,
    "expense": 3200000,
    "balance": 1800000,
    "transactionCount": 25,
    "month": 1,
    "year": 2024
  }
}
```

---

#### Get Chart Data

```http
GET /api/dashboard/chart?type=EXPENSE&month=1&year=2024
```

**Query Parameters:**
- `type` (required): INCOME | EXPENSE
- `month` (optional): 1-12
- `year` (optional): current year

**Response (200):**
```json
{
  "chartData": [
    {
      "name": "Food & Dining",
      "value": 500000,
      "color": "#EF4444"
    },
    {
      "name": "Transportation",
      "value": 300000,
      "color": "#F59E0B"
    }
  ],
  "type": "EXPENSE",
  "month": 1,
  "year": 2024
}
```

---

#### Get Recent Transactions

```http
GET /api/dashboard/recent?limit=5
```

**Query Parameters:**
- `limit` (optional): number of transactions, default 5

**Response (200):**
```json
{
  "transactions": [
    {
      "id": "uuid",
      "amount": 50000,
      "type": "EXPENSE",
      "description": "Lunch",
      "date": "2024-01-15T12:00:00Z",
      "category": {
        "id": "uuid",
        "name": "Food & Dining",
        "icon": "🍔",
        "color": "#EF4444"
      }
    }
  ]
}
```

---

### Budgets (Phase 2)

#### Get Budgets

```http
GET /api/budgets?month=1&year=2024
```

**Response (200):**
```json
{
  "budgets": [
    {
      "id": "uuid",
      "amount": 1000000,
      "month": 1,
      "year": 2024,
      "spent": 750000,
      "remaining": 250000,
      "percentage": 75,
      "category": {
        "id": "uuid",
        "name": "Food & Dining"
      }
    }
  ]
}
```

---

#### Create/Update Budget

```http
POST /api/budgets
```

**Request Body:**
```json
{
  "categoryId": "uuid",
  "amount": 1000000,
  "month": 1,
  "year": 2024
}
```

**Response (201):**
```json
{
  "message": "Budget created successfully",
  "budget": {
    "id": "uuid",
    "amount": 1000000,
    "month": 1,
    "year": 2024
  }
}
```

---

#### Delete Budget

```http
DELETE /api/budgets/:id
```

**Response (200):**
```json
{
  "message": "Budget deleted successfully"
}
```

---

## Error Responses

### 400 Bad Request

```json
{
  "error": "Validation error message",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email address"
    }
  ]
}
```

### 401 Unauthorized

```json
{
  "error": "No token provided"
}
```

or

```json
{
  "error": "Invalid token"
}
```

### 404 Not Found

```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error

```json
{
  "error": "Internal server error"
}
```

---

## Rate Limiting

Currently no rate limiting implemented. Consider adding in production:

- 100 requests per 15 minutes per IP
- 1000 requests per day per user

---

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get Transactions (with auth)
```bash
curl -X GET http://localhost:3000/api/transactions \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Create Transaction
```bash
curl -X POST http://localhost:3000/api/transactions \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 50000,
    "type": "EXPENSE",
    "description": "Test transaction",
    "date": "2024-01-15T12:00:00Z",
    "categoryId": "YOUR_CATEGORY_ID"
  }'
```

---

## Postman Collection

You can import this collection into Postman for easier testing:

[Download Postman Collection](#) (Create and share if needed)

---

## WebSocket Support

Currently not implemented. Consider adding for:
- Real-time transaction updates
- Live budget progress
- Notifications

---

## API Versioning

Current version: `v1` (implicit)

Future versions could be:
- `/api/v2/transactions`
- Via header: `Accept: application/vnd.fintrack.v2+json`
