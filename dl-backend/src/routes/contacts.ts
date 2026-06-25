import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import * as ctrl from '../controllers/contacts';

const router = Router();

router.get('/', requireAuth, ctrl.listContacts);
router.post('/', ctrl.createContact);
router.delete('/:id', requireAuth, ctrl.deleteContact);

export default router;
