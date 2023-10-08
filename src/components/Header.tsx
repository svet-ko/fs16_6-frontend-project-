import { AppBar, Badge, Button, ButtonGroup, IconButton, Toolbar, Typography } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import React from 'react'
import { Link } from 'react-router-dom';

import useAppSelector from '../hooks/useAppSelector';
import { AppState } from '../redux/store';
import countAmountOfItemsByProperty from '../selectors/countAmountOfItemsByProperty';

const Header = () => {
  const cart = useAppSelector((state: AppState) => state.cartReducer);

  const productsInCartAmount = countAmountOfItemsByProperty(cart, 'quantity');

  return (
    <AppBar position="relative">
      <Toolbar>
        <StorefrontIcon sx={{ mr: 2 }} />
        <Typography sx={{ mr: 2 }} variant="h6" color="inherit" noWrap>
          ANOTHER E-SHOP
        </Typography>
        <ButtonGroup variant="outlined" sx={{bgcolor: 'background.paper', mr: 2}} >
          <Button component={Link} to="/">Home</Button>
          <Button component={Link} to="/products">Products</Button>
          <Button component={Link} to="about">About</Button>
        </ButtonGroup>
        <IconButton color="inherit" component={Link} to="/cart" aria-label="cart">
          <Badge badgeContent={productsInCartAmount} color="secondary" max={99}>
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Header;