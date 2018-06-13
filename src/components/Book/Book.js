import React from 'react';
import { Card, CardContent, Typography, FormControl, MenuItem, Select } from '@material-ui/core';

import { update } from '../../controllers/BooksAPI';
import './Book.css';

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: 'addTo',
      count: 1
    }
  }

  handleChange(e) {
    e.preventDefault();
    let newData = {
      id: this.props.book.id
    };
    update(newData, e.target.value).then(response => {
      console.log('updated', response);
      this.setState(() => ({ value: e.target.value, count: 0 }));
    });
  }

  render() {
    return (
      <div className='book'>
        <Card>
          <img
            src={this.props.book.imageLinks.thumbnail}
            title="Contemplative Reptile"
            className='book-cover'
          />
          <CardContent>
            <Typography variant="body2" gutterBottom>
              {this.props.book.title}
            </Typography>
            <Typography component="p">
              Pages: {this.props.book.pageCount}
            </Typography>
            <Typography component="p">
              Published On: {this.props.book.publishedDate}
            </Typography>
          </CardContent>

          <form>
            <FormControl className='select'>
              <Select value={this.props.book.shelf && this.state.count ?
                (this.props.book.shelf) :
                (this.state.value)}
                onChange={this.handleChange}
              >
                <MenuItem value={'addTo'}>Add To</MenuItem>
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

export default Book;