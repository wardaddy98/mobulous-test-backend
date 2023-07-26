import express from 'express';
import productRouter from './src/routes/product/routes.js';
import userRouter from './src/routes/user/routes.js';
const router = express.Router();

router.use('/user', userRouter);
router.use('/product', productRouter);

export default router;
