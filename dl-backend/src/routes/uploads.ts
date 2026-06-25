import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { upload } from '../middleware/upload';
import { uploadFile } from '../controllers/uploads';

const router = Router();

router.post('/', requireAuth, upload.single('files'), uploadFile);

export default router;
