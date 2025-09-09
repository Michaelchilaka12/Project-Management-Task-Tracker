const express = require( 'express');
const upload = require('../middleware/uploads')

const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

const router = express.Router();




router.post('/signup',authController.signup);
router.post('/login',authController.login);
router.post('/forgotPassword',authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword)

router.use(authController.protect)

router.get('/logout',authController.logout);






router.get('/',authController.restrictTo('admin'),userController.getAllUsers);
router.post("/:id/uploadProfilePic", upload.single("profilePic"), userController.uploadfilePic);


module.exports = router
