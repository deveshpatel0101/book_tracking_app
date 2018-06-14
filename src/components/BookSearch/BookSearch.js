import React from 'react';
import { TextField, Button } from '@material-ui/core';
import BookCard from '../BookCard/BookCard';
import Header from '../Header/Header';
import { search, getAll } from '../../controllers/BooksAPI';
import './BookSearch.css';

class BookSearch extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      response: null,
      query: ''
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const temp = e.target.elements.search.value;
    if (temp !== '') {
      search(temp).then((response) => {
        if (response.length >= 1) {
          getAll().then(res => {
            res.forEach(bookShelf => {
              response = response.filter(bookSearch => {
                if (bookShelf.id === bookSearch.id) {
                  bookSearch.shelf = bookShelf.shelf;
                }
                return bookSearch;
              });
            });
            this.setState(() => ({ response: response, query: temp }));
          });
        } else if (response.error) {
          alert('No results found!');
        }
      });
    } else {
      alert('Valid input field is required.');
    }
  }

  handleChange(e) {
    e.preventDefault();
    if (e.target.value === '') {
      this.setState(() => ({ query: '' }));
    }
  }

  render() {
    return (
      <div>
        <Header />
        <form onSubmit={this.handleSubmit}>
          <div className='search'>
            <TextField
              label="Search Books"
              id="simple-start-adornment"
              name="search"
              onChange={this.handleChange}
            />
          </div>
          <div className="submit-button">
            <Button variant="contained" size="small" color="primary" type="submit">
              Search
            </Button>
          </div>
        </form>
        <div className='display-books'>
          {
            this.state.query !== '' ?
              (this.state.response.map(book => {
                return <BookCard book={book} key={book.id} />
              })) :
              null
          }
        </div>
      </div>
    );
  }
}

export default BookSearch;