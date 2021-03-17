import "date-fns";
import React,{useState,useContext} from "react";
import currentUserContext from "../../Context/useContext"

import axios from "axios"

import Button from '@material-ui/core/Button'
import TextInput from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid";
import Chip from '@material-ui/core/Chip';
import MuiAlert from '@material-ui/lab/Alert';
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { makeStyles } from '@material-ui/core/styles'; 

const useStyles = makeStyles((theme) => ({
  root : {
    display : "flex",
    flexDirection: "column",
    alignItems : "center",
    justifycontent : "flex-start"
  },
  head : {
    display : "flex",
    flexDirection : "column",
    margin: theme.spacing(1),
    marginBottom : theme.spacing(5),
    justifyContent : "start",
    alignItems : "center"
  },
  name : {
    fontFamily: "emoji",
    fontWeight : "300",
    fontSize : 27
  },
  submitButton  : {
    margin : 30,
  },
  bookingPanel: {
    width : "50%",
    display : "flex",
    flexDirection : "column",
    alignItems : "center",
    "& > *" : {
      padding : "6px 16px"
    }
  },
  inputContainer : {
    marginTop : 20,
    width : "100%",
    "& > *" : {
        width : "100%",
        marginBottom : 40
    }
  }
}))

function Alert(props) {
  return <MuiAlert elevation={1} variant="filled" {...props} />;
}


const Booking = (props) => {
  // The first commit of Material-UI
  const classes = useStyles()
  const {user,setUser,currentParking,setCurrentParking} = useContext(currentUserContext)
  const {changeSelectedMode} = props

  const [err,setErr] = useState("")
  const [availableParkingSlotId, setAvailableParkingSlotId] = useState("") 
  const [vehicleNumber,setVehicleNumber] = useState("");
  const [searchStatus, setSearchStatus] = useState(false)
  const [selectedTime1, setSelectedTime1] = React.useState(
    new Date()
  );  
  
  const handleTime1Change = (time) => {
    setSelectedTime1(time);
    console.log(selectedTime1);
  };

  const [selectedTime2, setSelectedTime2] = React.useState(
    new Date()
  );
  
  const handleTime2Change = (time) => {
    if(time < selectedTime1) {
      alert(`Invalid Time. You can only leave after ${selectedTime1}`)
      return
    }
    setSelectedTime2(time);
    console.log(selectedTime2);
  };

  const handleSlotId = async () => {
    // setAvailableParkingSlotId(slotId)
    try {
      const URL = 'http://localhost:5000/parkingSpace/find'
      const response = await axios.get(URL)
      const {space} = response.data 
      console.log(space)
      setAvailableParkingSlotId(space.spaceid)
      setSearchStatus(true)
    } catch (error) {
      console.log(error)
    }
  }

  const changeVehicleNumber = (e) => {
    const {value} = e.target
    setVehicleNumber(value)
  }

  const handleBooking = async () => {
    if(vehicleNumber.length === 0) {
      setErr('Vehicle Number field is mandatory.')
      return;
    }

    try {
      let URL = 'http://localhost:5000/parkingSpace/confirmParking'
      const response = await axios.put(URL, {
        spaceid : availableParkingSlotId,
        userid : user._id,
        entrydate : selectedTime1,
        exitdate : selectedTime2,
        vehiclenumber : vehicleNumber
      }) 
      const updatedUser = response.data.user;

      if(!updatedUser) {
        alert(response.data.error)
        return;
      }

      let parkingResponse
      if(updatedUser.spaceid) {
        URL = "http://localhost:5000/parkingSpace/isActiveParking"
          parkingResponse = await axios.get(URL, {
          params : {
            spaceid : updatedUser.spaceid
          }
        })
      }

      setUser(updatedUser);
      localStorage.setItem('user',JSON.stringify(updatedUser))
      if(parkingResponse) {
        setCurrentParking(parkingResponse.data)
      }
      alert('Booking Successful!!')
      changeSelectedMode('Dashboard')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className = {classes.root}>
      <div className = {classes.head}>
        <div className = {classes.name}>
          BOOK A PARKING SPOT
        </div>
      </div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
        <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Date"
            value={new Date()}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            disabled = "true"
          />
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="from hrs:min"
            minDateMessage = {new Date()}
            onChange={handleTime1Change}
            KeyboardButtonProps={{
              "aria-label": "change time"
            }}
            disabled = "true"
          />
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="to hrs:min"
            value={selectedTime2}
            onChange={handleTime2Change}
            KeyboardButtonProps={{
              "aria-label": "change time"
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>

      <Button className={classes.submitButton} variant="contained" color="primary" onClick = {handleSlotId}>Find Available Parking Spots</Button>   
      
      {
        searchStatus ? 
          availableParkingSlotId.length ?
          <div className = {classes.bookingPanel}>
            <div className={classes.inputContainer}>
              <TextInput required id="standard-required" value={vehicleNumber} onChange={changeVehicleNumber} variant="outlined" label="Vehicle Number" helperText = {err}/>    
              {/* <Alert style = {{width : "100%"}} severity="info">Assigned Parking Id = "{availableParkingSlotId}", press Confirm Button to Confirm Booking.</Alert>         */}
              <Chip label = {"Assigned Parking Id = '" + availableParkingSlotId + "', press Confirm Button to Confirm Booking"} style = {{fontSize : "14px"}} />
            </div>
            <Button className={classes.submitButton} variant="contained" color="primary" onClick = {handleBooking}>Confirm Booking</Button>   
          </div>
          :
          <></>
        : 
        <></>
      }

    </div>
  );
}

export default Booking