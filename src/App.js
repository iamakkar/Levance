import React from 'react'
import Home from './components/home/Wrapper';
import Brand from './components/brand/Wrapper';
import {Route, BrowserRouter as Router} from 'react-router-dom';


function App() {
  return (
    <Router>
      <Route path="/brand" exact={true} component={Brand} />
      <Route path="/" exact={true} component={Home} />
    </Router>
  );
}

export default App;
