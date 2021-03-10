import logo from './logo.svg';
import './App.css';
import Button from "@material-ui/core/Button";
import {BrowserRouter as Router , Route , Switch } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";

function App() {
  return (
    <Router>
      <Switch>
      <Route exact path="/login" component={Login}/>
      </Switch>
      <Switch>
      <Route exact path="/register" component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
