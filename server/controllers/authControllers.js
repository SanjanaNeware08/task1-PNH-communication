const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = async (req, res)=>{
    const {name, email, password, country} = req.body;
    try{
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({message: 'User already exists'});
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({name, email, password, hashedPassword, country});
        await user.save();

        res.status(201).json({message: 'User created successfully'});
    }catch(error){
        res.status(500).json({message:'signup failed'});
    }
};

exports.login = async (req, res)=>{
    const { email, password } = req.body;
    try{
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: 'invalid credentials'});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message: 'invalid credentials'});

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        res.json({token});
    }catch(error){
        res.status(500).json({message: 'login failed'});
    }
}