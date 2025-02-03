import {Router} from 'express';
import ShortenUrl from '@/controller/index' 
import ShortenUrlController from '../controllers';

const router = Router();

router.post('/postRequst',validate, ShortenUrlController.handlePost)
router.use('/:shortnedURL',validate, ShortenUrlController.handlerGet)

export default router;