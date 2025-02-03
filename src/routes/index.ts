import {Router} from 'express';
import ShortenUrlController from '@/controllers/index' 
import {upload} from '@/middleware/upload' 
import {validatePost, validateGet} from '@/middleware';

const router = Router();

router.post('/shorten',validatePost, ShortenUrlController.handlePost)
router.get('/:shortnedId', validateGet, ShortenUrlController.handleGet)

router.post('/bulk-shorten',upload.single('file'), ShortenUrlController.bulkUpload)

export default router;