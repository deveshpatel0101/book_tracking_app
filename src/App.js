import React, { Component } from 'react';

import Header from './components/Header/Header';
import BookSearch from './components/BookSearch/BookSearch';
import DisplayBooks from './components/DisplayBooks/DisplayBooks';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

const MainPage = () => (
  <div className='app'>
    <Header />
    <DisplayBooks />
  </div>
)

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path='/' component={MainPage} exact={true} />
          <Route path='/search' component={BookSearch} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
