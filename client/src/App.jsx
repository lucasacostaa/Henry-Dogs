import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './containers/Home'
import { Provider } from 'react-redux';
import store from './redux/store';
import Landing from './containers/Landing'

function App() {
  return (
    <div className="App">
      <Router>
        <Provider store={store} >
          <Route exact path="/" component={Landing}/>
          <Route path="/main" component={Home}/>
        </Provider>
      </Router>
    </div>
  );
}

export default App;
