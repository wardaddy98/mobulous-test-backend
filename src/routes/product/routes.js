import express from 'express';
import { addProduct, deleteProduct, editProduct, getAllProducts } from './controller.js';
const router = express.Router();

router.get('/', getAllProducts);
router.post('/', addProduct);
router.patch('/:productId', editProduct);
router.delete('/:productId', deleteProduct);

export default router;
