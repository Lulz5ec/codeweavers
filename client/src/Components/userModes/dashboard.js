import react, {useContext,useHistory} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import {blueGrey} from '@material-ui/core/colors';
import ProfileIcon from '@material-ui/icons/AccountCircle';

import currentUserContext from '../../Context/useContext';

const useStyles = makeStyles((theme) => ({
    root : {
        backgroundColor : "#fff",
        minHeight : "80vh",
        margin: 0,
        padding : 0 
    },
    head : {
        display : "flex",
        flexDirection : "column",
        margin: theme.spacing(1),
        justifyContent : "start",
        alignItems : "center"
    },
    icon: {
        width: theme.spacing(14),
        height: theme.spacing(14),
        color: '#fff',
        backgroundColor: blueGrey[500],
        marginBottom : 20
    }, name : {
        fontFamily: "emoji",
        fontWeight : "300",
        fontSize : 27
    }, driverBody : {
        display : "flex",
        flexWrap : "wrap",
        justifyContent : "center",
        alignItems : "center",
        width : "100%",
        marginTop : 150
    }, card: {
        width : 300,
        padding : 20,
    }, cardHeader : {
        marginBottom: 16
    },
    pos: {
        marginBottom: 12
    }
}));

const Dashboard = () => {
    const classes = useStyles()
    const {user,currentParking,timeRemaining} = useContext(currentUserContext);

    return (
        <div className = {classes.root} >
            <div className = {classes.head}>
                <Avatar className = {classes.icon}>
                    <ProfileIcon style = {{fontSize : "120px"}}/>
                </Avatar>
                <div className = {classes.name}>
                    {user.name ? user.name.toUpperCase() : ""}
                </div>
            </div>
            
            
            <div className = {classes.driverBody}> 
                <Card className={classes.card} variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="h3" color="textPrimary" className = {classes.cardHeader}>
                            Your Parking
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            Parking SpaceId : {user.spaceid ? user.spaceid : "N.R"}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            vehicle Number : {currentParking.vehiclenumber ? currentParking.vehiclenumber : "N.R"}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            Parking Status : {currentParking.status ? currentParking.status : "N.R"}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            Time remaining : {user.spaceid ? (timeRemaining ? timeRemaining : "00:00:00") : "N.R"}
                        </Typography>
                    </CardContent>
                </Card>
            </div> 
        </div>
    )
}

export default Dashboard