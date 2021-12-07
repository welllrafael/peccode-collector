import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import {ITasks} from "./app.interface";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

class App extends Component {

  state = {
    tasks: []
  }

  async componentDidMount(){
    
    const response = await axios.get("http://localhost:3000/api/realmdb");
    
    this.setState({tasks: response.data});

  }

  render(){
    const {tasks}:ITasks = this.state;
    {console.log(tasks)}
    return(
      <div>
        <h1>Lista de Tarefas</h1>        
        {tasks.map(task => (                
          <h2>
            <div>
            <h2>ID: </h2>
            {task._id}
            </div>       
            <div>
            <h2>Nome: </h2>
            {task.name}
            </div>     
          </h2>        
        ))}
      </div>
    )
  }

}

export default App;
