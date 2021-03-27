import react from "react";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import DriveEtaRoundedIcon from '@material-ui/icons/DriveEtaRounded';

const useStyles = makeStyles((theme) => ({
    container : {
        minHeight : "10vh",
        minWidth : "100%",
        backgroundColor : "#1976d2",
        display : "flex",
        justifyContent : "left",
        alignItems : "Center",
        [theme.breakpoints.down("sm")] : {
            minHeight : "7vh"
        }
    }, 
    parkingIcon : {
        fontSize : "45px",
        paddingLeft : "1.4rem",
        paddingRight : "0.9rem",
        [theme.breakpoints.down("sm")] : {
            fontSize : "30px",
            paddingLeft : "0.9rem",
            paddingRight : "0.7rem",
        }
    }, 
    heading : {
        fontSize : "35px",
        color : "#fff",
        fontWeight : "400",
        fontFamily : "ui-monospace",
        [theme.breakpoints.down("sm")] : {
            fontSize : "25px",
            fontWeight : 300
        }
    }
}))


const TopPageDesign = () => {
    const classes = useStyles()
    return (
        <Container className = {classes.container}>
            <DriveEtaRoundedIcon className = {classes.parkingIcon}/>
            <div className = {classes.heading}>
                ParkInSpace
            </div>
        </Container>
    )
}

export default TopPageDesign;