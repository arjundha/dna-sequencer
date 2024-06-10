import { Router } from 'express';
import defaultRouter from './default.routes';
import translateRouter from './translate.routes';

// Create a new Router instance
const router = Router();

// Mount the routers
router.use('/', defaultRouter);
router.use('/translate', translateRouter);

export default router;