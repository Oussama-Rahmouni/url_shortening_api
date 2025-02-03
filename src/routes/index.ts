import {Router} from 'express';
import ShortenUrlController from '@/controllers/index' 
import {upload} from '@/middleware/upload' 
import {validatePost, validateGet} from '@/middleware';

const router = Router();

// POST /shorten endpoint to shorten a URL
router.post('/shorten',validatePost, ShortenUrlController.handlePost)

// GET /:shortnedId Redirect from shortenUrl to base Url
router.get('/:shortnedId', validateGet, ShortenUrlController.handleGet)

// GET /bulk-shorten Shorten a file of URLs
router.post('/bulk-shorten',upload.single('file'), ShortenUrlController.bulkUpload)

export default router;