import React from 'react';
import './DisplayBooks.css';
import BookCard from '../BookCard/BookCard';
import { getAll } from '../../controllers/BooksAPI';

class DisplayBooks extends React.Component {
  constructor(props) {
    super(props);
    this.showShelves = this.showShelves.bind(this);
    this.updatedShelf = this.updatedShelf.bind(this);
    this.state = {
      result: null
    }
  }

  showShelves = () => {
    getAll().then(response => {
      this.setState(() => ({ result: response }));
    });
  }

  updatedShelf(bookId, shelf) {
    this.state.result.map((book, value, all) => {
      if(book.id === bookId) {
        this.setState((prevState) => {
          let temp = prevState.result;
          temp[value].shelf = shelf;
          return {result: temp}
        });
      }
      return null;
    });
  }

  render() {
    let currentlyReading, read, wantToRead;
    if (this.state.result) {
      currentlyReading = this.state.result.map(book => {
        return book.shelf === 'currentlyReading' ? (<BookCard book={book} key={book.id} update={this.updatedShelf} />) : null;
      });
      read = this.state.result.map(book => {
        return book.shelf === 'read' ? (<BookCard book={book} key={book.id} update={this.updatedShelf} />) : null;
      });
      wantToRead = this.state.result.map(book => {
        return book.shelf === 'wantToRead' ? (<BookCard book={book} key={book.id} update={this.updatedShelf} />) : null;
      });
    }
    return (
      <div>
        {this.state.result ? null : this.showShelves()}
        {/* Below complete curly brackets checks if there are any books in specific shelf, if so then only
          render heading of that shelf accordingly.        
        */}
        {
          this.state.result ?
            (this.state.result[this.state.result.length - 3] !== 0 ?
              (<h2 className="category-heading">Currently Reading</h2>) :
              null) :
            null
        }
        <div className="display-books">
          {this.state.result ? currentlyReading : null}
        </div>

        {
          this.state.result ?
            (this.state.result[this.state.result.length - 2] !== 0 ?
              (<h2 className="category-heading">Want To Read</h2>) :
              null) :
            null
        }
        <div className="display-books">
          {this.state.result ? wantToRead : null}
        </div>

        {
          this.state.result ?
            (this.state.result[this.state.result.length - 1] !== 0 ?
              (<h2 className="category-heading">Read</h2>) :
              null) :
            null
        }
        <div className="display-books">
          {this.state.result ? read : null}
        </div>

      </div>
    );
  }
};

export default DisplayBooks;