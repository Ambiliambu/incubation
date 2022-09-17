const express= require('express');
const { registerUser ,authUser,register,} = require('../controllers/userController');
const {addapply} =require('../controllers/applicationController')
const router= express.Router();

router.route("/").post(registerUser)
router.route('/login').post(authUser)
router.get('/',register)


//application 

router.post('/apply',addapply)


module.exports=router;