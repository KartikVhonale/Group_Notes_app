const userModel = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const isUser = await userModel.findOne({email});
        if(isUser){
            return res.status(409).json({error:"User already exists with that email"})
        };
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = {
            firstName,
            lastName,
            email,
            password:hashPassword
        };
        const dbUser = await userModel.create(newUser)
        return res.status(201).json(dbUser);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"Internal server error"})
    } 
};

const signing = async (req, res)=>{
    const {email, password} = req.body;
    try {
        const isUser = await userModel.findOne({email});
        // console.log(isUser)
        if(!isUser){
            return res.status(401).json({error: "User not found"});
        }
        const isPasswordCorrect = await bcrypt.compare(password, isUser.password)
        if(!isPasswordCorrect){
            return res.status(401).json({error: "Incorrect email or password"});
        };
        const currentUser = isUser.firstName + " " + isUser.lastName;
        const jwtKey = 'your-secret-key'
        const jwtToken = jwt.sign({user: currentUser, userId: isUser._id}, jwtKey, {expiresIn: '1h'});
        return res.status(200).json({status: "SUCESS", jwtToken})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Internal server error"});
    }
}



module.exports = { signup,signing }