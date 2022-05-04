import React from 'react';
import { AppBar, Box, Toolbar } from '@mui/material';
import DropdownNav from '../DropdownNav/DropdownNav';

const Navbar = () => {
  const subBar = ['Warhammer', 'Fantasy', 'Sci-Fi', 'Terrain', 'Space Marines', 'Astrates', 'Tech Guys', 'Giga Robots' ]

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ paddingLeft: '30px'}}>
          {subBar.map((el) => {
            return (
              <DropdownNav
                key={el}
                category={el}
                // variant="h6"
              />
              )
          })}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
