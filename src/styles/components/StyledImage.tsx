import React from "react";

interface StyledImageProps {
  link: string;
  classes?: string
}

const StyledImage = (props: StyledImageProps) => {
  return <img className={props.classes ? `cart-image ${props.classes}` : 'cart-image'} alt="product" src={props.link} />;
};

export default StyledImage;
