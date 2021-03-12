const express = require('express');
const validator = require('validator');

const router = express.Router();

const User = require('../models/user.js')

router.get('/', (req,res) => {
    res.send("login Screen!")
})

router.post('/', async (req,res) => {
    const {username,password} = req.body
    let code;
    try {
        if(validator.isEmpty(username)) {
            code = 0;
            throw new Error('User Name feild is mandatory')
        }

        if(validator.isEmpty(password)) {
            code = 1;
            throw new Error('Name feild is mandatory')
        }
        
        const user = await User.findOne({ username : username}).exec()
        if(!user) {
            code = 0;
            throw new Error('The Username is not identified')
        }

        if(user.password !== password) {
            code = 1;
            throw new Error('Your password is wrong')
        }
        
        res.status(200).send(user);
    } catch (error) {
        if(error.message) {
            res.status(200).send({code : code, error : error.message});
        } else {
            res.status(400).send(error);
        }
    }
})

module.exports = router;