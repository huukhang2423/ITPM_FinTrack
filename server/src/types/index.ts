import { Request } from 'express';

export interface AuthRequest extends Request {
  userId?: string;
}

export interface JwtPayload {
  userId: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  name: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface TransactionInput {
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  description?: string;
  date: string;
  categoryId: string;
}

export interface CategoryInput {
  name: string;
  type: 'INCOME' | 'EXPENSE';
  icon?: string;
  color?: string;
}

export interface BudgetInput {
  categoryId: string;
  amount: number;
  month: number;
  year: number;
}

export interface TransactionFilter {
  startDate?: string;
  endDate?: string;
  categoryId?: string;
  type?: 'INCOME' | 'EXPENSE';
}
