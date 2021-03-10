import React , {useState} from "react";
import { Card, Container } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles"
import Button from '@material-ui/core/Button';
import TextInput from "@material-ui/core/TextField"
const useStyles = makeStyles((theme) => ({
    container : {
        display : "flex",
        alignItems : 'center',
        justifyContent : "center",
        height : "100vh"
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
       fontSize : "18px",
       textAlign : "center"
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
        margin : "30px 0",
        minWidth : "100%"
    }
}))


const Login = () => {
    const [value, setValue] =useState(0);
    const [emailValue , setEmailValue] = useState("")
    const [passwordValue , setPasswordValue] = useState("")
    const [userNameValue , setUserNameValue] = useState("")
  const changeEmailValue = (e) => {
   const {value} = e.target;
   setEmailValue(value);
  }  
  const changePasswordValue = (e) => {
    const {value} = e.target;
    setPasswordValue(value);
   }
//    const changeUserNameValue = (e) => {
//     const {value} = e.target;
//     setUserNameValue(value);
//    }
  const classes = useStyles()  
  return (
      <Container className={classes.container}>
      <Card className={classes.card}>
        {/* <div className={classes.inputContainer}>
          <TextInput value={userNameValue} onChange={changeUserNameValue} variant="outlined" label="User Name"/>    
        </div>  */}
        <div className={classes.header}>Login To ParkInSpace</div>
        <div className={classes.inputContainer}>
          <TextInput value={emailValue} onChange={changeEmailValue} variant="outlined" label="Email"/>    
        </div>
        <div className={classes.inputContainer}>
          <TextInput value={passwordValue} type="password" onChange={changePasswordValue} variant="outlined" label="Password"/>    
        </div> 
        <Button className={classes.submitButton} variant="contained" color="primary">Login</Button>   
      </Card>
      </Container>
  )
}



export default Login