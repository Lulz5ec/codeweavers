import React , {useState} from "react";
import {Link} from "react-router-dom";
import { Card, Container } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles"
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import TextInput from "@material-ui/core/TextField"
const useStyles = makeStyles((theme) => ({
    container : {
        display : "flex",
        alignItems : "center",
        justifyContent : "center",
        height : "100vh"
    },
    card : {
       width : 600, 
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
        margin : "30px 0"
    }
}))

const TabPanel = ({index , value}) => {
    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
       {/* {value === index ? `index ${index}` : ""} */}
      </div>
    )
}

const Register = () => {
    const [value, setValue] =useState(0);
    const [emailValue , setEmailValue] = useState("")
    const [passwordValue , setPasswordValue] = useState("")
    const [userNameValue , setUserNameValue] = useState("")
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
    }
  const changeEmailValue = (e) => {
   const {value} = e.target;
   setEmailValue(value);
  }  
  const changePasswordValue = (e) => {
    const {value} = e.target;
    setPasswordValue(value);
   }
   const changeUserNameValue = (e) => {
    const {value} = e.target;
    setUserNameValue(value);
   }
  const classes = useStyles()  
  return (
      <Container className={classes.container}>
      <Card className={classes.card}>
         <div className={classes.header}>Join ParkInSpace as a</div>
         <Tabs className={classes.tabContainer} value={value} onChange={handleChange} aria-label="simple tabs example" centered>
          <Tab label="Admin" {...a11yProps(0)} />
          <Tab label="Driver" {...a11yProps(1)} />
        </Tabs>
        <div className={classes.inputContainer}>
          <TextInput value={userNameValue} onChange={changeUserNameValue} variant="outlined" label="User Name"/>    
        </div> 
        <div className={classes.inputContainer}>
          <TextInput value={emailValue} onChange={changeEmailValue} variant="outlined" label="Email"/>    
        </div>
        <div className={classes.inputContainer}>
          <TextInput value={passwordValue} type="password" onChange={changePasswordValue} variant="outlined" label="Password"/>    
        </div> 
        <Button className={classes.submitButton} variant="contained" color="primary">Create Your Account</Button>   

        <div style = {{fontSize : "15px"}}>
         have an account? <Link to = "/login" style = {{fontSize : "17px", textDecoration : "None", color : "#0000A0"}}>Login&#8594;</Link>
        </div>
      </Card>
      </Container>
  )
}



export default Register