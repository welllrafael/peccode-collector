import { Component } from 'react';

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

class App extends Component {

  state = {
    tasks: [{
      _id: "Teste",
      name: "Tarefa"
    }]
  }

  async componentDidMount(){
    
    //const response = await axios.get("http://localhost:3000/api/realmdb");
    
    this.setState({tasks: this.state.tasks});

  }

  render(){        
    return(
      <div>
        <h1>Lista de Tarefas</h1>        
        
          <h2>
            <div>
            <h2>ID: </h2>
            000001
            </div>       
            <div>
            <h2>Nome: </h2>
            VinU
            </div>     
          </h2>                
      </div>
    )
  }

}

export default App;
