import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, ButtonGroup, Container, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

import useAppSelector from '../hooks/useAppSelector';
import { AppState } from '../redux/store';
import useAppDispatch from '../hooks/useDispatch';
import StyledImage from '../components/StyledImage';
import { addToCart, removeAllItemsOfProductFromCart, removeAllProductsFromCart, removeFromCart } from '../redux/slices/cartSlice';
import Product from '../types/Product';
import SnackBarCompletion from '../components/SnackBar';
import countAmountOfItemsByProperty from '../selectors/countAmountOfItemsByProperty';

const Cart = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state: AppState) => state.cartReducer);

  const productsInCartPrice = cart.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.price*currentValue.quantity;
  }, 0);

  const productsInCartAmount = countAmountOfItemsByProperty(cart, 'quantity');

  const onAddItem = (product: Product) => {
    dispatch(addToCart(product));
  }

  const onRemoveItem = (productId: number) => {
    dispatch(removeFromCart(productId));
  }

  const onRemoveAllItems = (productId: number) => {
    dispatch(removeAllItemsOfProductFromCart(productId));
  }

  const onRemoveAllProducts = () => {
    dispatch(removeAllProductsFromCart());
  }

  return (
    <Container maxWidth="md" sx={{
      bgcolor: 'background.paper',
      pt: 8,
      pb: 6,
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
        gutterBottom
      >
        Shopping cart: 
      </Typography>
      {!cart.length && (
        <>
          <Typography variant="h5" gutterBottom>Your cart is empty! Let's find something for you!</Typography>
          <Button component={Link} to="/products" variant="contained" aria-label="move-to-products" size="large">Continue shopping!</Button>
        </>
      )}

      {!!cart.length && (
        <>
          <Typography gutterBottom>
            Total amount of your order: {productsInCartAmount}
          </Typography>
          <Typography gutterBottom>
            Total price of your order: {productsInCartPrice}€
          </Typography>
          <SnackBarCompletion
            buttonText="Complete purchase by one click"
            message="Purchase completed successfully"
            buttonSize='large'
          />
          <TableContainer component={Paper} sx={{mb: '1em'}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Item</TableCell>
                  <TableCell align="center">Category</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Amount</TableCell>
                  <TableCell align="center">Manage order</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center" >
                      <StyledImage link={row.images[0]} />
                      <Typography>
                        {row.title}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      {row.category.name}
                      </TableCell>
                    <TableCell align="left">{row.description}</TableCell>
                    <TableCell align="center">{row.price*row.quantity}€</TableCell>
                    <TableCell align="center">{row.quantity}</TableCell>
                    <TableCell align="center">
                      <ButtonGroup variant="outlined" aria-label="outlined button group">
                        <Button onClick={() => onRemoveItem(row.id)} aria-label="remove-one">
                          <RemoveIcon fontSize="inherit" />
                        </Button>
                        <Button onClick={() => onAddItem(row)} aria-label="add">
                          <AddIcon fontSize="inherit" />
                        </Button>
                        <Button onClick={() => onRemoveAllItems(row.id)} aria-label="delete" size="small">
                          <DeleteIcon fontSize="inherit" />
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </TableContainer>
        <Button onClick={() => onRemoveAllProducts()} variant="outlined" aria-label="delete-all-products" size="large">
          Remove all items from the cart
        </Button>
      </>
    )}
  </Container>
  )
}

export default Cart;