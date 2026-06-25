import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import * as ctrl from '../controllers/products';

const router = Router();

router.get('/', ctrl.listProducts);
router.get('/:id', ctrl.getProduct);
router.post('/', requireAuth, ctrl.createProduct);
router.put('/:id', requireAuth, ctrl.updateProduct);
router.delete('/:id', requireAuth, ctrl.deleteProduct);

export default router;
