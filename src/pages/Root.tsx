import React from 'react'
import { Outlet } from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/Footer'
import { CssBaseline } from '@mui/material'


const Root = () => {
  return (
    <>
      <CssBaseline />
      <Header/>
      <Outlet />
      <Footer />
    </>
  )
}

export default Root