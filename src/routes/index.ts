import {Router} from 'express';
import ShortenUrlController from '@/controllers/index' 
import validatePost from '@/middleware';

const router = Router();

router.post('/shorten', validatePost, ShortenUrlController.handlePost)
router.get('/:shortened_id',  ShortenUrlController.handleGet)

export default router;