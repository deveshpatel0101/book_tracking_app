import React from 'react';
import { TextField, Button } from '@material-ui/core';

import DisplayBooks from '../DisplayBooks/DisplayBooks';
import Header from '../Header/Header';
import { search } from '../../controllers/BooksAPI';


import './BookSearch.css';

class BookSearch extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      response: null
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const temp = e.target.elements.search.value;
    if (temp !== '') {
      search(temp).then((response) => {
        this.setState(() => ({ response: response, query: temp }));
      });
    } else {
      alert('something');
    }
  }

  render() {
    return (
      <div>
        <Header />
        <form onSubmit={this.handleSubmit}>
          <div className='search'>
            <TextField label="Search Books" id="simple-start-adornment" name="search" />
          </div>
          <div className="submit-button">
            <Button variant="contained" size="small" color="primary" type="submit">
              Search
          </Button>
          </div>
        </form>
        {this.state.response ? <DisplayBooks result={this.state.response} /> : null}
      </div>
    );
  }
}

export default BookSearch;