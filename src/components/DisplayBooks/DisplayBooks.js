import React from 'react';
import './DisplayBooks.css';
import Book from '../Book/Book';

class DisplayBooks extends React.Component {
  render() {
    const dataFromLocal = () => {
      const books = localStorage.getItem('books');
      console.log(books);
      return books;
    }
    return (
      <div className='display-books'>
        {this.props.result ? 
          this.props.result.map((book, value) => {
            console.log('value', value);
            return <Book title={book.title} publisher={book.publisher} image={book.imageLinks.smallThumbnail}/>
          }) : 
          'Render data from local storage'}
          {dataFromLocal()}
      </div>
    );
  }
};

export default DisplayBooks;