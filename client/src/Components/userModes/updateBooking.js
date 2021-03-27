import "date-fns";
import React,{useState,useContext} from "react";
import currentUserContext from "../../Context/useContext"

import axios from "axios"

import Button from '@material-ui/core/Button'
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import { makeStyles } from '@material-ui/core/styles'; 

const useStyles = makeStyles((theme) => ({
  root : {
    display : "flex",
    flexDirection: "column",
    alignItems : "center",
    justifycontent : "flex-start",
    [theme.breakpoints.down("sm")] : {
      width: "100%"
    }
  },
  head : {
    display : "flex",
    flexDirection : "column",
    margin: theme.spacing(1),
    marginBottom : theme.spacing(5),
    justifyContent : "start",
    alignItems : "center",
    [theme.breakpoints.down("sm")] : {
      width: "100%"
    }
  },
  name : {
    fontFamily: "emoji",
    fontWeight : "300",
    fontSize : 27,
    [theme.breakpoints.down("sm")] : {
      fontSize : 15
    }
  },
  submitButton  : {
    margin : 30,
    minWidth : 130
  }
}))


const UpdateBooking = (props) => {
  // The first commit of Material-UI
  const classes = useStyles()
  const {user,setUser,currentParking,setCurrentParking} = useContext(currentUserContext)
  const {changeSelectedMode} = props

  const [err,setErr] = useState("")
  const [availableParkingSlotId, setAvailableParkingSlotId] = useState("") 
  const [vehicleNumber,setVehicleNumber] = useState("");
  const [searchStatus, setSearchStatus] = useState(false)
  const [selectedTime, setSelectedTime] = React.useState(
    currentParking.exitdate
  );  

  const handleTimeChange = (time) => {
    const now = new Date()
    if(time < now) {
      alert(`Invalid Time. You can only leave after ${now}`)
      return
    }
    setSelectedTime(time);
    console.log(selectedTime);
  };


  const terminateBooking = async () => {

    try {
      let URL = 'http://localhost:5000/parkingSpace/terminateParking'
      const response = await axios.put(URL, {
        spaceid : user.spaceid,
        userid : user._id
      });

      const updatedUser = response.data.user
    //   console.log(response)
      setUser(updatedUser)
      setCurrentParking({})
      alert('Booking Terminated Updated!!')
      changeSelectedMode('Dashboard')
    } catch (error) {
      console.log(error)
    }
  }

  const handleBooking = async () => {

    try {
      let URL = 'http://localhost:5000/parkingSpace/updateParking'
      const response = await axios.put(URL, {
        spaceid : user.spaceid,
        exitdate : selectedTime
      });

      let parkingResponse
      if(user.spaceid) {
        URL = "http://localhost:5000/parkingSpace/isActiveParking"
          parkingResponse = await axios.get(URL, {
          params : {
            spaceid : user.spaceid
          }
        })
      }

      if(parkingResponse) {
        setCurrentParking(parkingResponse.data)
      }
      alert('Booking Successfully Updated!!')
      changeSelectedMode('Dashboard')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className = {classes.root}>
      <div className = {classes.head}>
        <div className = {classes.name}>
          UPDATE BOOKING
        </div>
      </div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="to hrs:min"
            value={selectedTime}
            onChange={handleTimeChange}
            KeyboardButtonProps={{
              "aria-label": "change time"
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>

      <Button className={classes.submitButton} variant="contained" color="primary" onClick = {handleBooking}>UPDATE PARKING</Button>   
      <Button className={classes.submitButton} variant="contained" color="primary" onClick = {terminateBooking}>TERMINATE PARKING</Button>   

    </div>
  );
}

export default UpdateBooking