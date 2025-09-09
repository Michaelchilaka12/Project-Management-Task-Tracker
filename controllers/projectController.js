const Project = require('../models/projectModel')
const factory = require('./handleFactory');




//create a new tour
exports.createProject = factory.createOne(Project);
exports.updateProject = factory.updateOne(Project);
exports.deleteProject = factory.deleteOne(Project);
exports.getAll = factory.getAll(Project);
exports.getProject = factory.getOne(Project,{path:'comments'})