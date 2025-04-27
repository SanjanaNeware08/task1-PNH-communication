const Task = require('../models/Task');
const Project = require('../models/Project');

exports.createTask = async(requestAnimationFrame, res)=>{
    const {title, description} = req.body;
    const {projectId} = req.params;

    try{
        const project = await Project.findById(projectId);
        if(!project) return res.status(404).json({message: 'Project not found'});

        const task = new Task({project: projectId, title, description});
        await task.save();

        project.tasks.push(task._id);
        await project.save();

        res.status
    }catch(error){
        res.status(500).json({message: 'Task creation failed'});
    }
};

exports.updateTask = async (req, res) =>{
    const {title, description, status} = req.body;
    const{taskId} = req.params;

    try{
        const task = await Task.findByIdAndUpdate(taskId, {title, description, status, completedAt: status==='completed'? Date.now()
            :null},{new:true});

        res.json(task);
    }catch(error){
        res.status(500).json({message: 'Task update failed'});
    }
};

exports.deleteTask = async (req, res) =>{
    const {taskId} = req.params;

    try{
        await Task.findByIdAndDelete(taskId);
        res.json({message: 'Task deleted successfully'});
    }catch(error){
        res.status(500).json({message: 'Task deletion failed'});
    }
};

exports.getTask = async (req, res) =>{
    const {taskId} = req.params;
    try{
        const task = await Task.findById(taskId);
        if(!task) return res.status(404).json({message: 'Task not found'});

        res.json(task);
    }catch(error){
        res.status(500).json({message: 'Task retrieval failed'});
    }
};