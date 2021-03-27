const express = require('express');
const validator = require('validator');

const router = express.Router();
const ParkingSpace = require('../models/parkingSpace.js');
const User = require('../models/user.js');

router.get('/getAll', async (req,res) => {
    // res.send("Register Screen for Parking space to Admin only!")
    try {
        await ParkingSpace.find({}, async (err, parkingSpaces) => {
            if(err) {
                throw new Error('failed to load data and to send')
            } else {
                res.status(200).json({parkingspaces : parkingSpaces})
            }
        })
    } catch {
        if(error.message) {
            res.status(200).json({error : error.message});
        } else {
            res.status(400).json(error);
        }
    }
})

router.get('/getOne', async (req,res) => {
    spaceid = req.query.spaceid ;
    try {
        await ParkingSpace.find({spaceid: spaceid}, async (err, space) => {
            if(err) {
                throw new Error('failed to load data and to send for specific spaceid')
            } else {
                res.json({space})
            }
        })
    } catch {
        if(error.message) {
            res.status(200).json({code : code, error : error.message});
        } else {
            res.status(400).json(error);
        }
    }
})

router.get('/find', async (req,res) => {
    try {
        const space = await ParkingSpace.findOne({status : false}).exec()
        if(!space) {
            res.status(200).json({error : "no parking spaces are currently available"})
        }
        res.status(200).json({space})
    } catch(error) {
        res.status(400).json({error : error.message})
    }
})

router.get('/isActiveParking' , async (req,res) => {
    try {
        const spaceid = req.query.spaceid 
        const parkingSpace = await ParkingSpace.findOne({spaceid : spaceid}).exec()
        if(parkingSpace.exitdate < new Date()) {
            res.status(200).json({status : "expired", vehiclenumber : parkingSpace.vehiclenumber})
        } 
        res.status(200).json({status : "active", vehiclenumber : parkingSpace.vehiclenumber , exitdate : parkingSpace.exitdate})
    } catch (error) {
        res.status(400).json({error : error.message})
    }
})

router.put('/confirmParking', async (req,res) => {
    const {spaceid, userid, exitdate, entrydate, vehiclenumber} = req.body
    let code;
    try {
        if(validator.isEmpty(spaceid)) {
            code = 0
            throw new Error('Space ID feild is mandatory')
        }

        if(validator.isEmpty(vehiclenumber)) {
            code = 4
            throw new Error('vechical Number feild is mandatory')
        }

        const parkingSpace = await ParkingSpace.findOne({spaceid : spaceid}).exec()
        if(parkingSpace.status && parkingSpace.userid != userid) {
            throw new Error('This parking spot has been taken!!')
        }
        
        //I don't know how to check validations for car license plate

        await ParkingSpace.findOneAndUpdate(
            { spaceid: spaceid }, 
            {   status: true, 
                userid : userid, 
                exitdate : exitdate, 
                entrydate : entrydate, 
                vehiclenumber : vehiclenumber }, 
            { new : true }
        );

        const updatedUser = await User.findOneAndUpdate(
            {_id : userid},
            {spaceid : spaceid},
            {new : true}
        )

        res.status(200).json({user : updatedUser});
    } catch (error) {
       if(error.message) {
           res.status(200).send({code : code, error : error.message});
       } else {
           res.status(400).send(error);
       }
    }
})

router.put('/updateParking', async (req,res) => {
    const {spaceid, exitdate} = req.body
    try {
        const updatedParkingSpace = await ParkingSpace.findOneAndUpdate({spaceid : spaceid}, {
            exitdate : exitdate
        },{new  : true});
        res.status(200)
    } catch (error) {
        res.send(400).json({error: error.message})
    }
})

router.put('/terminateParking', async (req,res) => {
    const {spaceid, userid} = req.body
    try {
        const cancelledParkingSpace = await ParkingSpace.findOneAndUpdate({spaceid : spaceid}, {
            status : false,
            userid : null,
            entrydate : null,
            exitdate : null,
            vehiclenumber : null
        }, {new  : true});

        const updatedUser = await User.findOneAndUpdate({_id : userid}, {
            spaceid : null
        }, {new  : true})

        // console.log(updatedUser)

        res.status(200).json({user : updatedUser})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

module.exports = router;