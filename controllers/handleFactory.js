
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')


exports.getAll = Model => catchAsync(async (req,res,next)=>{
    

        //EXECUTE QUERY
       
        const doc = await Model.find();


        //SEND RESPONSE
    res.status(200).json({
        status: 'success',
        result: doc.length,
        data: {
            data:doc
        }
    })
    
});

exports.getOne = (Model,popOptions) =>catchAsync( async (req,res,next)=>{
    let query =Model.findById(req.params.id)
    if(popOptions) query = query.populate(popOptions);
    const doc = await query;
        if(!doc){
        return next(new AppError('No document found with that ID', 404))
    }

    res.status(200).json({
        status: 'success',
        data: {
            data:doc
        }
    })
    
})


exports.createOne = Model => catchAsync(async (req,res,next)=>{
    //using the Tour model directly
     const doc = await Model.create(req.body);


     res.status(201).json({
            status: 'success',
            data: {
                data: doc
            }
        })
  
});



exports.deleteOne = Model => catchAsync( async (req,res,next)=>{

        // await Tour.deleteOne({_id:req.params.id})
       const doc= await Model.findByIdAndDelete(req.params.id)
      if(!doc){
        return next(new AppError('No document found with that ID', 404))
    }

        res.status(204).json({
        status: 'success',
        data: null
    })
   
    
});


exports.updateOne = Model => catchAsync(async (req,res,next)=>{
        // const tour = await Tour.updateMany({_id:req.params.id}, {$set:req.body})
        const doc = await Model.findByIdAndUpdate(req.params.id,req.body, {
            new: true,
            runValidators: true
        })
          if(!doc){
        return next(new AppError('No document found with that ID', 404))
    }

        res.status(200).json({
        status: 'success',
        data: {
            data:doc
        }
    })
   
    
})


exports.getTodo = Model =>catchAsync(async (req,res,next)=>{
const now = new Date();

// toISOString() gives you "2025-09-05T22:46:34.734Z"
const iso = now.toISOString();

// replace trailing Z with +00:00
const formatted = iso.replace("Z", "+00:00");


    const teamId = req.params.id
     const task = await Model.find({
      team:teamId,
      startDate:{$gt:formatted} 
    });

    if(!task) {
         return res.status(404).json({ message: "Task not found" });
    }

    res.status(201).json({
        status:"success",
        title:"list of projects that you are yet to do",
        result: task.length,
        data:task
    })
});


exports.getInProgress = Model =>catchAsync(async (req,res,next)=>{
const now = new Date();

// toISOString() gives you "2025-09-05T22:46:34.734Z"
const iso = now.toISOString();

// replace trailing Z with +00:00
const formatted = iso.replace("Z", "+00:00");


    const teamId = req.params.id
     const task = await Model.find({
      team:teamId,
      startDate:{$lt:formatted},
       endDate:{$gte:formatted}
    });

    if(!task) {
         return res.status(404).json({ message: "Task not found" });
    }

    res.status(201).json({
        status:"success",
        title:"list of projects that you are yet to finish",
        result: task.length,
        data:task
    })
})


exports.getDone = Model =>catchAsync(async (req,res,next)=>{
const now = new Date();

// toISOString() gives you "2025-09-05T22:46:34.734Z"
const iso = now.toISOString();

// replace trailing Z with +00:00
const formatted = iso.replace("Z", "+00:00");


    const teamId = req.params.id
     const task = await Model.find({
      team:teamId,
       endDate:{$lt:formatted}
    });

    if(!task) {
         return res.status(404).json({ message: "Task not found" });
    }

    res.status(201).json({
        status:"success",
        title:"list of projects that you have finished",
        result: task.length,
        data:task
    })
})