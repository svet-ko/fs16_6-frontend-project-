import React, { useState } from 'react'
import useAppSelector from '../hooks/useAppSelector'
import { Box, Button, ButtonGroup, Container, TextField, Typography } from '@mui/material';
import StyledImage from '../components/StyledImage';
import { Link } from 'react-router-dom';
import Error from './Error';
import LoadBox from '../components/LoadBox';
import CreateProductForm from '../components/CreateProductForm';

const ProfilePage = () => {
  const {currentUser, loading, error} = useAppSelector(state => state.usersReducer);
  return (
    <Container sx={{
      bgcolor: 'background.paper',
      pt: 8,
      pb: 6
    }}>
      {loading && !error && (
        <LoadBox />
      )}
      
      {!loading && error && (
        <Error message={error} />
      )}

      {!error && !loading && currentUser && (
        <Box sx={{display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          backgroundColor: '#AFDAFC',
          borderRadius: '0.3em',
          p: '2em',
          rowGap: '1em'
        }}>
          <Box>
            <Typography variant="h2" component="h1" color='primary' gutterBottom>{currentUser.name}'s profile</Typography>
            <StyledImage link={currentUser.avatar} />
            <Typography variant="body1" gutterBottom fontSize={20}>My e-mail: {currentUser.email}</Typography>
            <Button variant='contained' component={Link} to={`/cart`}>Visit cart</Button>
          </Box>
          <Box>
            <CreateProductForm />
          </Box>
        </Box>
      )}
    </Container>
  )
}

export default ProfilePage