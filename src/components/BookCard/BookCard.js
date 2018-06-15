import React from 'react';
import { Card, Typography, FormControl, MenuItem, Select } from '@material-ui/core';

import { update } from '../../controllers/BooksAPI';
import './BookCard.css';

class BookCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: 'none',
      count: 1
    }
  }
  handleChange(e) {
    e.preventDefault();
    const temp = e.target.value;
    let newData = {
      id: this.props.book.id,
      title: this.props.book.title,
      imageLinks: this.props.book.imageLinks,
      authors: this.props.book.authors,
      pageCount: this.props.book.pageCount,
      publishedDate: this.props.book.publishedDate
    };
    if (this.props.update) {
      this.props.update(newData, temp);
    } else {
      update(newData, temp).then((res) => {
        this.setState(() => ({ value: e.target.value, count: 0 }));
      });
    }
  }

  render() {
    return (
      <div className='book'>
        <Card>
          {
            this.props.book.imageLinks ?
              <img
                src={this.props.book.imageLinks.thumbnail}
                title="Contemplative Reptile"
                className='book-cover'
                alt={`Cover of book ${this.props.book.title}`}
              /> :
              <p>Image not available.</p>
          }

          <div className='card-content'>
            <Typography variant="body2" gutterBottom>
              {this.props.book.title}
            </Typography>

            {this.props.book.authors ?
              <Typography variant='caption' gutterBottom>
                Authors:
                {this.props.book.authors.map((author, value, all) => (
                  value === all.length - 1 ?
                    ` ${author}` :
                    ` ${author},`)
                )}
              </Typography> :
              null
            }

            {this.props.book.pageCount ?
              <Typography variant='caption' gutterBottom>
                Pages: {this.props.book.pageCount}
              </Typography> :
              null
            }

            {this.props.book.publishedDate ?
              <Typography variant='caption' gutterBottom>
                Published On: {this.props.book.publishedDate}
              </Typography> :
              null
            }
          </div>

          <form>
            <FormControl className='select'>
              <Select
                value={this.props.book.shelf && this.state.count ?
                  (this.props.book.shelf) :
                  (this.state.value)}
                onChange={this.handleChange}
              >
                <MenuItem value={'none'}>None</MenuItem>
                <MenuItem value={'currentlyReading'}>Reading</MenuItem>
                <MenuItem value={'wantToRead'}>Want to Read</MenuItem>
                <MenuItem value={'read'}>Read</MenuItem>
              </Select>
            </FormControl>
          </form>
        </Card>
      </div>
    );
  }
};

export default BookCard;