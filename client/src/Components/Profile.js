import react, { useContext, useState } from 'react'
import {Link} from 'react-router-dom'

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
import currentUserContext from '../Context/useContext';

import Dashboard from './userModes/dashboard';

const drawerWidth = 240;

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
  
  const {user} = useContext(currentUserContext);
  const classes = useStyles();


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
          <ListItem button key={'Dashboard'} onClick = {() => console.log("Clicked")}>
              <ListItemIcon>  <DashboardIcon /> </ListItemIcon>
              <ListItemText 
              primary= "Dashboard" 
              onClick= {() => setSelectedMode('Dashboard')}
              />
          </ListItem>
          <ListItem button key={'Book Parking Space'} onClick = {() => console.log("Clicked")}>
              <ListItemIcon>  <BookIcon /> </ListItemIcon>
              <ListItemText 
              primary= "Book Parking Space"
              onClick= {() => setSelectedMode('Book Parking Space')}
              />
          </ListItem>
          <ListItem button key={'View Parking Space'} onClick = {() => console.log("Clicked")}>
              <ListItemIcon>  <ViewIcon /> </ListItemIcon>
              <ListItemText 
              primary= "View Parking Space" 
              onClick= {() => setSelectedMode('View Parking Space')}
              />
          </ListItem>
          <ListItem button key={'Edit Profile'} onClick = {() => console.log("Clicked")}>
              <ListItemIcon>  <EditIcon /> </ListItemIcon>
              <ListItemText 
              primary= "Edit Profile" 
              onClick= {() => setSelectedMode('Edit Profile')}
              />
          </ListItem>
          {
          user.category === "admin" ?
          <ListItem button key={'Edit Parking Space'} onClick = {() => console.log("Clicked")}>
              <ListItemIcon>  <EditIcon /> </ListItemIcon>
              <ListItemText 
              primary="Edit Parking Space" 
              onClick= {() => setSelectedMode('Edit Parking Space')}
              />
          </ListItem> :
          <></>
          }
          </List>
      </div>
    </Drawer>
    <main className={classes.content}>
      {
        selectedMode === "Dashboard" ? <Dashboard /> : <></>
      }
    </main>
  </div>
  )
}

export default Profile


