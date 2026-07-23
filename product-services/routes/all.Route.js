import express from 'express';
import { categorybyId, createCategories, deleteCategory, getCategory } from '../controllers/category.Controller.js';
import { createBrand, deleteBrand, getBrand, getbyId, updateBrand } from '../controllers/brand.Controller.js';
import { createProduct, deleteProductbyId, getProdctbyId, getProduct, getProductbySlug, updateProduct } from '../controllers/product.Controller.js';
import { createVariant, deleteVariant, getVariants, updateVariant } from '../controllers/variant.Controller.js';
import { createAttributes, createAttributesvalue, deleteAttributes, deleteAttributesvalue, updateAttributes, updateAttributesValue } from '../controllers/attribute.Controller.js';
import { uploadProductImages, uploadVariantImages } from '../controllers/image.Controller.js';
import { upload } from '../config/multer.js';
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

// 4.Product Variant
router.post('/products/:id/variants',createVariant)
router.get('/products/:id/variants',getVariants)
router.patch('/variants/:variantId',updateVariant)
router.delete('/variants/:variantId',deleteVariant)

// 5. Product attributes name
router.post('/products/:id/attributes',createAttributes)
router.patch('/attributes/:id',updateAttributes)
router.delete('/attributes/:id',deleteAttributes)

// 6. Product attributes value
router.post('/attributes/:attributeId/values',createAttributesvalue)
router.patch('/values/:id',updateAttributesValue)
router.delete('/values/:id',deleteAttributesvalue)

// 7. upload product images
router.post('/products/:id/images',upload.array('images',10),uploadProductImages)

// 8. upload product variant images
router.post('/variants/:id/images',upload.array('variants',10),uploadVariantImages)
export default router;