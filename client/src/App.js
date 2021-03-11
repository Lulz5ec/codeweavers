import logo from './logo.svg';
import './App.css';
import Button from "@material-ui/core/Button";
import {BrowserRouter as Router , Route , Switch } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import TopPageDesign from "./Components/TopPagedesign"; 
import HomePage from "./Components/HomePage";

function App() {
  return (
    
    <Router>
      <TopPageDesign/>
      <Switch>
      <Route exact path="/" component={HomePage}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/register" component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
