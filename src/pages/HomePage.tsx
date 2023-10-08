import React from 'react'
import banner from '../images/banner.jpg'
import StyledImage from '../components/StyledImage'
import { Container } from '@mui/material'

const HomePage = () => {
  return (
    <Container>
      <StyledImage link={banner} />
    </Container>
  )
}

export default HomePage;