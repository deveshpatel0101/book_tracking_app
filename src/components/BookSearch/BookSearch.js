import React from 'react';
import { TextField, Button } from '@material-ui/core';

import DisplayBooks from '../DisplayBooks/DisplayBooks';
import { get, getAll, update, search } from '../../BooksAPI';

import './BookSearch.css';

class BookSearch extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      query:'',
      response: ''
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(e.target.elements.search.value);
    const temp = e.target.elements.search.value;
    if(temp !== '') {
      search(temp).then((response) => {
        console.log(response);
        this.setState(() => ({ response: response, query: temp }));
      });
    } else {
      alert('something');
    }
  }

  handleChange(e) {
    e.preventDefault();
    const temp = e.target.value;
    this.setState({query: temp});
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className='search'>
            <TextField label="Search Books" id="simple-start-adornment" name="search" onChange={this.handleChange}/>
          </div>
          <div className="submit-button">
          <Button variant="contained" size="small" color="primary" type="submit">
            Search
          </Button>
          </div>
        </form>
        {this.state.query === '' ? <DisplayBooks /> : <DisplayBooks result={this.state.response} />}
      </div>
    );
  }
}

export default BookSearch;