import React from 'react'
import Home from './Home'
import BMapAssembly from './BMapAssembly'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App(){
  return(
    <Router>
      <Switch>
          <Route path='/' exact component={Home}/>
          <Route path="/map" component={BMapAssembly}/>
      </Switch>
    </Router>
  )
}

export default App;
