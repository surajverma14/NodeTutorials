import React,{Component} from 'react';
import AppNavbar from './components/AppNavbar'
import Shoppinglist from './components/Shoppinglist'
import {Provider} from 'react-redux';
import store from './store';
import ItemModal from './components/ItemModel'
import {Container} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {loadUser} from './action/authAction'
class App extends Component {

  componentDidMount(){
    store.dispatch(loadUser());
  }
render(){
  return (
    <Provider store={store}>
    <div className="App">
     <AppNavbar></AppNavbar>
     <Container>
     <ItemModal></ItemModal>
     <Shoppinglist></Shoppinglist>
     </Container>
    </div>
    </Provider>
  );
}
 
}

export default App;
