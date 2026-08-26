import express from 'express';
import { categorybyId, createCategories, deleteCategory, getCategory } from '../controllers/category.Controller.js';
import { createBrand, deleteBrand, getBrand, getbyId, updateBrand } from '../controllers/brand.Controller.js';
import { createProduct, deleteProductbyId, getProdctbyId, getProduct, getProductbySlug, getProductofSeller, getWishlist, manageWhislist, serachProduct, updateProduct } from '../controllers/product.Controller.js';
import { createVariant, deleteVariant, getVariants, updateVariant } from '../controllers/variant.Controller.js';
import { createAttributes, createAttributesvalue, deleteAttributes, deleteAttributesvalue, updateAttributes, updateAttributesValue } from '../controllers/attribute.Controller.js';
import { deleteProductImage, updateProductImage, uploadProductImages, uploadVariantImages } from '../controllers/image.Controller.js';
import { upload } from '../config/multer.js';
import { authMiddleware, sellerMiddleware } from '../middlewares/authMiddleware.js';
import { checkAddress, createAddressess } from '../controllers/delivery.Controller.js';
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
router.post('/products',authMiddleware,sellerMiddleware,createProduct)
router.get('/products',getProduct)
router.get('/products/seller',authMiddleware,sellerMiddleware,getProductofSeller)
router.get('/products/:id',getProdctbyId)
router.get('/products/slug/:slug',getProductbySlug)
router.get('/searchproduct',serachProduct)
router.patch('/products/:id',authMiddleware,sellerMiddleware,updateProduct)
router.delete('/products/:id',authMiddleware,sellerMiddleware,deleteProductbyId)

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
router.patch('/images/:id',upload.single('newimage'),updateProductImage)
router.delete('/images/:id',deleteProductImage)

// 8. upload product variant images
router.post('/variants/:id/images',upload.array('images',10),uploadVariantImages)
router.patch('/images/:id',upload.single('newimage'),updateProductImage)
router.delete('/images/:id',deleteProductImage)

// 9. manage wishlist
router.post('/products/:id/wishlist',authMiddleware,manageWhislist);
router.get('/products/wishlist/items',authMiddleware,getWishlist)

// 10.mange Pincode
router.post('/pincode', createAddressess)
router.get('/pincode/:pincode', checkAddress)
export default router;