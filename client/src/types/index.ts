export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message: string;
}

export interface Category {
  id: string;
  name: string;
  type: 'INCOME' | 'EXPENSE';
  icon?: string;
  color?: string;
  isDefault: boolean;
  userId?: string;
}

export interface Transaction {
  id: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  description?: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  categoryId: string;
  category: Category;
}

export interface TransactionInput {
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  description?: string;
  date: string;
  categoryId: string;
}

export interface DashboardSummary {
  income: number;
  expense: number;
  balance: number;
  transactionCount: number;
  month: number;
  year: number;
}

export interface ChartDataItem {
  name: string;
  value: number;
  color: string;
}

export interface Budget {
  id: string;
  amount: number;
  month: number;
  year: number;
  spent?: number;
  remaining?: number;
  percentage?: number;
  category: Category;
}
