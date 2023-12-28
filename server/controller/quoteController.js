const jwt = require('jsonwebtoken');
const quoteModel = require('../model/quotes');

const createQuote = async (req, res)=>{
    try {
        const {msg} = req.body;
        const token = req.headers['authorization'];
        const decodedToken = jwt.verify(token, 'your-secret-key');
        if(!decodedToken){
            return res.status(401).json({error: 'Unathorized'});
        };

        if(!msg){
            return res.status(400).json({error:"Message cannot be empty"});
        }

        const newQuote = await quoteModel.create({msg, user: decodedToken.user, userId: decodedToken.userId});
        return res.status(201).json({message: "Quote saved successfully", quote: newQuote});
    } catch (error) {
        console.log(error);
        if(error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError'){
            return res.status(401).json({error:"Invalid or expired token"});
        };
        return res.status(500).json({error:"Internal server error"})
    }
};

const allQuote = async (req, res)=>{
    try {
        const quotes = await quoteModel.find({});
        if(!quotes || quotes.length === 0){
            return res.status(404).json({message:"No quotes found"});
        }
        return res.status(200).json({quotes});

    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"Internal server error"})
    }
}

const myQuote = async (req, res)=>{
    try {
        const token = req.headers['authorization'];
        const decodedToken = jwt.verify(token, 'your-secret-key');
        if(!decodedToken){
            return res.status(401).json({error: 'Unathorized'});
        };
        const userId = decodedToken.userId;
        const quotes = await quoteModel.find({userId});
        if(!quotes || quotes.length === 0){
            return res.status(404).json({message:"No quotes found"});
        }
        return res.status(200).json({quotes});
    } catch (error) {
        console.log(error);
        if(error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError'){
            return res.status(401).json({error:"Invalid or expired token"});
        };
        return res.status(500).json({error:"Internal server error"})
    }
}

module.exports = {createQuote, allQuote, myQuote}