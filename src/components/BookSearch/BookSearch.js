import React from 'react';
import { TextField } from '@material-ui/core';
import BookCard from '../BookCard/BookCard';
import Header from '../Header/Header';
import { search, getAll } from '../../controllers/BooksAPI';
import './BookSearch.css';

class BookSearch extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      response: null,
      query: ''
    }
  }

  handleChange(e) {
    e.preventDefault();
    if (e.target.value === '') {
      this.setState(() => ({ query: '' }));
    }
    const temp = e.target.value;
    if (temp !== '') {
      search(temp).then((response) => {
        if (response.length >= 1) {
          if (this.props.currentBooks) {
            this.props.currentBooks.forEach(bookShelf => {
              response = response.filter(bookSearch => {
                if (bookShelf.id === bookSearch.id) {
                  bookSearch.shelf = bookShelf.shelf;
                }
                return bookSearch;
              });
            });
          } else { 
            /* if user directly visits search page then no props(i.e currentBooks) would have been passed 
             * so getAll() api call is used.
            */
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
          }
          this.setState(() => ({ response: response, query: temp }));
        } else if (response.error) {
          this.setState(() => ({ response: null, query: '' }))
        }
      });
    }
  }

  render() {
    return (
      <div>
        <Header />
        <form>
          <div className='search'>
            <TextField
              label="Search Books"
              id="simple-start-adornment"
              name="search"
              onChange={this.handleChange}
            />
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