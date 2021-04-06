const express = require('express');
const validator = require('validator');
const router = express.Router();

const ParkingSpace = require('../models/parkingSpace.js');
const User = require('../models/user.js')

router.post('/', async (req, res) => {

    const { userID,row, column} = req.body
    let code,users=[]
    
    try {
        if(validator.isEmpty(row) || row < 1) {
            code = 0
            throw new Error('row feild is mandatory and should be greate than 0')
        }

        if(validator.isEmpty(column) || column < 1) {
            code = 1
            throw new Error('column feild is mandatory and should be greate than 0')
        }

        
        await User.find()
        .then((users) => {
            users.forEach(user => {
                user.spaceid = null;
                console.log("dele");
                user.save();
            })
        })

        ParkingSpace.deleteMany({}).then(function(){ 
            console.log("Data deleted") 
            // Success 
        }).catch(function(error){
            throw new Error('error while deleting data') 
            // Failure 
        });

        for(var i=1; i<=row; i++){
            for(var j=1; j<=column; j++){
                var temp = 'space_' + i + '_' + j ;
                const tempparkingspace = new ParkingSpace({
                    spaceid : temp
                });

                await tempparkingspace.save();
            }
        }

        try {
            const newUser = await User.findOne({_id: userID}).exec();
            if(newUser) res.status(200).json({user: newUser});
            throw new Error('user not found');
        } catch (error) {
            res.status(400).json({error : error.message});
        }
    } catch (error) {
        if(error.message) {
            res.status(200).send({code : code, error : error.message});
        } else {
            res.status(400).send(error);
        }
    }

})

module.exports = router;