import { Router } from 'express';
import {
  getDashboardSummary,
  getChartData,
  getRecentTransactions,
} from '../controllers/dashboardController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.get('/summary', getDashboardSummary);
router.get('/chart', getChartData);
router.get('/recent', getRecentTransactions);

export default router;
