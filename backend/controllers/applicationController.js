const asyncHandler= require("express-async-handler");
const Appform=require('../models/applicationModels')

const addapply=asyncHandler(async(req,res)=>{
   const {
          name,
          address,
          city,
          state,
          email,
          phone,
          companyname,
          teamNbackground,
          companyNproduct,
          solution,
          uniquesolution,
          preposition,
          competitorsNadvantages,
          revenue,
          potentialmarketsize,
          marketproductNservice,
          typeincubation,
          proposal,
          logo,
          image,
          isPending,
          isUnderprocess,
          isApproved,
          isDeclined
    } =req.body;

    console.log("applybody",req.body)
   const applicantExists=await Appform.findOne({email});

   if(applicantExists){
    res.status(400);
    throw new Error("Applicant Already Exists");
   }

   const applicant= await Appform.create({ 
    name,
    address,
    city,
    state,
    email,
    phone,
    companyname,
    teamNbackground,
    companyNproduct,
    solution,
    uniquesolution,
    preposition,
    competitorsNadvantages,
    revenue,
    potentialmarketsize,
    marketproductNservice,
    typeincubation,
    proposal,
    logo,
    image,
    isPending,
    isUnderprocess,
    isApproved,
    isDeclined
   })


// console.log("applic",applicant);

   if(applicant){
      res.status(201).json({
        _id:applicant._id,
        name:applicant.name,
        address:applicant.address,
        city:applicant.city,
        state:applicant.state,
        email:applicant.email,
        phone:applicant.phone,
        companyname:applicant.companyname,
        teamNbackground:applicant.teamNbackground,
        companyNproduct:applicant.companyNproduct,
        solution:applicant.solution,
        uniquesolution:applicant.uniquesolution,
        preposition:applicant.preposition,
        competitorsNadvantages:applicant.competitorsNadvantages,
        revenue:applicant.revenue,
        potentialmarketsize:applicant.potentialmarketsize,
        marketproductNservice:applicant.marketproductNservice,
        typeincubation:applicant.typeincubation,
        proposal:applicant.proposal,
        logo:applicant.logo,
        image:applicant.image,
        isPending:applicant.isPending ,
        isUnderprocess: applicant.isUnderprocess,
        isApproved:applicant.isApproved,
        isDeclined:applicant.isDeclined
      })
   }else {
    res.status(400)
    throw new Error('Error Occured')
   }

});

const getAppliedUsers = asyncHandler(async (req, res) => {
   try {
     const appliedusers = await Appform.find({"isPending":true});
    //  console.log("fgh",appliedusers);
     res.json(appliedusers);
   } catch (error) {
     res.json("error is occured");
   }
 });
 
 const getUpdateUsers = asyncHandler(async (req, res) => {
      try {
        const processusers = await Appform.find({$or:[{"isUnderprocess":true},{"isApproved":true},{"isDeclined":true}]});
        // console.log("update",processusers);
        res.json(processusers);
      } catch (error) {
        res.json("error is occured");
      }
    });



    



 const ProcessingUsers=asyncHandler(async(req,res,)=>{
  try{
        const id=req.body.rowId
      //   console.log("jk",id);
        const processStart=await Appform.findByIdAndUpdate(id,{"isPending":false,"isUnderprocess":true})
        // console.log("ghjgjh",);
       res.json( processStart)
          
  }catch(error){
        res.json("error is occured")
  }

 })

 const approvedUsers=asyncHandler(async(req,res,)=>{
  try{
        const id=req.body.approveId
        // console.log("hy",id);
        const approved=await Appform.findByIdAndUpdate(id,{"isUnderprocess":false,"isApproved":true})
        // console.log("jhhjg",approved);
       res.json( approved)
          
  }catch(error){
        res.json("error is occured")
  }

 })


 const declinedUsers=asyncHandler(async(req,res,)=>{
  try{
        const id=req.body.declineId
        console.log("hy",id);
        const declined=await Appform.findByIdAndUpdate(id,{"isUnderprocess":false,"isDeclined":true})
        console.log("ghj",declined)
       res.json( declined)
          
  }catch(error){
        res.json("error is occured")
  }

 })

 const getUserlist = asyncHandler(async (req, res) => {
      try {
        const applieduserss = await Appform.findById(req.params.userId);
        // console.log("fgh",applieduserss);
        res.json(applieduserss);
      } catch (error) {
        res.json("error is occured");
      }
    });
    const getRecordlist = asyncHandler(async (req, res) => {
      try {
        const list = await Appform.find({});
        // console.log("fgh",list);
        res.json(list);
      } catch (error) {
        res.json("error is occured");
      }
    });
    
    


module.exports={addapply,getAppliedUsers,ProcessingUsers,declinedUsers,approvedUsers,getUpdateUsers,getUserlist ,getRecordlist}