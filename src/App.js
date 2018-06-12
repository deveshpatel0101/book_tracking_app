import React, { Component } from 'react';

import Header from './components/Header/Header';
import BookSearch from './components/BookSearch/BookSearch';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className='app'>
        <Header />
        <BookSearch />
      </div>
    );
  }
}

export default App;
