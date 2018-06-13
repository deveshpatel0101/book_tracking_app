import React from 'react';
import './DisplayBooks.css';
import BookShelves from '../BookShelves/BookShelves';
import { getAll } from '../../controllers/BooksAPI';

class DisplayBooks extends React.Component {
  constructor(props) {
    super(props);
    this.showShelves = this.showShelves.bind(this);
    this.state = {
      result: null
    }
  }

  showShelves = () => {
    getAll().then(response => {
      this.setState(() => ({ result: response }));
    });
  }

  render() {
    let currentlyReading, read, wantToRead;
    if (this.state.result) {
      currentlyReading = this.state.result.map((book, value, all) => {
        return book.shelf === 'currentlyReading' ? (<BookShelves book={book} key={book.id} header={value} />) : null
      });
      read = this.state.result.map((book, value, all) => {
        return book.shelf === 'read' ? (<BookShelves book={book} key={book.id} header={value} />) : null
      });
      wantToRead = this.state.result.map((book, value, all) => {
        return book.shelf === 'wantToRead' ? (<BookShelves book={book} key={book.id} header={value} />) : null
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