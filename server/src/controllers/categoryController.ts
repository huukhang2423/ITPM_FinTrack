import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest, CategoryInput } from '../types';

const prisma = new PrismaClient();

export const getCategories = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { type } = req.query;

    const where: any = {
      OR: [{ isDefault: true }, { userId: req.userId }],
    };

    if (type) {
      where.type = type as string;
    }

    const categories = await prisma.category.findMany({
      where,
      orderBy: [{ isDefault: 'desc' }, { name: 'asc' }],
    });

    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createCategory = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { name, type, icon, color }: CategoryInput = req.body;

    const category = await prisma.category.create({
      data: {
        name,
        type,
        icon,
        color,
        userId: req.userId!,
        isDefault: false,
      },
    });

    res.status(201).json({
      message: 'Category created successfully',
      category,
    });
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateCategory = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, icon, color }: Partial<CategoryInput> = req.body;

    // Check if category exists and belongs to user (can't update default categories)
    const existingCategory = await prisma.category.findFirst({
      where: {
        id,
        userId: req.userId,
        isDefault: false,
      },
    });

    if (!existingCategory) {
      res.status(404).json({ error: 'Category not found or cannot be modified' });
      return;
    }

    const category = await prisma.category.update({
      where: { id },
      data: {
        name,
        icon,
        color,
      },
    });

    res.json({
      message: 'Category updated successfully',
      category,
    });
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteCategory = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Check if category exists and belongs to user (can't delete default categories)
    const existingCategory = await prisma.category.findFirst({
      where: {
        id,
        userId: req.userId,
        isDefault: false,
      },
    });

    if (!existingCategory) {
      res.status(404).json({ error: 'Category not found or cannot be deleted' });
      return;
    }

    // Check if category is being used in transactions
    const transactionCount = await prisma.transaction.count({
      where: { categoryId: id },
    });

    if (transactionCount > 0) {
      res.status(400).json({
        error: 'Cannot delete category that is being used in transactions',
      });
      return;
    }

    await prisma.category.delete({
      where: { id },
    });

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
