import { Component } from 'react';

class App extends Component {

  state = {
    tasks: [{
      _id: "Teste",
      name: "Tarefa"
    }]
  }

  async componentDidMount(){
        
    this.setState({tasks: this.state.tasks});

  }

  render(){        
    return(
      <div>
        <h1>Prioridades VininhU!</h1>                
          <h2>
            <div>
            <h2>Quem meu VinU sempre prefere?</h2>            
            </div>                     
            <div>
              ZizU
            </div>       
            <div>        
              Blyto      
            </div>     
          </h2>                
      </div>
    )
  }

}

export default App;
