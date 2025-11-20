import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest, TransactionInput } from '../types';

const prisma = new PrismaClient();

export const getTransactions = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { startDate, endDate, categoryId, type } = req.query;

    const where: any = {
      userId: req.userId,
    };

    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = new Date(startDate as string);
      if (endDate) where.date.lte = new Date(endDate as string);
    }

    if (categoryId) {
      where.categoryId = categoryId as string;
    }

    if (type) {
      where.type = type as string;
    }

    const transactions = await prisma.transaction.findMany({
      where,
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
    });

    res.json({ transactions });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getTransaction = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const transaction = await prisma.transaction.findFirst({
      where: {
        id,
        userId: req.userId,
      },
      include: {
        category: true,
      },
    });

    if (!transaction) {
      res.status(404).json({ error: 'Transaction not found' });
      return;
    }

    res.json({ transaction });
  } catch (error) {
    console.error('Get transaction error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createTransaction = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { amount, type, description, date, categoryId }: TransactionInput =
      req.body;

    const transaction = await prisma.transaction.create({
      data: {
        amount,
        type,
        description,
        date: new Date(date),
        userId: req.userId!,
        categoryId,
      },
      include: {
        category: true,
      },
    });

    res.status(201).json({
      message: 'Transaction created successfully',
      transaction,
    });
  } catch (error) {
    console.error('Create transaction error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateTransaction = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { amount, type, description, date, categoryId }: TransactionInput =
      req.body;

    // Check if transaction exists and belongs to user
    const existingTransaction = await prisma.transaction.findFirst({
      where: {
        id,
        userId: req.userId,
      },
    });

    if (!existingTransaction) {
      res.status(404).json({ error: 'Transaction not found' });
      return;
    }

    const transaction = await prisma.transaction.update({
      where: { id },
      data: {
        amount,
        type,
        description,
        date: new Date(date),
        categoryId,
      },
      include: {
        category: true,
      },
    });

    res.json({
      message: 'Transaction updated successfully',
      transaction,
    });
  } catch (error) {
    console.error('Update transaction error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteTransaction = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Check if transaction exists and belongs to user
    const existingTransaction = await prisma.transaction.findFirst({
      where: {
        id,
        userId: req.userId,
      },
    });

    if (!existingTransaction) {
      res.status(404).json({ error: 'Transaction not found' });
      return;
    }

    await prisma.transaction.delete({
      where: { id },
    });

    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('Delete transaction error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
