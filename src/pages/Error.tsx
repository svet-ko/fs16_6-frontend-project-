import { Container, Typography } from '@mui/material'
import React from 'react'

type ErrorProps = {
    message : string
}

const ErrorPage = ({ message } : ErrorProps ) => {
  return (
    <Container sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <Typography align="center" variant="h4">{message}</Typography>
    </Container>
  )
}

export default ErrorPage;