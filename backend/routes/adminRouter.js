const express= require('express');
const { registerAdmin ,authAdmin} = require('../controllers/adminController');
const { getAppliedUsers,ProcessingUsers,approvedUsers,declinedUsers,getUpdateUsers,getUserlist ,getRecordlist } = require('../controllers/applicationController');
const {getAllUsers ,deleteUser ,getUser ,updateUser,addUser}=require('../controllers/userController')

const router= express.Router();

// router.route("/").post(registerAdmin)
// router.post('/',registerAdmin)

router.route('/adminlogin').post(authAdmin)
router.route("/users").get(getAllUsers)
router.route("/deleteuser").delete(deleteUser)


router.route("/edituser/:userId").get(getUser)
router.route("/edituser/:userId").patch(updateUser) 

router.route('/adduser').post(addUser)
router.route('/appliedusers').get(getAppliedUsers)

router.route('/processusers').patch(ProcessingUsers)

router.route('/approveusers').patch(approvedUsers)
 
router.route('/declinedusers').patch(declinedUsers)
router.route('/updateusers').get(getUpdateUsers)
router.route('/view/:userId').get(getUserlist )
router.route('/recordlist').get(getRecordlist)

module.exports=router;