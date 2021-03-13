const express = require('express');
const validator = require('validator');

const router = express.Router();
const User = require('../models/user.js');

router.get('/findUserById', async (req,res) => {
    const _id = req.query.id;
    try {
        const user = await User.findOne({_id: _id}).exec();
        if(user) res.status(200).json({user});
        throw new Error('user not found');
    } catch (error) {
        res.status(400).json({error : error.message});
    }
})

module.exports = router;
