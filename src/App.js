import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import  MovieAppWrapper from './components/movieApp/movieAppWrapper'
import MovieCardList from './components/movieApp/movieCardList';
import Navbar from './components/movieApp/navBar';
import '../src/style/basicStyle.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  toast.configure();
  return (
    <div>
      <Navbar />

      <Switch>

         <Route exact path="/" component={MovieAppWrapper} />

         <Route exact path="/favouriteList" component={MovieCardList} />
         
         {/* page not found */}
         {/* <Route component={} /> */}
      </Switch>
    </div>
  );
}

export default App;
