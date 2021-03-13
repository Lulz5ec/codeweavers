import logo from './logo.svg';
import './App.css';
import Button from "@material-ui/core/Button";
import {BrowserRouter as Router , Route , Switch, useHistory } from "react-router-dom";

import currentUserContext from "./Context/useContext"
import Login from "./Components/Login"
import Register from "./Components/Register"
import TopPageDesign from "./Components/TopPagedesign" 
import HomePage from "./Components/HomePage"
import Profile from './Components/Profile'
import React, { useState  , useEffect } from 'react'
import axios from "axios"

function App() {

  const [user, setUser] = useState({})
  const history = useHistory()
  useEffect(() => {
    if(window.location.pathname === "/" || window.location.pathname === "/register" || window.location.pathname === "/login") return;
    console.log("APP.js useEffect is running-----");
    const currentUserJson = localStorage.getItem('user');
    const previousUser = JSON.parse(currentUserJson);
    if(previousUser) {
      const findUserById = async () => {
        const url = "http://localhost:5000/user/findUserById"

        try {
          const response = await axios.get(url , {params : {
            id : previousUser._id
          }})
          console.log(response , "response====")
          history.push(`${window.location.pathname}`)
          setUser(previousUser);
        } catch(err) {
          console.log(err)
          history.push('/login')
        }
      }

      findUserById();
    }else {
      history.push('/login')
    }
  }, [])

  return (
    <React.Fragment>
      <TopPageDesign/>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/register" component={Register} />
      </Switch>

      <currentUserContext.Provider value = {{user,setUser}}>
        <Switch>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/Profile" component={Profile}/>
        </Switch>
      </currentUserContext.Provider>
    </React.Fragment>
  );
}

export default App;
