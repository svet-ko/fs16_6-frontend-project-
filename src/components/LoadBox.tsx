import { Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'

const LoadBox = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "2em",
        marginBottom: "2em"
      }}
    >
      <Typography variant="body1" gutterBottom>
        Loading in progress
      </Typography>
      <CircularProgress color="primary"/>
    </Box>
  )
}

export default LoadBox