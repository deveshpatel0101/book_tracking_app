import React, { Component } from 'react';

import Header from './components/Header/Header';
import BookSearch from './components/BookSearch/BookSearch';
import DisplayBooks from './components/DisplayBooks/DisplayBooks';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

const MainPage = (props) => (
  <div className='app'>
    <Header />
    <DisplayBooks passState={props.passState}/>
  </div>
)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null
    }
    this.passStateToBookSearch = this.passStateToBookSearch.bind(this);
  }

  passStateToBookSearch(state) {
    this.setState(() => ({result: state}));
  }
  
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' render={() => <MainPage passState={this.passStateToBookSearch} />} exact={true} />
          <Route path='/search' render={() => <BookSearch currentBooks={this.state.result} />} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
