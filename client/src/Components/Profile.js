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

import currentUserContext from '../Context/useContext';

import Dashboard from './userModes/dashboard';
import Booking from './userModes/booking';
import EditProfile from './userModes/editProfile'
import { useHistory } from 'react-router';

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  }
}));

const Profile = () => {
  
  const [selectedMode, setSelectedMode] = useState("Dashboard");
  
  const {user,setUser,setCurrentParking} = useContext(currentUserContext)
  const history = useHistory()
  const classes = useStyles()

  const Logout = () => {
    console.log("Logged out!!")
    setUser({});
    setCurrentParking({})
    localStorage.setItem('user',JSON.stringify({}));

    history.push('/')
  }


  return (
  <div className={classes.root}>
    <Drawer
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
            }
            setSelectedMode('Update Parking')
            }}>
              <ListItemIcon>  <UpdateIcon /> </ListItemIcon>
              <ListItemText 
              primary= "Update Parking"
              />
          </ListItem>
          <ListItem button key={'View Parking Space'} onClick= {() => setSelectedMode('View Parking Space')}>
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
    </Drawer>
    <main className={classes.content}>
      {
        selectedMode === "Dashboard" ? <Dashboard /> : <></>
      }
      {
        selectedMode === "Book Parking Spot" ? <Booking changeSelectedMode = {setSelectedMode}/> : <></>
      }
      {
        selectedMode === "Edit Profile" ? <EditProfile changeSelectedMode = {setSelectedMode} /> : <></>
      }
    </main>
  </div>
  )
}

export default Profile


