import react, { useContext, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BookIcon from '@material-ui/icons/Book';
import EditIcon from '@material-ui/icons/Edit';
import ViewIcon from '@material-ui/icons/Pageview';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import UpdateIcon from '@material-ui/icons/EditLocation'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import currentUserContext from '../Context/useContext';

import Dashboard from './userModes/dashboard'
import Booking from './userModes/booking'
import EditProfile from './userModes/editProfile'
import UpdateBooking from './userModes/updateBooking'
import ViewParkingSpace from './userModes/ViewParkingSpace'
import EditParkSpace from './adminModes/editParkingSpace'
import ViewAllUsers from './adminModes/viewAllUsers'


import { useHistory } from 'react-router';

const driverModes = ["Dashboard","Book Parking Slot","Update Parking","View Parking Space","Edit Profile","Logout"]
const adminModes = ["Dashboard","Book Parking Slot","Update Parking","View Parking Space","View All Users","Edit Profile","Edit Parking Space","Logout"]

const useStyles = makeStyles((theme) => ({
  body: {
    display: 'flex',
    flexDirection : 'column',
    width : "100%"
  },
  root: {
    flexGrow: 1,
    width: "100%",
    margin: "auto",
    textAlign: "center"
  },
  Indicator: {
      height: 3,
      boxShadow: 'inset 0 0 6px rgba(0,0,255,.5)',
      transform: "scale(.8)"
  },
  Tab : {
    minWidth: "20%", 
    fontWeight: "400", 
    fontSize: 16,
    [theme.breakpoints.down("sm")] : {
        width: "50%",
        fontSize: 14
    },
    [theme.breakpoints.down("xs")] : {
        width: "50%",
        fontSize: 12
    }
  },
  content: {
    flexGrow: 1,
    [theme.breakpoints.down("sm")] : {
      width : "100%",
    }
  }
}));

const Profile = () => {
  
  const [selectedMode, setSelectedMode] = useState("Dashboard");
  
  const {user,setUser,setCurrentParking} = useContext(currentUserContext)
  const history = useHistory()
  const classes = useStyles()
  const [value,setValue] = useState(0)
  // console.log(user);
  const Logout = () => {
    console.log("Logged out!!")
    setUser({});
    setCurrentParking({})
    localStorage.setItem('user',JSON.stringify({}));

    history.push('/')
  }

  const handleChange = (event,newValue) => {
    const modes = user.category === "driver" ? driverModes : adminModes
    if(modes[newValue] === "Logout") {
      Logout();
      return;
    }
    if(selectedMode !== modes[newValue]) {
      if(modes[newValue] === "Book Parking Slot") {
        if(user.spaceid) {
          alert('You already have booked a spot!')
          return
        }
      }

      if(modes[newValue] === "Update Parking") {
        if(!user.spaceid) {
          alert("You haven't booked a parking slot yet")
          return;
        }
      }

      setSelectedMode(modes[newValue]);
      setValue(newValue)
    }
  }


  return (
  <div className={classes.body}>
    {/* <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          <ListItem button key={'Dashboard'} onClick= {() => setSelectedMode('Dashboard')}>
              <ListItemIcon>  <DashboardIcon /> </ListItemIcon>
              <ListItemText 
              primary= "Dashboard" 
              />
          </ListItem>
          <ListItem button key={'Book Parking Spot'} onClick= {() => {
            if(user.spaceid) {
              alert('You already have booked a spot!')
              return
            }
            setSelectedMode('Book Parking Spot')
            }}>
              <ListItemIcon>  <BookIcon /> </ListItemIcon>
              <ListItemText 
              primary= "Book Parking Spot"
              />
          </ListItem>
          <ListItem button key={'Update Parking'} onClick= {() => {
            if(!user.spaceid) {
              alert("You haven't booked a parking slot yet")
              return;
            }
            setSelectedMode('Update Parking')
            }}>
              <ListItemIcon>  <UpdateIcon /> </ListItemIcon>
              <ListItemText 
              primary= "Update Parking"
              />
          </ListItem>
          <ListItem button key={'View Parking Space'} onClick= {() => { 
            if(selectedMode === 'View Parking Space')  {
              return;
            }
            setSelectedMode('View Parking Space')
            }
          }>
              <ListItemIcon>  <ViewIcon /> </ListItemIcon>
              <ListItemText 
              primary= "View Parking Space" 
              />
          </ListItem>
          <ListItem button key={'Edit Profile'} onClick= {() => setSelectedMode('Edit Profile')}>
              <ListItemIcon>  <EditIcon /> </ListItemIcon>
              <ListItemText 
              primary= "Edit Profile" 
              />
          </ListItem>
          {
          user.category === "admin" ?
          <ListItem button key={'Edit Parking Space'} onClick= {() => setSelectedMode('Edit Parking Space')}>
              <ListItemIcon>  <EditIcon /> </ListItemIcon>
              <ListItemText 
              primary="Edit Parking Space" 
              />
          </ListItem> :
          <></>
          }
          <ListItem button key={'Logout'} onClick= {Logout}>
              <ListItemIcon>  <LogoutIcon /> </ListItemIcon>
              <ListItemText 
              primary="Logout" 
              />
          </ListItem>
        </List>
      </div>
    </Drawer> */}
    <div className = {classes.root}>
     <AppBar position="static" color="default">
      <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="none"
          textColor="primary"
          classes={{ indicator: classes.Indicator}}
          aria-label="scrollable article navigation bar"
      >
          {/* {pages.map((page,idx) => 
          <Tab 
          className={classes.Tab} 
          label={<span>{page}</span>} 
          icon={<DashboardIcon />}
          key={idx}
          />)} */}
          <Tab 
          className={classes.Tab} 
          label={<span>Dashboard</span>} 
          icon={<DashboardIcon />}
          key={"Dashboard"}
          />
          <Tab 
          className={classes.Tab} 
          label={<span>Book Parking Slot</span>} 
          icon={<BookIcon />}
          key={"Book Parking Slot"}
          />
          <Tab 
          className={classes.Tab} 
          label={<span>Update Booking Parking</span>} 
          icon={<UpdateIcon />}
          key={"Update Parking"}
          />
          <Tab 
          className={classes.Tab} 
          label={<span>View Parking Space</span>} 
          icon={<ViewIcon />}
          key={"View Parking Space"}
          />
          {user.category === "Admin" ? 
          <Tab 
          className={classes.Tab} 
          label={<span>View All Users</span>} 
          icon={<ViewIcon />}
          key={"View All Users"}
          />: 
          <></>
          }
          <Tab 
          className={classes.Tab} 
          label={<span>Edit Profile</span>} 
          icon={<EditIcon />}
          key={"Edit Profile"}
          />
          {user.category === "Admin" ? 
          <Tab 
          className={classes.Tab} 
          label={<span>Edit Parking Space</span>} 
          icon={<EditIcon />}
          key={"Edit Parking Space"}
          />: 
          <></>
          }
          
          <Tab 
          className={classes.Tab} 
          label={<span>Logout</span>} 
          icon={<LogoutIcon />}
          key={"Logout"}
          />
      </Tabs>
    </AppBar> 
    </div>
    <main className={classes.content}>
      {
        selectedMode === "Dashboard" ? <Dashboard /> : <></>
      }
      {
        selectedMode === "Book Parking Slot" ? <Booking changeSelectedMode = {setSelectedMode} changeIndicatortab = {setValue}/> : <></>
      }
      {
        selectedMode === "Edit Profile" ? <EditProfile changeSelectedMode = {setSelectedMode} changeIndicatortab = {setValue} /> : <></>
      }
      {
        selectedMode === "Update Parking" ? <UpdateBooking changeSelectedMode = {setSelectedMode} changeIndicatortab = {setValue} /> : <></>
      }
      {
        selectedMode === "View Parking Space" ? <ViewParkingSpace changeSelectedMode = {setSelectedMode} changeIndicatortab = {setValue} /> : <></>
      }
      {
        selectedMode === "Edit Parking Space" ? <EditParkSpace changeSelectedMode = {setSelectedMode} changeIndicatortab = {setValue} /> : <></>
      }
      {
        selectedMode === "View All Users" ? <ViewAllUsers changeSelectedMode = {setSelectedMode} changeIndicatortab = {setValue} /> : <></>
      }
    </main>
  </div>
  )
}

export default Profile


{/* <AppBar position="static" color="default">
  <Tabs
      value={value}
      // onChange={handleChange}
      variant="scrollable"
      scrollButtons="on"
      indicatorColor="none"
      textColor="primary"
      classes={{ indicator: classes.Indicator}}
      aria-label="scrollable article navigation bar"
  >
      {pages.map((page,idx) => 
      <Tab 
      className={classes.Tab} 
      label={<span>{page}</span>} 
      icon={<DashboardIcon />}
      key={idx}
      />)}
      <Tab 
      className={classes.Tab} 
      label={<span>Dashboard</span>} 
      icon={<DashboardIcon />}
      key={idx}
      />
      <Tab 
      className={classes.Tab} 
      label={<span>Book Parking Slot</span>} 
      icon={<BookIcon />}
      key={idx}
      />
      <Tab 
      className={classes.Tab} 
      label={<span>Update Booking Parking</span>} 
      icon={<UpdateIcon />}
      key={idx}
      />
      <Tab 
      className={classes.Tab} 
      label={<span>View Parking Space</span>} 
      icon={<ViewIcon />}
      key={idx}
      />
      <Tab 
      className={classes.Tab} 
      label={<span>Edit Profile</span>} 
      icon={<EditIcon />}
      key={idx}
      />
      {user.category === "admin" ? 
      <Tab 
      className={classes.Tab} 
      label={<span>Edit Parking Space</span>} 
      icon={<EditIcon />}
      key={idx}
      />: 
      <></>
      }
      <Tab 
      className={classes.Tab} 
      label={<span>Logout</span>} 
      icon={<LogoutIcon />}
      key={idx}
      />
  </Tabs>
</AppBar> */}