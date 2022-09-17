const User=require('../models/userModels')
const asyncHandler= require("express-async-handler");
const generateToken = require('../utils/generateToken');
const Appform = require('../models/applicationModels');


const registerUser=asyncHandler(async(req,res)=>{
   const {name,email,password} =req.body;
    console.log("dfgh",req.body)
   const userExists=await User.findOne({email});


   if(userExists){
    res.status(400);
    throw new Error("User Already Exists");
   }

   
   const user=await User.create({
    name,
    email,
    password
   })

   if(user){
      res.status(201).json({
          _id:user._id,
          name:user.name,
          email:user.email,
          isAdmin:user.isAdmin,
          token:generateToken(user._id),


      })
   }else {
    res.status(400)
    throw new Error('Error Occured')
   }

});

//login

const authUser=asyncHandler(async(req,res)=>{
    const {email,password} =req.body;

    const user=await User.findOne({email})
    // console.log("user",user);
    if(user && (await user.matchPassword(password))){
        res.json({
             _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id),

        })

    }else {
        res.status(400)
        throw new Error('Invalid Email or Password')
       }
}); 

const register =asyncHandler(async(req,res)=>{
     const user = await User.find({})
     res.status(200).json(user)

     res.json({message:'sdfg'})
})




const getAllUsers = asyncHandler(async (req, res) => {
    try {
      const users = await User.find();
      // console.log("fgh",users);
      res.json(users);
    } catch (error) {
      res.json("error is occured");
    }
  });
  
  //delete user 

  const deleteUser = asyncHandler(async (req, res, next) => {
    try {
      const user = await User.findById(req.query.id);
      await user.remove();
      res.json({});
    } catch (error) {
      res.json(error);
    }
  });
  
  //get a user 

  const getUser = asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      console.log("userId",req.params.userId)
      res.json(user);
    } catch (error) {
      res.json(error);
    }
  });
  
  //update a user details

  const updateUser = asyncHandler(async (req, res) => {
    try {
      const newUserData = {
        name: req.body.name,
        email: req.body.email,
      };
      const user = await User.findByIdAndUpdate(req.params.userId, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
      res.status(200).json({
        success: true,
      });
    } catch (error) {
      res.json(error);
    }
  });
  
 
  //add user 

  const addUser=asyncHandler(async(req,res)=>{
    const {name,email,password} =req.body;
     console.log("dfgh",req.body)
    const userExists=await User.findOne({email});
 
 
    if(userExists){
     res.status(400);
     throw new Error("User Already Exists");
    }
 
    const user=await User.create({
     name,
     email,
     password
    })
 
    if(user){
       res.status(201).json({
           _id:user._id,
           name:user.name,
           email:user.email,
           isAdmin:user.isAdmin,
           token:generateToken(user._id),
 
 
       })
    }else {
     res.status(400)
     throw new Error('Error Occured')
    }
 
 });







module.exports={registerUser,authUser, getAllUsers,deleteUser,getUser,updateUser,register,addUser}















