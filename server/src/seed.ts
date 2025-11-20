import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const defaultCategories = [
  // Income categories
  { name: 'Salary', type: 'INCOME', icon: '💰', color: '#10B981' },
  { name: 'Freelance', type: 'INCOME', icon: '💼', color: '#3B82F6' },
  { name: 'Investment', type: 'INCOME', icon: '📈', color: '#8B5CF6' },
  { name: 'Gift', type: 'INCOME', icon: '🎁', color: '#EC4899' },
  { name: 'Other Income', type: 'INCOME', icon: '💵', color: '#6B7280' },

  // Expense categories
  { name: 'Food & Dining', type: 'EXPENSE', icon: '🍔', color: '#EF4444' },
  { name: 'Transportation', type: 'EXPENSE', icon: '🚗', color: '#F59E0B' },
  { name: 'Shopping', type: 'EXPENSE', icon: '🛍️', color: '#EC4899' },
  { name: 'Entertainment', type: 'EXPENSE', icon: '🎮', color: '#8B5CF6' },
  { name: 'Bills & Utilities', type: 'EXPENSE', icon: '📄', color: '#6B7280' },
  { name: 'Healthcare', type: 'EXPENSE', icon: '🏥', color: '#14B8A6' },
  { name: 'Education', type: 'EXPENSE', icon: '📚', color: '#3B82F6' },
  { name: 'Housing', type: 'EXPENSE', icon: '🏠', color: '#84CC16' },
  { name: 'Other Expense', type: 'EXPENSE', icon: '💸', color: '#6B7280' },
];

async function seed() {
  console.log('🌱 Seeding default categories...');

  for (const category of defaultCategories) {
    await prisma.category.upsert({
      where: {
        id: `default-${category.name.toLowerCase().replace(/\s+/g, '-')}`,
      },
      update: {},
      create: {
        id: `default-${category.name.toLowerCase().replace(/\s+/g, '-')}`,
        name: category.name,
        type: category.type as 'INCOME' | 'EXPENSE',
        icon: category.icon,
        color: category.color,
        isDefault: true,
      },
    });
  }

  console.log('✅ Seeding completed!');
  console.log(`📊 Created ${defaultCategories.length} default categories`);
}

seed()
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
