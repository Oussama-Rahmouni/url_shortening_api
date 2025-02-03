import {Router} from 'express';
import ShortenUrlController from '@/controllers/index' 
import {validate} from '@/middleware/index';

const router = Router();

router.post('/shorten',validate, ShortenUrlController.handlePost)
router.use('/:shortened_id',validate, ShortenUrlController.handleGet)

export default router;