import React from 'react';
import { Box } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import StyledImage from '../styles/components/StyledImage';

type ImageSliderPropsType = {
  images: string[];
};

const ImageSlider: React.FC<ImageSliderPropsType> = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return !images.length ? null : (
    <Slider {...settings}>
      {images.map((image, index) => (
        <Box key={index}>
          <StyledImage
            link={image}
            classes='slider-image'
          />
        </Box>
      ))}
    </Slider>
  );
};

export default ImageSlider;