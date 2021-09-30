const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const User = require('../model/userSchema');
const router = express.Router();

// Register new User
router.post('/register', async (req, res) => {
       // 0. verify if is unique mail in the database
       const userFound = await User.findOne({username: req.body.username});
       if(userFound !== null)
       {
        return res.status(400).json({message: 'E-mail address is already used!'});
       }
       // 1. Hash the password 
       const salt = bcrypt.genSaltSync(10);
       const hash = bcrypt.hashSync(req.body.password, salt);
       // 2. save the hash in the password
       const userData = req.body; 
       userData.password = hash; 
    // 3. save in the mongodb database
    const createdUser = await User.create(userData);
    //4. send response
    res.json(createdUser);
});

// Login new User
router.post('/login', async (req, res) => {
    const connectedUser = await User.findOne({username: req.body.username});
    if(connectedUser ===null)
    {
       return res.status(404).json({message: 'username or password is invalid!'});
    }
    else{
        // 0. verify if the same password
        if (!bcrypt.compareSync(req.body.password, connectedUser.password)) {
            return res.status(404).json({message: 'username or password is invalid!'});
        } 
        else{
            // 1. create a jwt token
            const data = {
                username: connectedUser.username,
                userId: connectedUser._id
            };
            const createdToken = jwt.sign(data, process.env.SECRET_KEY, {expiresIn: "1d"});
            // 2. send response
            return res.status(201).json({message: 'login successfully!', token: createdToken});
        }
    }
});

module.exports = router;