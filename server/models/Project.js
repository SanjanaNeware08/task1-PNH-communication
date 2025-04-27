const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    title: {type: String, required: true},
    tasks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}],
});

module.exports = mongoose.model('Project', ProjectSchema);