import { Router } from 'express';
import {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from '../controllers/transactionController';
import { authenticate } from '../middleware/auth';
import {
  transactionValidation,
  validateRequest,
} from '../middleware/validation';

const router = Router();

router.use(authenticate);

router.get('/', getTransactions);
router.get('/:id', getTransaction);
router.post('/', transactionValidation, validateRequest, createTransaction);
router.put('/:id', transactionValidation, validateRequest, updateTransaction);
router.delete('/:id', deleteTransaction);

export default router;
