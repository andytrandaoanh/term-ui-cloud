import {  BrowserRouter as Router } from "react-router-dom";
import TopAppBar from './components/app-bar-component';
import Routing from './components/routing-component.js';
import './App.css';

export default function App () {
  return (
      <div>
        <Router>
          <TopAppBar />
          <Routing />
        </Router>
      </div>
   )
}
