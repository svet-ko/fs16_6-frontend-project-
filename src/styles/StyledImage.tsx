import React from 'react'

interface StyledImageProps {
  link: string;
}

const StyledImage = ({link}: StyledImageProps) => {
  return (
    <img className='cart-image' alt="product" src={link} />
  )
}

export default StyledImage