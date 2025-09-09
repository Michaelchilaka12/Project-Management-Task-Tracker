const express = require('express');
const kanbanController = require('../controllers/kanbanController')
const authController = require('../controllers/authController')
const router = express.Router()

router.use(authController.protect)

router.get('/todo/:id',kanbanController.getTodo)
router.get('/inprogress/:id',kanbanController.getInProgress)
router.get('/getdone/:id',kanbanController.getDone)

module.exports = router