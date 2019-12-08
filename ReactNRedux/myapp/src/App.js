import React,{Component} from 'react';
import Ninjas from './Ninjas'
import AddNinja from './AddNinja'

  class App extends Component {
    state={
      ninjas:[
          {name:"Ryu",age:20,belt:"Green",id:1},
          {name:"Uzumaki",age:25,belt:"Black",id:2},
          {name:"Noah",age:23,belt:"Blue" ,id:3}  
      ]
  }

  addNinja=(ninja)=>{

    ninja.id=Math.random();
    let ninjas=[...this.state.ninjas,ninja];
    this.setState({
      ninjas:ninjas
    })
  }

  deleteNinja=(id)=>{
      let ninjas=this.state.ninjas.filter(ninja=>{
        return ninja.id !== id
      });
      this.setState({
        ninjas:ninjas
      })
  }

    render(){
      return (
        <div className="App">
         
      <Ninjas deleteNinja={this.deleteNinja} ninjas={this.state.ninjas}/>
      <AddNinja addNinja={this.addNinja} />
          
        </div>
      );
    }
}

export default App;
