import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from '@mui/material';

import Product from '../types/Product';
import useAppDispatch from '../hooks/useDispatch';
import { addToCart } from '../redux/slices/cartSlice';
import SnackBarCompletion from './SnackBar';
import { Link, useNavigate } from 'react-router-dom';
import { fetchAllProductsAsync } from '../redux/slices/productsSlice';

type ProductCardProps = {
  product : Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const onAddToCart = (payload: Product) => {
    dispatch(addToCart(payload))
  }

  const onCategoriesClick = () => {
    dispatch(fetchAllProductsAsync({categoryId: product.category.id}))
    .then(() => {
    })
    .catch((err) =>
      navigate('/error')
    )
  }
  const isProductsPage = !!(window.location.pathname === '/products');
  const linkToSingleProduct = isProductsPage ? `${product.id}` : `/products/${product.id}`;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
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
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
          >
            {product.title}
          </Typography>
          {!!isProductsPage && (<Typography gutterBottom>
            Category: <Button onClick={onCategoriesClick}>{product.category.name}</Button>
          </Typography>)}
          <Typography gutterBottom>
            {product.description}
          </Typography>
        </CardContent>
        <Typography
          align='center'
          variant="h5"
          color="primary"
          gutterBottom
        >
          {product.price}€
        </Typography>
        <CardActions sx={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '.5em',
          columnGap: '1em'
        }}>
          <SnackBarCompletion
            buttonText='Add to Cart'
            message='Product added to cart successfully'
            buttonSize='small'
            handleButtonClick={() => onAddToCart(product)}
          />
          <Button
            variant="contained"
            size="small"
            sx={{ mb: '1em'}}
            component={Link} to={linkToSingleProduct}
          >
            Read more
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default ProductCard