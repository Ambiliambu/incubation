const Admin=require('../models/adminModel')
const asyncHandler= require("express-async-handler");
const generateToken = require('../utils/generateToken');

const registerAdmin=asyncHandler(async(req,res)=>{
   const {name,email,password} =req.body;
    console.log("dfgh",req.body)
    // if(name&&email&&password){}
   const adminExists=await Admin.findOne({email});

   if(adminExists){
    res.status(400);
    throw new Error("Admin Already Exists");
   }

   const admin=await Admin.create({
    name,
    email,
    password
   })

   if(admin){
      res.status(201).json({
          _id:admin._id,
          name:admin.name,
          email:admin.email,
        //   token:generateToken(admin._id),


      })
   }else {
    res.status(400)
    throw new Error('Error Occured')
   }

});

//login

const authAdmin=asyncHandler(async(req,res)=>{
    const {email,password} =req.body;
    console.log("hello hellosss",req.body);

    const admin=await Admin.findOne({email})
    if(admin && (await admin.matchPassword(password))){
        res.json({
            _id:admin._id,
            name:admin.name,
            email:admin.email,
            // token:generateToken(admin._id),

        })

    }else {
        res.status(400)
        throw new Error('Invalid Email or Password')
       }
});

// const register =asyncHandler(async(req,res)=>{
//      const admin = await Admin.find({})
//      res.status(200).json(admin)

//      res.json({message:'sdfg'})
// })
module.exports={registerAdmin,authAdmin}