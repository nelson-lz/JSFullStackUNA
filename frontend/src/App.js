//importaciones
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';
import 'react-notifications/lib/notifications.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/Navegacion';
import Productos from './components/Productos';
import io from 'socket.io-client';
import axios from 'axios';
//configuraciones
const socket = io.connect('http://localhost:4000');
axios.defaults.baseURL = "http://localhost:4000";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/productos" component={()=> <Productos axios={axios} socket={socket}/>}/>
        </Switch>
      </Router>      
    </div>
  );
}

export default App;
