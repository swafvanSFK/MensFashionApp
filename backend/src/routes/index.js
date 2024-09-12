import express from 'express';
import userRoutes from './userRoutes.js';
import productRoutes from './productRoutes.js';
import cartRoutes from './cartRoutes.js';
import orderRoutes from './orderRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import reviewRoutes from './reviewRoutes.js';

const router = express.Router();

router.use('/user', userRoutes);
router.use('/product', productRoutes); 
router.use('/cart', cartRoutes); 
router.use('/order', orderRoutes); 
router.use('/category', categoryRoutes); 
router.use('/review', reviewRoutes); 

export default router;