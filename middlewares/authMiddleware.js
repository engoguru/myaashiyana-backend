const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const userModel = require('../models/userModel');

const authMiddleware = asyncHandler(async(req, res, next) => {
    let token;
    if(req?.headers?.authorization?.startsWith('Bearer')){
        token = req.headers.authorization.split(" ")[1];
        try {
            if(token){
                const decode = jwt.verify(token, process.env.JWT_SECRET);
                const user = await userModel.findById(decode?.id)
                req.user = user;
                next();
            }
        } catch (error) {
            throw new Error('Token Expires Please Login Again');
        }
    }else{
        throw new Error('There is no token in header');
    }
})

module.exports = {authMiddleware};