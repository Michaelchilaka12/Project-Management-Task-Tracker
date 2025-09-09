const comment = require('../models/commentModel');
const factory = require('./handleFactory');

exports.createOne = factory.createOne(comment);
exports.updateProject = factory.updateOne(comment);
exports.deleteProject = factory.deleteOne(comment);
exports.getAllComments = factory.getAll(comment)