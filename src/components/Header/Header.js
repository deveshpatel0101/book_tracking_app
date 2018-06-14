import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import './Header.css';

const Header = () => (
  <div className='header' role="navigation">
    <AppBar position="static">
      <Toolbar>
        <Typography variant="title" color="inherit">
          <Link to="/" className='my-books'>My Books</Link>
        </Typography>
        <Link to='/search' className="search-button"><Button color="inherit">Search</Button></Link>
      </Toolbar>
    </AppBar>
  </div>
);

export default Header;