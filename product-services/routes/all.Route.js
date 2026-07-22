import express from 'express';
import { categorybyId, createCategories, deleteCategory, getCategory } from '../controllers/category.Controller.js';
import { createBrand, deleteBrand, getBrand, getbyId, updateBrand } from '../controllers/brand.Controller.js';
import { createProduct, deleteProductbyId, getProdctbyId, getProduct, getProductbySlug, updateProduct } from '../controllers/product.Controller.js';
const router = express.Router();
// 1. category routes
router.post('/categories',createCategories)
router.get('/categories',getCategory)
router.get('/categories/:id',categorybyId)
router.delete('/categories/:id',deleteCategory)

// 2. Brand routes
router.post('/brands',createBrand)
router.get('/brands',getBrand)
router.get('/brands/:id',getbyId)
router.patch('/brands/:id',updateBrand)
router.delete('/brands/:id',deleteBrand)

// 3. Product Routes
router.post('/products',createProduct)
router.get('/products',getProduct)
router.get('/products/:id',getProdctbyId)
router.get('/products/slug/:slug',getProductbySlug)
router.patch('/product/:id',updateProduct)
router.delete('/products/:id',deleteProductbyId)
export default router;