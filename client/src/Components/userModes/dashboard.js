import react, {useContext} from 'react'
import { makeStyles } from '@material-ui/core/styles';
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
        width: theme.spacing(10),
        height: theme.spacing(10),
        color: '#fff',
        backgroundColor: blueGrey[500],
        marginBottom : 5
    }, name : {
        fontFamily: "emoji",
        fontWeight : "300",
        fontSize : "30px"
    }
}));

const Dashboard = () => {
    const classes = useStyles()
    const {user} = useContext(currentUserContext);

    return (
        <div className = {classes.root} >
            <div className = {classes.head}>
                <Avatar className = {classes.icon}>
                    <ProfileIcon style = {{fontSize : "80px"}}/>
                </Avatar>
                <div className = {classes.name}>
                    {user.name}
                </div>
            </div>
        </div>
    )
}

export default Dashboard