import React , {useContext, useState} from "react";
import {Link} from "react-router-dom"
import { Card, Container } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles"
import Button from '@material-ui/core/Button';
import TextInput from "@material-ui/core/TextField"

import {useHistory} from "react-router-dom";
import axios from 'axios';
import currentUserContext from '../Context/useContext'

const useStyles = makeStyles((theme) => ({
    container : {
        minHeight : "100vh",
        display : "flex",
        alignItems : "center",
        justifyContent : "center"
    },
    card : {
       width : 300, 
       padding : "30px",
       display : "flex",
       alignItems : "center",
       flexDirection : "column"
    },
    header : {
       fontWeight : "bold",
       color : "#0846B0",
       fontSize : "25px",
       textAlign : "center",
       fontFamily : "emoji"
    },
    tabContainer : {
       margin : "20px 0px"  
    },
    inputContainer : {
        marginTop : "20px",
        width : "100%",
        "& > div" : {
            width : "100%"   
        }
    },
    submitButton  : {
        margin : 30,
        minWidth : "100%"
    }
}))


const Login = () => {
  const {user,setUser,currentParking, setCurrentParking} = useContext(currentUserContext)
  const [value, setValue] = useState(0)
  const [err, seterr] = useState({})
  const [userNameValue , setUserNameValue] = useState("")
  const [passwordValue , setPasswordValue] = useState("")
  const history = useHistory();


  const changeUserNameValue = (e) => {
   const {value} = e.target;
   setUserNameValue(value);
  }  
  
  const changePasswordValue = (e) => {
    const {value} = e.target;
    setPasswordValue(value);
  }

  const handleError = (newerr) => {
    seterr(newerr);
  }

  const setNewUser = (newUser) => {
    setUser(newUser);
  } 

  const handleClick = async (e) => {
    handleError({})
    let url = "http://localhost:5000/login"
    try {
      const response = await axios.post(url, {
        username : userNameValue,
        password : passwordValue,
      })
      const {user} = response.data;

      if(user) {
        setNewUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        let parkingResponse

        if(user.spaceid) {
            url = "http://localhost:5000/parkingSpace/isActiveParking"
            parkingResponse = await axios.get(url, {
              params : {
                spaceid : user.spaceid
              }
            })
            setCurrentParking(parkingResponse.data)
        }

        history.push('/Profile')
      } else {
        handleError(response.data);
      }
    } catch (error) {
      console.log(error);
    }
}

  const classes = useStyles()  
  return (
      <Container className={classes.container}>
      <Card className={classes.card}>
        <div className={classes.header}>Login To ParkInSpace</div>
        <div className={classes.inputContainer}>
          <TextInput required id="standard-required" value={userNameValue} onChange={changeUserNameValue} variant="outlined" label="User Name" helperText={err.code === 0 ? err.error : ""}/>    
        </div> 
        <div className={classes.inputContainer}>
          <TextInput required id="standard-required" value={passwordValue} type="password" onChange={changePasswordValue} variant="outlined" label="Password" helperText={err.code === 1 ? err.error : ""}/>    
        </div> 
        <Button className={classes.submitButton} variant="contained" color="primary" onClick = {handleClick}>Login</Button>   

        <div style = {{fontSize : "15px"}}>
          Don't have an account? <Link to = "/register" style = {{fontSize : "17px", textDecoration : "None", color : "#0000A0"}}>Register&#8594;</Link>
        </div>
      </Card>
      </Container>
  )
}



export default Login