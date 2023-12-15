import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

import Product from "../types/Product";
import useAppDispatch from "../hooks/useDispatch";
import { addToCart } from "../redux/slices/cartSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchAllProductsAsync } from "../redux/slices/productsSlice";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onAddToCart = (payload: Product) => {
    dispatch(addToCart(payload));
  };

  const onCategoriesClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    dispatch(fetchAllProductsAsync({ categoryId: product.category._id }))
      .then(() => {})
      .catch((err) => navigate("/error"));
  };

  const location = useLocation();
  const isProductsPage = !!(location.pathname === "/products");
  const linkToSingleProduct = isProductsPage
    ? `${product._id}`
    : `/products/${product._id}`;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
          transition: "transform 0.2s",
          "&:hover": {
            transform: "scale(1.1)",
          },
          cursor: "pointer",
        }}
      >
        <CardActions
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
          onClick={() => {
            navigate(linkToSingleProduct);
          }}
        >
          <CardMedia
            component="img"
            height="210"
            image={product.images[0]}
            alt={product.title}
            style={{
              objectFit: "cover",
              width: "100%",
              borderRadius: "0.5rem",
            }}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2">
              {product.title}
            </Typography>
            {!!isProductsPage && (
              <Typography gutterBottom>
                Category:{" "}
                <Button onClick={onCategoriesClick}>
                  {product.category.name}
                </Button>
              </Typography>
            )}
            <Typography gutterBottom>{product.description}</Typography>
          </CardContent>
        </CardActions>
        <Box
          sx={{
            mb: "1em",
          }}
        >
          <Typography align="center" variant="h5" color="primary" gutterBottom>
            {product.price}€
          </Typography>
          <Button
            variant="contained"
            aria-label="complete-purchase"
            size="small"
            sx={{ mb: "1em" }}
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </Button>
        </Box>
      </Card>
    </Grid>
  );
};

export default ProductCard;
