const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    country: {type: String, required: true},
    projects: [{type: mongoose.Schema.Types.ObjectId, ref: 'Project'}],
});

module.exports = mongoose.model('User', UserSchema);