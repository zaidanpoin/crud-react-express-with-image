import express from 'express';
import {
    saveProducts,
    deleteProducts,
    getProductsById,
    getProducts,
    updateProduct

} from '../controllers/ProductController.js';


const router = express.Router();

router.get('/products', getProducts);
router.get('/products/:id', getProductsById);
router.post('/product', saveProducts);
router.patch('/product/:id', updateProduct);
router.delete('/product/:id', deleteProducts);


export default router