import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../utils/AppError.js';
import { prisma } from '../src/db.js';
import axios from 'axios';

// 1 . create cart 
export const createCart = asyncHandler(async(req, res, next)=>{
    const { userId } = req.body;
    if(!userId){
        return next(new AppError("UserID is required", 400))
    }
    const existingCart = await prisma.cart.findUnique({
        where:{
            userId
        }
    })
    if(existingCart){
        return next(new AppError("Cart already exists", 400))
    }
    const cart = await prisma.cart.create({
        data:{
            userId,
            subtotal:0,
            discount:0,
            tax:0,
            total:0,
        },
        include:{
            items:true,
        }
    })
    res.status(201).json({
        message:"Cart Created successfully",
        success:true,
        data:cart
    })
})

// 2. Get Cart
export const getCart = asyncHandler(async(req, res, next)=>{
    const userId = req.user.id;
    const cart = await prisma.cart.findUnique({
        where:{
            userId
        },
        include:{
            items:true,
        }
    });
    if(!cart){
       return next(new AppError("Cart not found", 404))
    }
    res.status(200).json({
        message:"Cart found",
        success:true,
        data:cart
    })
})

// 1. create Cart items
export const createCartItems = asyncHandler(async (req, res, next) => {
    const { cartId } = req.params;
    const { productId, variantId, quantity } = req.body;

    // Validate input
    if (!productId) {
        return next(new AppError("Product id is required", 400));
    }

    if (!variantId) {
        return next(new AppError("Variant id is required", 400));
    }

    const qty = Number(quantity);

    if (!qty || qty <= 0) {
        return next(new AppError("Quantity must be greater than 0", 400));
    }

    // Check cart exists
    const cart = await prisma.cart.findUnique({
        where: {
            id: cartId,
        },
    });

    if (!cart) {
        return next(new AppError("Cart does not exist", 404));
    }

    // Fetch product from Product Service
    const response = await axios.get(
        `http://localhost:6002/api/product/products/${productId}`
    );

    const product = response.data.data;
    
    if (!product) {
        return next(new AppError("Product not found", 404));
    }

    // Find selected variant
    const variant = product.variants.find(
        (v) => v.id === variantId
    );

    if (!variant) {
        return next(new AppError("Variant not found", 404));
    }

    // Check if item already exists
    const existingItem = await prisma.cartItem.findFirst({
        where: {
            cartId,
            productId,
            variantId,
        },
    });

    if (existingItem) {
        const updatedQuantity = existingItem.quantity + qty;
        const updatedTotalPrice = existingItem.unitPrice * updatedQuantity;

        const updatedItem = await prisma.cartItem.update({
            where: {
                id: existingItem.id,
            },
            data: {
                quantity: updatedQuantity,
                totalPrice: updatedTotalPrice,
            },
        });

        return res.status(200).json({
            success: true,
            message: "Cart item updated",
            data: updatedItem,
        });
    }

    // Create new cart item
    const unitPrice = Number(variant.price);
    const totalPrice = unitPrice * qty;

    const cartItem = await prisma.cartItem.create({
        data: {
            cartId,
            productId,
            variantId,
            quantity: qty,
            productName: product.name,
            productSlug: product.slug,
            unitPrice,
            totalPrice,
            variantName:product.name,
        },
    });

    return res.status(201).json({
        success: true,
        message: "Item Added to Cart",
        data: cartItem,
    });
});

// 2. get all cart items
// export const getCartitems = asyncHandler(async(req, res, next)=>{
//     const cartId = req.params.id;
//     const cartitems = await prisma.cartItem.findMany({
//         where:{cartId}
//     })
//     if(cartitems.length <= 0){
//         return next(new AppError("No cart items found",404))
//     }
//     let object=[];
//     for ( const cart of cartitems){
//         const productInfo = await axios.get(`http://localhost:6002/api/products/${cart.productId}`,{
//             headers:{'Content-Type':'application/json'},
//             withCredentials:true,
//         })
//         const product= productInfo.data.data;
//         const variant = product.variants.find((v)=>v.id === cart.variantId);
//         object.push({
//             image:product.images?.[0]?.url,
//             name:product.name,
//             brandName:product.brand?.name,
//             price:variant.costPrice,
//             originalPrice:variant.price,//higher than price
//             stock:variant.stock,
//             color:variant.color,
//             size:variant.size,
//             quantity:cart.quantity,
//         })
//     }
//     res.status(200).json({
//         message:"Get items found",
//         data:object,
//         success:true,
//     })
// })

export const getCartitems = asyncHandler(async (req, res, next) => {
  const cartId = req.params.id;

  // 1. Get all cart items
  const cartitems = await prisma.cartItem.findMany({
    where: { cartId },
  });

  if (cartitems.length === 0) {
    return next(new AppError("No cart items found", 404));
  }

  // 2. Fetch all products concurrently
  const productResponses = await Promise.all(
    cartitems.map((cart) =>
      axios.get(
        `http://localhost:6002/api/product/products/${cart.productId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
    )
  );
  console.log(productResponses[0].data.data)
  // 3. Build the cart response
  const object = cartitems.map((cart, index) => {
    const product = productResponses[index].data.data;

    const variant = product.variants.find(
      (v) => v.id === cart.variantId
    );

    // Handle case where variant doesn't exist
    if (!variant) {
      return {
        id:cart.id,
        productId:product.id,
        cartId:cartId,
        image: product.images?.[0]?.url,
        name: product.name,
        brandName: product.brand?.name,
        price: null,
        originalPrice: null,
        stock: 0,
        color: null,
        size: null,
        quantity: cart.quantity,
      };
    }

    return {
      id:cart.id,
      productId:product.id,
      cartId:product.cartId,
      image: product.images?.[0]?.url,
      name: product.name,
      brandName: product.brand?.name,
      price: variant.costPrice,
      originalPrice: variant.price,
      stock: variant.stock,
      color: variant.color,
      size: variant.size,
      quantity: cart.quantity,
    };
  });

  // 4. Send response
  res.status(200).json({
    message: "Cart items found",
    data: object,
    success: true,
  });
});

// 2. update cart items
export const updateCartItems = asyncHandler(async(req, res, next)=>{
    const { itemsId } = req.params;
    const { quantity } = req.body;
    if(!quantity || quantity <=0){
        return next(new AppError("quantity can not be negative or zero", 400))
    }
    const cartItem = await prisma.cartItem.findUnique({
        where:{id:itemsId}
    })
    if(!cartItem){
        return next(new AppError("CartItem not found", 404))
    }
    const totalPrice = cartItem.unitPrice * quantity;
    const updateditem = await prisma.cartItem.update({
        where:{id:itemsId},
        data:{
            quantity,
            totalPrice,
        }
    })
    res.status(200).json({
        message:"Cart items updated",
        success:true,
        data:updateditem
    })
})


// 3. delete cart items 
export const deleteCartItems = asyncHandler(async(req, res, next)=>{
    console.log('cartitem id is',req.params)
    const { itemsId } = req.params;
    const cartItem = await prisma.cartItem.findFirst({where:{
         id:itemsId
    }})
    if(!cartItem){
        return next(new AppError("Item not found is cart", 404))
    }
    const data = await prisma.cartItem.delete({where:
        {
        id:itemsId,
    } })
    res.status(200).json({
        message:"items Deleted Successfully",
        success:true,
        data,
    })
});


// 4. Clear cart
export const clearCart = asyncHandler(async(req, res, next)=>{
    const { cartId } = req.params;
    const cartItems = await prisma.cartItem.deleteMany({where:{cartId}})
    res.status(200).json({
        message:"cart cleared",
        success:true,
    })
})