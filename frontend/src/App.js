import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import './App.scss';
import Products from './components/Products';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="theme-light">
          <div className="app">
          <Route exact path="/"> <Products /> </Route>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;