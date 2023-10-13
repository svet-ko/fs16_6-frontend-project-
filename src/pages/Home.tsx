import React, { useEffect } from 'react'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

import banner from '../images/banner.jpg'
import registerImg from '../images/registerImg.jpg'
import StyledImage from '../styles/components/StyledImage'
import { AppState } from '../redux/store'
import useAppSelector from '../hooks/useAppSelector'
import ProductCard from '../components/ProductCard'
import useAppDispatch from '../hooks/useDispatch'
import { fetchAllProductsAsync } from '../redux/slices/productsSlice'
import Error from './Error'
import LoadBox from '../components/LoadBox'
import StyledBanner from '../styles/components/StyledBanner'

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
      pb: 4,
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <StyledBanner link={banner} />
      <Typography variant="h4" color='primary' sx={{mt: '1em'}} gutterBottom>Our new arrivals:</Typography>

      {error && !loading && (
        <Error message={error} />
      )}

      {loading && !error && (
        <LoadBox />
      )}

      {!loading && !error && products && (<Grid container spacing={4} sx={{ mb: '1em'}}>
        {saleSlice.map((product) => (
          <ProductCard key={product.id} product={product}/>
        ))}
      </Grid>)}

      <Box sx={{
        width: '100%',
        pt: 4,
        pb: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Button component={Link} to="/products" variant="contained" aria-label="move-to-products" size="large">click to explore more!</Button>
      </Box>

      <Box sx={{
        pt: '2em',
        pb: '2em',
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
        rowGap: "1em",
        //backgroundColor: '#AFDAFC',
        bgcolor: 'primary.light',
        borderRadius: '0.3em'
      }}>

        <Box sx={{
          maxWidth: "40%",
        }}>
          <Typography
            variant="h5"
            color='primary'
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
          >
            I'm in!
          </Button>
        </Box>

        <StyledImage link={registerImg}/>
      </Box>

    </Container>
  )
}

export default HomePage;