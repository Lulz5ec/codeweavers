const express = require('express');
const validator = require('validator');
const router = express.Router();

const ParkingSpace = require('../models/parkingSpace.js');

router.post('/', async (req, res) => {

    const { row, column} = req.body
    let code
    console.log('haha',row,column)
    try {
        if(validator.isEmpty(row) || row < 1) {
            code = 0
            throw new Error('row feild is mandatory and should be greate than 0')
        }

        if(validator.isEmpty(column) || column < 1) {
            code = 1
            throw new Error('column feild is mandatory and should be greate than 0')
        }

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
                    spaceid : temp,
                    status : false
                });

                await tempparkingspace.save();
            }
        }

        res.status(200).send('success');
    } catch (error) {
        if(error.message) {
            res.status(200).send({code : code, error : error.message});
        } else {
            res.status(400).send(error);
        }
    }

})

module.exports = router;