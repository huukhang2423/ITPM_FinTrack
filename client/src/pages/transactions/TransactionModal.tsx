import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { transactionService } from '../../services/transactionService';
import { Transaction, Category, TransactionInput } from '../../types';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  transaction: Transaction | null;
  categories: Category[];
}

const TransactionModal = ({
  isOpen,
  onClose,
  onSuccess,
  transaction,
  categories,
}: TransactionModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TransactionInput>({
    defaultValues: {
      type: 'EXPENSE',
      date: format(new Date(), 'yyyy-MM-dd'),
    },
  });

  const selectedType = watch('type');

  useEffect(() => {
    if (transaction) {
      reset({
        amount: Number(transaction.amount),
        type: transaction.type,
        description: transaction.description || '',
        date: format(new Date(transaction.date), 'yyyy-MM-dd'),
        categoryId: transaction.categoryId,
      });
    } else {
      reset({
        type: 'EXPENSE',
        date: format(new Date(), 'yyyy-MM-dd'),
        amount: 0,
        description: '',
        categoryId: '',
      });
    }
  }, [transaction, reset]);

  const onSubmit = async (data: TransactionInput) => {
    try {
      if (transaction) {
        await transactionService.updateTransaction(transaction.id, data);
        toast.success('Transaction updated successfully');
      } else {
        await transactionService.createTransaction(data);
        toast.success('Transaction created successfully');
      }
      onSuccess();
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Operation failed');
    }
  };

  const filteredCategories = categories.filter(
    (cat) => cat.type === selectedType
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={transaction ? 'Edit Transaction' : 'Add Transaction'}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="EXPENSE"
                {...register('type', { required: 'Type is required' })}
                className="mr-2"
              />
              <span>Expense</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="INCOME"
                {...register('type', { required: 'Type is required' })}
                className="mr-2"
              />
              <span>Income</span>
            </label>
          </div>
        </div>

        <Input
          label="Amount"
          type="number"
          step="0.01"
          error={errors.amount?.message}
          {...register('amount', {
            required: 'Amount is required',
            min: { value: 0.01, message: 'Amount must be greater than 0' },
          })}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            {...register('categoryId', { required: 'Category is required' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Select a category</option>
            {filteredCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.icon} {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="mt-1 text-sm text-red-600">
              {errors.categoryId.message}
            </p>
          )}
        </div>

        <Input
          label="Description (Optional)"
          type="text"
          {...register('description')}
        />

        <Input
          label="Date"
          type="date"
          error={errors.date?.message}
          {...register('date', { required: 'Date is required' })}
        />

        <div className="flex space-x-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            {transaction ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default TransactionModal;
