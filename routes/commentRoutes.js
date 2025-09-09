const express = require('express');
const commentsController = require('../controllers/commentsController')
const authController = require('../controllers/authController')
const router = express.Router()


router.use(authController.protect)
router.post('/',authController.restrictTo('user'),commentsController.createOne)

router.route('/:id').patch(authController.restrictTo('user'),commentsController.updateProject)
.delete(authController.restrictTo('user'),commentsController.deleteProject);
router.get('/',authController.restrictTo('admin'),commentsController.getAllComments)


module.exports = router