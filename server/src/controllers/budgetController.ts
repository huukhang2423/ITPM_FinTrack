import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest, BudgetInput } from '../types';

const prisma = new PrismaClient();

export const getBudgets = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { month, year } = req.query;

    const now = new Date();
    const targetMonth = month ? parseInt(month as string) : now.getMonth() + 1;
    const targetYear = year ? parseInt(year as string) : now.getFullYear();

    const budgets = await prisma.budget.findMany({
      where: {
        userId: req.userId,
        month: targetMonth,
        year: targetYear,
      },
      include: {
        category: true,
      },
    });

    // Calculate spending for each budget
    const startDate = new Date(targetYear, targetMonth - 1, 1);
    const endDate = new Date(targetYear, targetMonth, 0, 23, 59, 59);

    const budgetsWithSpending = await Promise.all(
      budgets.map(async (budget) => {
        const transactions = await prisma.transaction.findMany({
          where: {
            userId: req.userId,
            categoryId: budget.categoryId,
            type: 'EXPENSE',
            date: {
              gte: startDate,
              lte: endDate,
            },
          },
        });

        const spent = transactions.reduce(
          (sum, t) => sum + Number(t.amount),
          0
        );
        const remaining = Number(budget.amount) - spent;
        const percentage = (spent / Number(budget.amount)) * 100;

        return {
          ...budget,
          spent,
          remaining,
          percentage: Math.min(percentage, 100),
        };
      })
    );

    res.json({ budgets: budgetsWithSpending });
  } catch (error) {
    console.error('Get budgets error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createOrUpdateBudget = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { categoryId, amount, month, year }: BudgetInput = req.body;

    // Check if budget already exists
    const existingBudget = await prisma.budget.findFirst({
      where: {
        userId: req.userId,
        categoryId,
        month,
        year,
      },
    });

    if (existingBudget) {
      // Update existing budget
      const budget = await prisma.budget.update({
        where: { id: existingBudget.id },
        data: { amount },
        include: { category: true },
      });

      res.json({
        message: 'Budget updated successfully',
        budget,
      });
    } else {
      // Create new budget
      const budget = await prisma.budget.create({
        data: {
          categoryId,
          amount,
          month,
          year,
          userId: req.userId!,
        },
        include: { category: true },
      });

      res.status(201).json({
        message: 'Budget created successfully',
        budget,
      });
    }
  } catch (error) {
    console.error('Create/Update budget error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteBudget = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Check if budget exists and belongs to user
    const existingBudget = await prisma.budget.findFirst({
      where: {
        id,
        userId: req.userId,
      },
    });

    if (!existingBudget) {
      res.status(404).json({ error: 'Budget not found' });
      return;
    }

    await prisma.budget.delete({
      where: { id },
    });

    res.json({ message: 'Budget deleted successfully' });
  } catch (error) {
    console.error('Delete budget error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
