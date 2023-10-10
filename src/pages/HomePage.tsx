import React, { useEffect } from 'react'
import { Box, Button, Container, Grid, Typography } from '@mui/material'

import banner from '../images/banner.jpg'
import registerImg from '../images/registerImg.jpg'
import StyledImage from '../components/StyledImage'
import { AppState } from '../redux/store'
import useAppSelector from '../hooks/useAppSelector'
import ProductCard from '../components/ProductCard'
import useAppDispatch from '../hooks/useDispatch'
import { fetchAllProductsAsync } from '../redux/slices/productsSlice'
import ErrorPage from './ErrorPage'
import LoadBox from '../components/LoadBox'
import { Link } from 'react-router-dom'
import StyledBanner from '../components/StyleBanner'

const HomePage = () => {

  const {products, loading, error} = useAppSelector((state: AppState) => state.productReducer);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(fetchAllProductsAsync({}))//possible to make "fetch more" button which grows the value of offset and limit. Offset and limit is set through the dispatch func
  }, []);

  const saleSlice = products.slice(0, 3);

  return (
    <Container sx={{
      bgcolor: 'background.paper',
      pt: 8,
      pb: 6,
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <StyledBanner link={banner} />

      <Typography variant="h4" color='primary' sx={{mt: '1em'}} gutterBottom>Our new arrivals:</Typography>

      {error && !loading && (
        <ErrorPage message={error} />
      )}

      {loading && !error && (
        <LoadBox />
      )}

      {!loading && !error && products && (<Grid container spacing={4} sx={{mb: '2em'}}>
        {saleSlice.map((product) => (
          <ProductCard key={product.id} product={product}/>
        ))}
      </Grid>)}
      <Button component={Link} to="/products" variant="contained" aria-label="move-to-products" size="large">click to explore more!</Button>
      <Box sx={{
        pt: 8,
        pb: 6,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
        rowGap: "1em"
      }}>
        <Box sx={{
          maxWidth: "40%"
        }}>
          <Typography
            variant="h5"
            gutterBottom
          >
            Still not our client?
          </Typography>
          <Typography
            align="left"
            gutterBottom
          >
            Register now to get 20% off your frst order and explore the ocean of our promotions!
          </Typography>
          <Button
            variant="contained"
            aria-label="register"
            size="medium"
            component={Link} to={`/register`}
          >I'm in!</Button>
        </Box>
        <StyledImage link={registerImg}/>
      </Box>
    </Container>
  )
}

export default HomePage;