import api from './api';
import { Transaction, TransactionInput } from '../types';

interface GetTransactionsParams {
  startDate?: string;
  endDate?: string;
  categoryId?: string;
  type?: 'INCOME' | 'EXPENSE';
}

export const transactionService = {
  async getTransactions(params?: GetTransactionsParams): Promise<Transaction[]> {
    const response = await api.get<{ transactions: Transaction[] }>(
      '/transactions',
      { params }
    );
    return response.data.transactions;
  },

  async getTransaction(id: string): Promise<Transaction> {
    const response = await api.get<{ transaction: Transaction }>(
      `/transactions/${id}`
    );
    return response.data.transaction;
  },

  async createTransaction(data: TransactionInput): Promise<Transaction> {
    const response = await api.post<{ transaction: Transaction }>(
      '/transactions',
      data
    );
    return response.data.transaction;
  },

  async updateTransaction(
    id: string,
    data: TransactionInput
  ): Promise<Transaction> {
    const response = await api.put<{ transaction: Transaction }>(
      `/transactions/${id}`,
      data
    );
    return response.data.transaction;
  },

  async deleteTransaction(id: string): Promise<void> {
    await api.delete(`/transactions/${id}`);
  },
};
