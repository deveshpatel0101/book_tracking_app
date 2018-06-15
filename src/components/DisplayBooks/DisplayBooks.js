import React from 'react';
import './DisplayBooks.css';
import BookCard from '../BookCard/BookCard';
import { getAll, update } from '../../controllers/BooksAPI';

class DisplayBooks extends React.Component {
  constructor(props) {
    super(props);
    this.updatedShelf = this.updatedShelf.bind(this);
    this.state = {
      result: null
    }
  }

  componentDidMount() {
    getAll().then(response => {
      this.setState(() => ({ result: response }));
    });
  }

  updatedShelf(book, shelf) {
    update(book, shelf).then(res => {
      book.shelf = shelf;
      this.setState(state => ({
        result: state.result.filter(b => b.id !== book.id).concat(book)
      }));
    });
  }

  componentWillUnmount() {
    this.props.passState(this.state.result);
  }

  render() {
    let currentlyReading, read, wantToRead;
    if (this.state.result) {
      currentlyReading = this.state.result.map(book => {
        return (book.shelf === 'currentlyReading' ?
          (<BookCard book={book} key={book.id} update={this.updatedShelf} />) :
          null);
      });
      read = this.state.result.map(book => {
        return (book.shelf === 'read' ?
          (<BookCard book={book} key={book.id} update={this.updatedShelf} />) :
          null);
      });
      wantToRead = this.state.result.map(book => {
        return (book.shelf === 'wantToRead' ?
          (<BookCard book={book} key={book.id} update={this.updatedShelf} />) :
          null);
      });
    }
    return (
      <div>
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