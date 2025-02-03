import {Router} from 'express';
import ShortenUrlController from '@/controllers/index' 
import validatePost from '@/middleware';

const router = Router();

router.post('/shorten', validatePost, ShortenUrlController.handlePost)
router.get('/:shortnedId',  ShortenUrlController.handleGet)

export default router;