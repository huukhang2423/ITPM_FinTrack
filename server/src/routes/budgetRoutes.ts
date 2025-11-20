import { Router } from 'express';
import {
  getBudgets,
  createOrUpdateBudget,
  deleteBudget,
} from '../controllers/budgetController';
import { authenticate } from '../middleware/auth';
import {
  budgetValidation,
  validateRequest,
} from '../middleware/validation';

const router = Router();

router.use(authenticate);

router.get('/', getBudgets);
router.post('/', budgetValidation, validateRequest, createOrUpdateBudget);
router.delete('/:id', deleteBudget);

export default router;
