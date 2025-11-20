import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../types';

const prisma = new PrismaClient();

export const getDashboardSummary = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { month, year } = req.query;

    // Get current month and year if not provided
    const now = new Date();
    const targetMonth = month ? parseInt(month as string) : now.getMonth() + 1;
    const targetYear = year ? parseInt(year as string) : now.getFullYear();

    // Calculate start and end date
    const startDate = new Date(targetYear, targetMonth - 1, 1);
    const endDate = new Date(targetYear, targetMonth, 0, 23, 59, 59);

    // Get all transactions for the month
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: req.userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    // Calculate totals
    const income = transactions
      .filter((t) => t.type === 'INCOME')
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const expense = transactions
      .filter((t) => t.type === 'EXPENSE')
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const balance = income - expense;

    // Get transaction count
    const transactionCount = transactions.length;

    res.json({
      summary: {
        income,
        expense,
        balance,
        transactionCount,
        month: targetMonth,
        year: targetYear,
      },
    });
  } catch (error) {
    console.error('Get dashboard summary error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getChartData = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { month, year, type = 'EXPENSE' } = req.query;

    // Get current month and year if not provided
    const now = new Date();
    const targetMonth = month ? parseInt(month as string) : now.getMonth() + 1;
    const targetYear = year ? parseInt(year as string) : now.getFullYear();

    // Calculate start and end date
    const startDate = new Date(targetYear, targetMonth - 1, 1);
    const endDate = new Date(targetYear, targetMonth, 0, 23, 59, 59);

    // Get transactions grouped by category
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: req.userId,
        type: type as 'INCOME' | 'EXPENSE',
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        category: true,
      },
    });

    // Group by category
    const categoryMap = new Map<
      string,
      { name: string; value: number; color: string }
    >();

    transactions.forEach((transaction) => {
      const categoryId = transaction.category.id;
      const categoryName = transaction.category.name;
      const categoryColor = transaction.category.color || '#8884d8';
      const amount = Number(transaction.amount);

      if (categoryMap.has(categoryId)) {
        const existing = categoryMap.get(categoryId)!;
        existing.value += amount;
      } else {
        categoryMap.set(categoryId, {
          name: categoryName,
          value: amount,
          color: categoryColor,
        });
      }
    });

    const chartData = Array.from(categoryMap.values());

    res.json({
      chartData,
      type,
      month: targetMonth,
      year: targetYear,
    });
  } catch (error) {
    console.error('Get chart data error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getRecentTransactions = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;

    const transactions = await prisma.transaction.findMany({
      where: {
        userId: req.userId,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            type: true,
            icon: true,
            color: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
      take: limit,
    });

    res.json({ transactions });
  } catch (error) {
    console.error('Get recent transactions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
