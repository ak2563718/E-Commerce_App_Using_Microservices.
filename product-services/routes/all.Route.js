import express from 'express';
import { categorybyId, createCategories, deleteCategory, getCategory } from '../controllers/category.Controller.js';
import { createBrand, deleteBrand, getBrand, getbyId, updateBrand } from '../controllers/brand.Controller.js';
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
export default router;