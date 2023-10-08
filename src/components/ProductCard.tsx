import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';

import Product from '../types/Product';
import useAppDispatch from '../hooks/useDispatch';
import { addToCart } from '../redux/slices/cartSlice';
import SnackBarCompletion from './SnackBar';

type ProductCardProps = {
  product : Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();

  const onAddToCart = (payload: Product) => {
    dispatch(addToCart(payload))
  }

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <CardMedia
          component="div"
          sx={{
            // 16:9
            pt: '85%',
          }}
          image={product.images[0]}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {product.title}
          </Typography>
          <Typography gutterBottom>
            {product.description}
          </Typography>
        </CardContent>
        <Typography align='center' variant="h5" color="primary" gutterBottom>
            {product.price}€
          </Typography>
        <CardActions sx={{ display: 'flex', justifyContent: 'center', marginBottom: '.5em'}}>
          {/*<Button variant="contained" size="medium" onClick={() => onAddToCart(product)}>Add to Cart</Button>*/}
          <SnackBarCompletion
            buttonText='Add to Cart'
            message='Product added to cart successfully'
            buttonSize='medium'
            handleButtonClick={() => onAddToCart(product)}
          />
        </CardActions>
      </Card>
    </Grid>
  )
}

export default ProductCard