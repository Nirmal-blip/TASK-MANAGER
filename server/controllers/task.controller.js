
import Task from "../models/task.model.js";

export const createTask = async(req,res)=>{

    const {title,description,status} = req.body;
   
    const task = await Task.create({
     title,
     description,
     status,
     user:req.user._id
    });
   
    res.status(201).json(task);
   
   };



   //for pagination(searching)
   
   export const getTasks = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
   
    const keyword = req.query.search
     ? { title: { $regex: req.query.search, $options: "i" } }
     : {};
   
    const status = req.query.status
     ? { status: req.query.status }
     : {};
   
    const filter = {
     user: req.user._id,
     ...keyword,
     ...status
    };
   
    const tasks = await Task.find(filter)
     .limit(limit)
     .skip(skip)
     .sort({ createdAt: -1 });
   
    const totalTasks = await Task.countDocuments(filter);
   
    res.json({
     tasks,
     page,
     totalPages: Math.ceil(totalTasks / limit),
     totalTasks
    });
   
   };

   //for updating task
   export const updateTask = async (req, res) => {

    const task = await Task.findById(req.params.id);
   
    if(!task){
     return res.status(404).json({message:"Task not found"});
    }
   
    if(task.user.toString() !== req.user._id.toString()){
     return res.status(401).json({message:"Not authorized"});
    }
   
    const updatedTask = await Task.findByIdAndUpdate(
     req.params.id,
     req.body,
     {new:true}
    );
   
    res.json(updatedTask);
   
   };


   //for deleting

   export const deleteTask = async (req,res)=>{

    const task = await Task.findById(req.params.id);
   
    if(!task){
     return res.status(404).json({message:"Task not found"});
    }
   
    if(task.user.toString() !== req.user._id.toString()){
     return res.status(401).json({message:"Not authorized"});
    }
   
    await task.deleteOne();
   
    res.json({message:"Task removed"});
   
   };