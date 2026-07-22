import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";
import { prisma } from "../src/db.js";

// Create Product Review
export const createProductReview = asyncHandler(async (req, res, next) => {
    const productId = req.params.id;
    const { userId, comment, rating } = req.body;

    // 1. Check required fields
    if (!userId || !comment || !rating) {
        return next(new AppError("All fields are required", 400));
    }
    // Check product exists
    const product = await prisma.product.findUnique({
        where: { id: productId }
    });
    if (!product) {
        return next(new AppError("Product not found", 404));
    }
    // Validate rating
    const reviewRating = Number(rating);
    if (isNaN(reviewRating) || reviewRating < 1 || reviewRating > 5) {
        return next(new AppError("Rating must be between 1 and 5", 400));
    }
    // Check duplicate review
    const existingReview = await prisma.productReview.findUnique({
        where: {
            userId_productId: {
                userId,
                productId
            }
        }
    });
    if (existingReview) {
        return next(new AppError("You have already reviewed this product", 400));
    }
    const review = await prisma.productReview.create({
        data: {
            userId,
            productId,
            rating: reviewRating,
            comment: comment.trim()
        }
    });
    res.status(201).json({
        success: true,
        message: "Review created successfully",
        data: review
    });
});

// 2. Get all ProductReview
export const getallreview = asyncHandler(async(req, res, next)=>{
    const review = await prisma.productReview.findMany({})
    if(!review){
        return next(new AppError("Rating not found", 404))
    }
    res.status(200).json({
        message:"Rating found",
        data:review,
        success:true,
    })
})

// 3. Get comment by Id:
export const getCommentbyId = asyncHandler(async(req, res, next)=>{
    const id = req.params.id;
    const review = await prisma.productReview.findUnique({where:{id}})
    if(!review){
        return next(new AppError("Review not found", 400))
    }
    res.status(200).json({
        message:"Review found",
        success:true,
        data:review,
    })
})

// 4. Delete comment by Id:
export const deleteCommentbyId = asyncHandler(async(req, res, next)=>{
    const id = req.params.id;
    const review = await prisma.productReview.findUnique({where:{id}})
    if(!review){
        return next(new AppError("Review not found",404))
    }
    await prisma.productReview.delete({where:{id}})
    res.status(200).json({
        message:"Comments Deleted",
        success:true,
    })
})

// 5. update comment by Id:
export const updateCommentById = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const { comment, rating } = req.body;
    const review = await prisma.productReview.findUnique({
        where: { id }
    });
    if (!review) {
        return next(new AppError("Review not found", 404));
    }
    const data = {};
    if (comment) {
        data.comment = comment.trim();
    }
    if (rating !== undefined) {
        const reviewRating = Number(rating);
        if (reviewRating < 1 || reviewRating > 5) {
            return next(new AppError("Rating must be between 1 and 5", 400));
        }

        data.rating = reviewRating;
    }
    const updatedReview = await prisma.productReview.update({
        where: { id },
        data,
    });
    res.status(200).json({
        success: true,
        message: "Review updated successfully",
        data: updatedReview
    });
});