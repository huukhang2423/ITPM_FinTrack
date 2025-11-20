import api from './api';
import { Category } from '../types';

export const categoryService = {
  async getCategories(type?: 'INCOME' | 'EXPENSE'): Promise<Category[]> {
    const response = await api.get<{ categories: Category[] }>('/categories', {
      params: { type },
    });
    return response.data.categories;
  },

  async createCategory(data: {
    name: string;
    type: 'INCOME' | 'EXPENSE';
    icon?: string;
    color?: string;
  }): Promise<Category> {
    const response = await api.post<{ category: Category }>('/categories', data);
    return response.data.category;
  },

  async updateCategory(
    id: string,
    data: {
      name?: string;
      icon?: string;
      color?: string;
    }
  ): Promise<Category> {
    const response = await api.put<{ category: Category }>(
      `/categories/${id}`,
      data
    );
    return response.data.category;
  },

  async deleteCategory(id: string): Promise<void> {
    await api.delete(`/categories/${id}`);
  },
};
