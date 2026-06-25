import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import * as ctrl from '../controllers/categories';

const router = Router();

router.get('/', ctrl.listCategories);
router.get('/:id', ctrl.getCategory);
router.post('/', requireAuth, ctrl.createCategory);
router.put('/:id', requireAuth, ctrl.updateCategory);
router.delete('/:id', requireAuth, ctrl.deleteCategory);

export default router;
