import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";

import { ITasks } from "./app.interface";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

function App() {
  const [task, setTasks] = useState<ITasks>();

  useEffect(()=>{
    axios.get('http://localhost:3000/api/realmdb')
        .then(res=>{
            console.log("Teste")
            let task = res.data.name;
            setTasks({})
        })
        .catch(err=>{
            console.log(err);
        })
},[]);

  return (
    <div className="Task">
      <p>ID: {task}</p>
      <p>Nome Tarefa: {task?._name}</p>
    </div>
  );
}

export default App;
