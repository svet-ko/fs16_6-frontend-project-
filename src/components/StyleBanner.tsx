import React from 'react'

interface StyledBannerProps {
  link: string;
}

const StyledBanner = ({link}: StyledBannerProps) => {
  return (
    <img className='cart-image banner' alt="product" src={link} />
  )
}

export default StyledBanner