const mongoose = require('mongoose');
const Project = require('./projectModel');
const { path } = require('../app');





const commentSchema = new mongoose.Schema({
    comment:{
        type: String,
        required: [true, 'Review can not be empty!']
    },
    rating:{
        type:Number,
        min: 1,
        max:5
    },
    createdAt:{
        type: Date,
        default: Date.now(),
        // select: false //how to hide a particular field from been sent to the client
    },
    task:[{
        type: mongoose.Schema.ObjectId,
        ref: "Project",
        required: [true, 'comment must belong to a Project.']
    }],
    user:[
        {
            type: mongoose.Schema.ObjectId,
            ref:"User",
            required:[true, 'comment must belong to a user']
        }
    ],
},{
    toJSON: {virtuals: true},
    toObject:  {virtuals: true}
})




//middlewarw
commentSchema.pre(/^find/, function(next) {
    // this.populate({
    //         path: 'user',
    //         select: 'name photo'
    //     }).populate({
    //         path: 'tour',
    //         select: 'name'
    //     });

     this.populate({
            path: 'task',
            select: 'taskName'
        });
    next()
})
commentSchema.pre(/^find/, function(next) {
    // this.populate({
    //         path: 'user',
    //         select: 'name photo'
    //     }).populate({
    //         path: 'tour',
    //         select: 'name'
    //     });

     this.populate({
            path: 'user',
            select: 'name email'
        });
    next()
})

commentSchema.statics.calcAverageRatings = async function(taskId){
    const stats = await this.aggregate([
        {
            $match:{task: taskId}
        },
        {
            $group:{
                _id: '$task',
                nRating: {$sum:1},
                avgRating: {$avg: '$rating'}
            }
        }
    ])
    // console.log(stats);
    if(stats.length > 0){
    await Project.findByIdAndUpdate(taskId, {
        ratingQuantity:stats[0].nRating,
        ratingsAverage:stats[0].avgRating
    });
}else {
    await Project.findByIdAndUpdate(taskId, {
        ratingQuantity:0,
        ratingsAverage:4.5
    });
}
};

commentSchema.post('save', function(){
    //this points to current review
    this.constructor.calcAverageRatings(this.task)
    
});




const comment = mongoose.model('coments', commentSchema);
module.exports = comment;