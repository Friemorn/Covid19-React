import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import Home from './pages/main/home'
import Detail from './pages/main/detail'
import About from './pages/main/about'
import Navbar from './components/navbar'
import Footer from './components/footer'

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/countries/:country" component={Detail}/>
        <Route path="/about" component={About}/>
      </Switch>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
