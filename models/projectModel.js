const mongoose = require('mongoose');






const projectSchema = new mongoose.Schema({
    taskName:{
        type:String,
        required:[true, 'A task must have a name'],
    },
    startDate:{
        type:Date,
        default:Date.now()
    },
    endDate:{
        type:Date
    },
     team:[
        {
            type: mongoose.Schema.ObjectId,
            ref:"User",
            required:[true, 'You must assign task to team members']
        }
    ],
     ratingsAverage: {
        type:Number,
        default: 4.5,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0'],
        set:val => Math.round(val * 10) / 10
    },
    ratingQuantity:{
        type: Number,
        default: 0
    }
},{
    toJSON: {virtuals: true},
    toObject:  {virtuals: true}
}
)



projectSchema.pre('save', function (next) {
  // Add 7 days to createdAt
  this.endDate = new Date(this.startDate.getTime() + 7 * 24 * 60 * 60 * 1000);
  next();
});




projectSchema.virtual('comments',{
    ref:'coments',
    foreignField:'task',
    localField:'_id'
});




const Project = mongoose.model('Project', projectSchema);
module.exports = Project;