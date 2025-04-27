const project = require('../models/Project');
const User = require('../models/User');

exports.createProject = async (req, res) => {
    const {title} = req.body;
    try{
        const user = await User.findById(req.user.id).populate('projects');
        if(user.projects.length >= 4){
            return res.status(400).json({message: 'only 4 projects allowed'});
        }

        const project = new Project({user: req.user.id, title});
        await project.save();

        user.projects.push(project._id);
        await user.save();

        res.status(201).json({message: 'Project created successfully', project});
    }catch(error){
        res.status(500).json({message: 'Project creation failed'});
    }
};