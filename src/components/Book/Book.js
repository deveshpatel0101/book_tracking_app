import React from 'react';
import { Card, CardContent, CardMedia, Typography, FormControl, MenuItem, Select } from '@material-ui/core';

import './Book.css';

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: 1
    }
  }
  handleChange(e) {
    e.preventDefault();
    this.setState(() => ({ value: e.target.value }));
  }

  render() {
    return (
      <div className='book'>
        <Card>
          <CardMedia image={this.props.image} title="Contemplative Reptile" className='book-cover' />
          <CardContent>
            <Typography variant="title" gutterBottom>
              {this.props.title}
            </Typography>
            <Typography component="p">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
              across all continents except Antarctica
            </Typography>
          </CardContent>

          <form>
            <FormControl className='select'>
              <Select value={this.state.value} onChange={this.handleChange}>
                <MenuItem value={1}>Add To</MenuItem>
                <MenuItem value={2}>Currently Reading</MenuItem>
                <MenuItem value={3}>Want to Read</MenuItem>
                <MenuItem value={4}>Read</MenuItem>
                <MenuItem value={5}>None</MenuItem>
              </Select>
            </FormControl>
          </form>
        </Card>
      </div>
    );
  }
};

export default Book;