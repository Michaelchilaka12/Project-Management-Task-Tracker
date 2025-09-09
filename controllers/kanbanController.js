// const mongoose = require('mongoose')
// const AppError = require('../utils/appError')
// const catchAsync = require('../utils/catchAsync')
const Project = require('../models/projectModel')
const factory = require('./handleFactory')


exports.getTodo = factory.getTodo(Project)
exports.getInProgress = factory.getInProgress(Project)
exports.getDone = factory.getDone(Project)