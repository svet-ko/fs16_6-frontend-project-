import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import LoadBox from '../components/LoadBox';
import Error from './Error';
import useAppSelector from '../hooks/useAppSelector';
import { AppState } from '../redux/store';
import useAppDispatch from '../hooks/useDispatch';
import { deleteProductAsync, fetchOneProductAsync } from '../redux/slices/productsSlice';
import StyledImage from '../styles/components/StyledImage';
import SnackBarCompletion from '../components/SnackBar';
import Product from '../types/Product';
import { addToCart } from '../redux/slices/cartSlice';
import InfoTooltip from '../components/InfoTooltip';
import UpdateProductForm from '../components/UpdateProductForm';

const SingleProduct = () => {
  const {currentProduct, loading, error } = useAppSelector((state: AppState) => state.productReducer);
  const {currentUser} = useAppSelector((state: AppState) => state.usersReducer);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState<boolean>(false);
  const [isInfoTooltipSuccessed, setIsInfoTooltipSuccessed] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('Something went wrong');

  const [isUpdateForm, setIsUpdateForm] = useState<boolean>(false)
  
  const dispatch = useAppDispatch();

  const params = useParams<string>();

  const productId: number | undefined = Number(params.productID);

  useEffect(() => {
    getProduct();
  }, [])

  const getProduct = async () => {
    dispatch(fetchOneProductAsync(productId))
      .unwrap()
      .then(() => {
      })
      .catch((err) => {
        navigate('error')
      }) 
  }

  const onAddToCart = (payload: Product) => {
    dispatch(addToCart(payload))
  }

  const onDelete = (productId: number) => {
    dispatch(deleteProductAsync(productId))
    .unwrap()
    .then(() => {
      navigate('/products');
    })
    .catch((err) => {
      setErrorText(err)
      setIsInfoTooltipSuccessed(false);
      setIsInfoTooltipOpen(true);
    })
  }

  const navigate = useNavigate();
  const handleReturn = () => navigate('/');
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "2em",
        marginBottom: "2em"
      }}
    >
      <Box 
      sx={{
        minWidth: '60%',
        maxWidth: '90%',
        backgroundColor: '#AFDAFC',
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1em",
        color: "primary",
        borderRadius: '0.3em'
      }}
    >
      {error && !loading && (
        <Error message={error} />
      )}

      {!error && loading && (
        <LoadBox />
      )}

        {currentProduct && !error && !loading && (
          <>
            <Typography sx={{color:'#1976d2'}} variant="h4" align="center" gutterBottom>
              {currentProduct.title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: 'wrap'
              }}
            >
              <Box maxWidth={'200px'}>
                <StyledImage link={currentProduct.images[0]} />
              </Box>

              <Box maxWidth={'400px'}>
                <Typography variant="body1" gutterBottom>
                Product's category: "{currentProduct.category.name}"
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {currentProduct.description}
                </Typography>
                <Typography sx={{fontWeight: 'bold'}} color='primary' variant="body1" gutterBottom>
                  Price: {currentProduct.price}€
                </Typography>

                {currentUser && (currentUser.role !== 'admin') && (
                  <SnackBarCompletion
                    buttonText='Add to Cart'
                    message='Product added to cart successfully'
                    buttonSize='small'
                    handleButtonClick={() => onAddToCart(currentProduct)}
                  />
                )}

                {currentUser && (currentUser.role === 'admin') && (
                    <ButtonGroup>
                      <Button variant="outlined" onClick={() => setIsUpdateForm(true)}>Update</Button>
                      <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        onClick={() => onDelete(currentProduct.id)}
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                )}

              </Box>
            </Box>
          <Button variant="contained" onClick={handleReturn} sx={{mb: '1em'}}>Return to Home page</Button>
          {currentUser && (currentUser.role === 'admin') && isUpdateForm &&(
            <>
              <UpdateProductForm onGetProduct={getProduct} productId={currentProduct.id} />
              <Button onClick={() => setIsUpdateForm(false)}>Hide form</Button>
            </>
          )}
        </>
        )}
      </Box>
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={()=>setIsInfoTooltipOpen(false)}
        isSuccessed={isInfoTooltipSuccessed}
        successText='User successfully created'
        errorText={errorText}
      />
    </Container>
  )
}

export default SingleProduct;