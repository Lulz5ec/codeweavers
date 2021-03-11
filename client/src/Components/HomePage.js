import react from "react";
import {Link} from "react-router-dom";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import img from "../images/IIITA_CC3_FRONT_RIGHT.jfif";
import carimg from "../images/CarShare.jpg";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    Container : {
        height : "80vh",
        minWidth  : "100%",
        backgroundColor: "#fff",
        backgroundImage : `url(${img})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        paddingLeft : "25%",
        paddingRight : "10%"
    },
    root: {
        maxWidth: 345,
        transition: "all .1s ease-in-out",
        "&:hover" : {
            boxShadow: "inset -.1rem -.15rem 0 .1rem rgba(0,0,0,.2)",
            transform: "translateY(-.1rem) scale(1.02)"
        }    
    },
    media: {
        height: 140,
    }, 
    btnContainer : {
        width : "30%",
        display : "flex",
        flexDirection : "column",
        justifyContent : "space-between",
        alignItems : "left"
    },
    Button : {
        marginBottom : 20,
        borderRadius : "5px",
        transition: "all .1s ease-in-out",
        backgroundColor : "#2B65EC",
        minWidth : "150px",
        "&:hover" : {
            backgroundColor : "#306EFF",
            boxShadow: "inset -.1rem -.15rem 0 .1rem rgba(0,0,0,.2)",
            transform: "translateY(-.1rem) scale(1.02)"
        }
    }, 
    toLink : {
        textDecoration : "None", 
        fontSize : "15px",
        color : "#fff",
        fontWeight : "800",
        fontFamily : "emoji",
        width : "100%",
        height : "100%",
        textAlign : "center"
    }
}))

const HomePage = () => {
    const classes = useStyles();
    return (
        <Container className = {classes.Container}>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image = {carimg}
                    title="Contemplative Reptile"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        ParkInSpace
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        “ParkInSpace” is a web application that provides automated parking assistance in 
                        the parking space near CC3 building, IIIT ALLAHABAD. 
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        Learn More
                    </Button>
                </CardActions>
            </Card>
            <Container className = {classes.btnContainer}>
                    <Button variant="contained" className = {classes.Button}>
                        <Link to = "/register" className = {classes.toLink}> Register </Link>
                    </Button>

                    <Button variant="contained" className = {classes.Button}>
                        <Link to = "/login" className = {classes.toLink}> Login </Link>
                    </Button>

                    <Button variant="contained" className = {classes.Button}>
                        <Link to = "/" className = {classes.toLink}> View Parking Space </Link>
                    </Button>
            </Container>
        </Container>
    )
}

export default HomePage;