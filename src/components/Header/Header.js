import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

import './Header.css';

const Header = () => (
  <div className='header'>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="title" color="inherit">
          MyBooks
        </Typography>
      </Toolbar>
    </AppBar>
  </div>
);

export default Header;