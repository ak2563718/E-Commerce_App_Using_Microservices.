import { asyncHandler } from '../utils/asyncHandler.js'
import { AppError } from '../utils/AppError.js';
import { prisma } from '../generated/db.js'

// 1. create user information
export const createInfo = asyncHandler(async(req, res, next)=>{
    const { id, email } = req.body;
    if(!id || !email){
        return next(new AppError("Please Provide both id and email", 400))
    }
    const user = await prisma.user.create({
        data:{
            id:id,
            email:email
        }
    })
    res.status(201).json({
        success:true,
        message:"User profile created",
        data:user
    })
});

// 2. Get user info
export const getUser = asyncHandler(async(req, res, next)=>{
    const { id } = req.body;
    const user = await prisma.user.findUnique({
        where:{
            id:id
        }
    })
    if(!user){
        return next(new AppError("No user is associated with this user Id", 404))
    }
    res.status(200).json({
        message:"User found",
        success:true,
        data:user
    })
})

// 3. Update user info
export const updateUser = asyncHandler(async(req, res, next)=>{
    const {id, firstName, lastName, phone, gender, dateofBirth } = req.body;
    if(!firstName && !lastName && !phone && !gender && !dateofBirth){
        return next(new AppError("Provide something to update", 400))
    } 
    const obj ={};
    if(firstName) obj.firstName = firstName.trim();
    if(lastName) obj.lastName = lastName.trim();
    if(phone) {
        if(!validator.isMobilePhone(phone,"en-IN")){
            return next(new AppError("Inavalid Phone number", 400))
        }
        obj.phone = phone;
    }
    if(gender) obj.gender = gender.trim();
    if(dateofBirth) obj.dateofBirth = dateofBirth;
    const found = await prisma.user.findUnique({where:{id}})
    if(!found){
        return next(new AppError("Invalid user Id", 404))
    }
    const user = await prisma.user.update({
        where:{
            id
        },
        data:obj
    });
    res.status(200).json({
        message:"User details updated",
        success:true,
        data:user,
    })
})

// 4. create user address
export const createAddress = asyncHandler(async(req, res, next)=>{
    const { userId, fullName, phone, add1, add2, city, state, country, pincode, landmark } = req.body;
    if(!fullName || !phone || !add1 ||!city || !state ||!country || !pincode){
        return next(new AppError("Please provide all required field", 400))
    }
    if(!validator.isMobilePhone(phone,"en-IN")){
        return next(new AppError("Invalid phone", 400))
    }
    const address = await prisma.address.create({
        data:{
           userId,
           fullName:fullName.trim(),
           phone:phone.trim(),
           addressLine1:add1.trim(),
           addressLine2:add2|'null',
           city:city.trim(),
           state:state.trim(),
           country:country.trim(),
           postalCode:pincode.trim(),
           landmark:landmark | "null",
        }
    });
    res.status(201).json({
        success:true,
        message:"address created",
        data:address,
    })
})

// 5. get all address by userId 
export const getAddresswithUserId = asyncHandler(async(req, res, next)=>{
    const userId = req.body;
    const address = await prisma.address.findMany({
        where:{
            userId
        }
    });
    if(!address){
        return next(new AppError("No address found", 404))
    }
    res.status(200).json({
        success:true,
        message:"Address found",
        data:address,
    })
})

// 6. get address by id
export const getaddressbyId = asyncHandler(async(req, res, next)=>{
    const id = req.params.id;
    const address = await prisma.address.findUnique({
        where:{
            id,
        }
    })
    if(!address){
        return next(new AppError("address not found", 404))
    }
    res.status(200).json({
        success:true,
        message:"Address found",
        data:address,
    })
})

// 7. update address by id
export const updateaddress = asyncHandler(async(req, res, next)=>{
    const id = req.params.id;
    const {fullName, phone, add1, add2, city, state, country, pincode, landmark } = req.body;
    if(!fullName && !phone && !add1 && !add2 && !city && !state && !country && ! pincode && !landmark){
        return next(new AppError("Provide something to update", 400))
    } 
    const update = {};
    if(fullName) update.fullName = fullName.trim();
    if(phone){
        if(!validator.isMobilePhone(phone,'en-IN')){
            return next(new AppError("Invalid phone no", 400))
        }
        update.phone = phone.trim();
    }
    if(add1) update.addressLine1 = add1.trim();
    if(add2) update.addressLine2 = add2.trim();
    if(city) update.city = city;
    if(state) update.state = state;
    if(country) update.country = country;
    if(pincode) update.postalCode = pincode;
    if(landmark) update.landmark = landmark.trim();

    const found = await prisma.address.findUnique({
        where:{id}
    })
    const address = await prisma.address.update({
        where:{id},
        data:update,
    })
    res.status(200).json({
        success:true,
        message:"address updated",
        data:address
    })
})

// 8. delete address by id
export const deleteaddress = asyncHandler(async(req, res, next)=>{
    const id = req.params.id;
    const found = await prisma.address.findUnique({where:{id}})
    if(!found) {
        return next(new AppError("Address not found"))
    }
    const address = await prisma.address.delete({
        where:{
            id
        }
    })
    res.status(200).json({
        message:"address deleted successfully",
        success:true,
        data:address,
    })
})

// 9. update address default
export const updatedefaultsetting = asyncHandler(async(req, res, next)=>{
    const { value } = req.body;
    const id = req.params.id;
    if(!value){
        return next(new AppError("Value not given", 400))
    }
    const found = await prisma.address.findUnique({where:{id}})
    if(!found){
        return next(new AppError("address not found", 404))
    }
    const address = await prisma.address.update({
        where:{id},
        data:{
            isDefault:value
        }
    })
    res.status(200).json({
        message:"address updated successfully",
        success:true,
        data:address
    })
})