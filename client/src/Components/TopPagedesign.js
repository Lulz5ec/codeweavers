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
        alignItems : "Center"
    }, 
    parkingIcon : {
        fontSize : "45px",
        paddingLeft : "1.4rem",
        paddingRight : "0.9rem"
    }, 
    heading : {
        fontSize : "35px",
        color : "#fff",
        fontWeight : "400",
        fontFamily : "ui-monospace"
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