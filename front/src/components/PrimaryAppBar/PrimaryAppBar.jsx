import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import logoLeft from '../../assets/images/logoL.png'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import $api from '../../http';
import { SET_USER } from '../../redux/actions/action.types';
import { getCartItemsByUser } from '../../redux/actions/cartAC';
import {getUserWishes} from "../../redux/actions/wishAC";
import { searchItems } from '../../redux/actions/itemsAC';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.90),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '35ch',
    },
  },
}));

export default function PrimaryAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [searchInput, setSearchInput] = React.useState('')
  const user = useSelector((store) => store.user);
  const cart = useSelector((store) => store.cart);
  const wishes = useSelector((store) => store.wishes);
  const categs = useSelector((store) => store.categs);

  const cartFilter = cart.filter(item => !item.orderNumber)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
      if (searchInput.length > 2) {
        dispatch(searchItems({ search: searchInput, ...categs }))
      }
  }, [searchInput, categs, dispatch])

  React.useEffect(() => {
    dispatch(getUserWishes(user.id))
  }, [dispatch, user.id]);

  React.useEffect(() => {
    if (user.id) {
      dispatch(getCartItemsByUser(user.id))
    }
  }, [dispatch, user.id])

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = (e) => {
    setAnchorEl(null);
    handleMobileMenuClose();
    switch (e.target.innerText) {
      case 'Log In':
        return navigate('/auth/login')

      case 'Sign Up':
        return navigate('/auth/registration')

      case 'Log Out':
        return $api.post('/auth/logout').then((res) => {
          localStorage.removeItem('token');
          dispatch({ type: SET_USER, payload: {} });
          navigate('/auth/login');
        });

      case 'My account':
        return navigate('/profile')

      default:
        return null;
    }
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {user.email
        ? <div>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
            <MenuItem onClick={handleMenuClose}>Log Out</MenuItem>
          </div>
        : <div>
            <MenuItem onClick={handleMenuClose}>Log In</MenuItem>
            <MenuItem onClick={handleMenuClose}>Sign Up</MenuItem>
          </div>
        }
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={cart.length ? cart.length : null } color="error">
              <ShoppingCartOutlinedIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={wishes.length ? wishes.length : null } color="error">
            <FavoriteBorderOutlinedIcon />
          </Badge>
        </IconButton>
        <p>Wish list</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircleOutlinedIcon />
        </IconButton>
        <p>Account</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, ml: 7, mt: 1, pb: 2 }}
            onClick={() => navigate('/')}
          >
            <img src={logoLeft} alt="" />
          </IconButton>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search for an item..."
              inputProps={{ 'aria-label': 'search' }}
              onChange={((e) => setSearchInput(e.target.value))}
              value={searchInput}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{
                    display: { xs: 'none', md: 'flex', },
                    justifyContent: 'space-around',
                    mr: '8px', width: '20%'
                  }}>

            <IconButton
                onClick={() => navigate('/user/id/shoppingcart')}
                size="large"
                aria-label="show 4 new mails"
                color="inherit">
              <Badge badgeContent={cartFilter.length ? cartFilter.length : null } color="error"
              // Менять динамически при добавлении
              >
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
            <IconButton
                onClick={() => navigate('/user/id/wishlist')}
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={wishes.length ? wishes.length : null } color="error">
                <FavoriteBorderOutlinedIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircleOutlinedIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
