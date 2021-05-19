import React,{useContext, useEffect, useState} from 'react';
import currentUserContext from "../../Context/useContext"

import { makeStyles } from '@material-ui/core/styles';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import axios from 'axios';
import { Typography } from '@material-ui/core';
import { getHours } from 'date-fns';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import ErrorPanel from '../errorPanel.js'

const useStyles = makeStyles((theme) => ({
    body : {
        display : "flex",
        flexDirection: "column",
        alignItems : "center",
        justifyContent : "flex-start",
        paddingTop : "40px",
        [theme.breakpoints.down("sm")] : {
            paddingTop : "20px",
            width: "90%",
            margin : "auto"
        }
    },
    head : {
        display : "flex",
        flexDirection : "column",
        margin: theme.spacing(1),
        marginBottom : theme.spacing(2),
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
    container : {
        display : "flex",
        flexWrap : "wrap",
        flexDirection : "column",
        alignItems : "center",
        justifyContent : "center",
        width : "100%",
        marginTop : "20px",
    },
    tabContainer : {
        margin : "20px 0px"  
    },
    table : {
        textAlign : "center",
        border : "1px solid black",
        width : "50%",
        marginTop : 20,
        marginBottom : 20,
        [theme.breakpoints.down("sm")] : {
            width : "100%",
            fontSize : 10
        }
    }, tableHead : {
        backgroundColor : "black",
        color : "#fff"
    }, tableRow : {
        height : "40px",
        fontSize : 15,
        margin : 3,
        [theme.breakpoints.down("sm")] : {
            fontSize : 8
        }
    },root: {
        flexGrow: 1,
        marginTop : 20,
        minWidth : "20%",
        minHeight : 400,
        [theme.breakpoints.down("xs")] : {
            minWidth : "80%",
        }
    },
    paperFilled: {
        padding: theme.spacing(1),
        textAlign: 'left',
        color: "#fff",
        background : "linear-gradient(45deg, #2196F3 20%, #21CBF3 70%)",
    },
    paperAlloted : {
        padding: theme.spacing(1),
        textAlign: 'left',
        color: "#fff",
        background: "linear-gradient(45deg, #c2e59c 40%, #7CFC00 60%)"
    },
    paperEmpty: {
        padding: theme.spacing(1),
        textAlign: 'left',
        color: "#fff",
        background : "linear-gradient(45deg, #ff7961 20%, #ba000d 70%)",
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
    // cardHead : {
    //     paddingLeft : 20,
    //     fontSize : 15,
    //     fontWeight : 400,
    //     textTransform : "uppercase",
    //     [theme.breakpoints.down("xs")] : {
    //         paddingLeft : 10,
    //         fontSize : 12,
    //         fontWeight : 300,
    //     }
    // },
    // cardBody : {
    //     paddingLeft : 20,
    //     paddingTop : 10,
    //     [theme.breakpoints.down("xs")] : {
    //         paddingLeft : 8,
    //     }
    // }, 
    // cardInfo : {
    //     fontSize : 12,
    //     fontWeight : 300,
    //     [theme.breakpoints.down("xs")] : {
    //         fontSize : 8,
    //         fontWeight : 200
    //     }
    // }
    
}));

const ViewParkingSpace = () => {
    const classes = useStyles();
    const [parkingSpaces, setParkingSpaces] = useState(null)
    const [value, setValue] = useState(0)
    const {user} = useContext(currentUserContext)

    const [open, setOpen] = useState(true)

    useEffect (() => {
        setOpen(true)
        const getAllSPaces = async () => { 
            try {
            let url = "http://localhost:5000/parkingSpace/getAll"
            const response = await axios.get(url);
            if(response) {
                setOpen(false)
                setParkingSpaces(Object.values(response.data.parkingspaces))
            }
        } catch (error) {
            setOpen(false)
            console.log(error)
        }}

        getAllSPaces()
    },[])

    function a11yProps(index) {
        return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const getDimensions = () => {
        if(parkingSpaces.length === 0) 
            return {}

        const lastId = parkingSpaces[parkingSpaces.length - 1].spaceid.split('_');
        return {rows : parseInt(lastId[1]), columns : parseInt(lastId[2])}
        
    }

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

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    let dimensions = {}
    if(parkingSpaces && parkingSpaces.length) {
        dimensions = getDimensions()
        console.log(dimensions)
    }

    const getHourString = (date) => {
        var hour = date.getHours()
        if(hour<10) {
            return `0${hour}`
        }
        return `${hour}`
    }

    const getMinuteString = (date) => {
        var minute = date.getMinutes()
        if(minute<10) {
            return `0${minute}`
        }
        return `${minute}`
    }

    return (
        parkingSpaces ? 
        <div className = {classes.body}>
            <div className = {classes.head}>
                <div className = {classes.name}>
                    PARKING SPACE
                </div>
            </div>
            <div className = {classes.container}>
            <Tabs className={classes.tabContainer} value={value} onChange={handleChange} aria-label="simple tabs example" centered>
            <Tab label="Tabular" {...a11yProps(0)} />
            <Tab label="Pictorial" {...a11yProps(1)} />
            </Tabs>
            {value === 0 ? 
            <Table className = {classes.table}>
                <Thead className = {classes.tableHead}>
                    <Tr className = {classes.tableRow}>
                    <Th>Space ID</Th>
                    <Th>Occupied</Th>
                    <Th>Exit Time</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {parkingSpaces.map((parkingSpace) => (
                            <Tr className = {classes.tableRow}>
                            <Td>    {parkingSpace.spaceid.split("space_")[1]}  </Td>
                            <Td>    {parkingSpace.userid ? "Yes" : "No"}    </Td>
                            <Td>   {parkingSpace.exitdate ? `${getHourString(new Date(parkingSpace.exitdate))}:${getMinuteString(new Date(parkingSpace.exitdate))}` : "N.R"}   </Td>
                            </Tr>
                    ))}
                </Tbody>

            </Table> : <></>
            }
            {
                value === 1 ? 
                <div className={classes.root}>
                    <Grid container spacing={3}>
                        {parkingSpaces.map((parkingSpace) => 
                        <Grid item xs={12/dimensions.columns}>
                        <Paper className={parkingSpace.userid ? ((user.spaceid === parkingSpace.spaceid) ? classes.paperAlloted : classes.paperFilled) : classes.paperEmpty}>
                            
                        </Paper>
                        </Grid>)
                        }
                    </Grid>
                </div>
            :
            <></>
            }
            </div>
        </div>
        :
            open ? 
            <Backdrop className={classes.backdrop} open = {open}>
                <CircularProgress color="inherit" />
            </Backdrop>
            : 
            <ErrorPanel/>
    );
}

export default ViewParkingSpace