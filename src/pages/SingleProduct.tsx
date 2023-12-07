import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import LoadBox from "../components/LoadBox";
import Error from "./Error";
import useAppSelector from "../hooks/useAppSelector";
import { AppState } from "../redux/store";
import useAppDispatch from "../hooks/useDispatch";
import {
  deleteProductAsync,
  fetchOneProductAsync,
} from "../redux/slices/productsSlice";
import SnackBarCompletion from "../components/SnackBar";
import Product from "../types/Product";
import { addToCart } from "../redux/slices/cartSlice";
import InfoTooltip from "../components/InfoTooltip";
import UpdateProductForm from "../components/UpdateProductForm";
import ImageSlider from "../components/ImageSlider";
import CreateProductForm from "../components/CreateProductForm";

const SingleProduct = () => {
  const { currentProduct, loading, error } = useAppSelector(
    (state: AppState) => state.productReducer
  );
  const { currentUser } = useAppSelector(
    (state: AppState) => state.usersReducer
  );

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState<boolean>(false);
  const [isInfoTooltipSuccessed, setIsInfoTooltipSuccessed] =
    useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("Something went wrong");

  const [isUpdateForm, setIsUpdateForm] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const params = useParams<string>();

  const productId: string | undefined = params.productID;

  const jwt = localStorage.getItem('token');

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    dispatch(fetchOneProductAsync(productId as string))
      .unwrap()
      .then(() => {})
      .catch((err) => {
        navigate("error");
      });
  };

  const onAddToCart = (payload: Product) => {
    dispatch(addToCart(payload));
  };

  const onDelete = (productId: string) => {
    dispatch(deleteProductAsync({
      accessToken: jwt as string,
      productId: productId
    }))
      .unwrap()
      .then(() => {
        navigate("/products");
      })
      .catch((err) => {
        setErrorText(err);
        setIsInfoTooltipSuccessed(false);
        setIsInfoTooltipOpen(true);
      });
  };

  const navigate = useNavigate();
  const handleReturn = () => navigate("/");
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        bgcolor: "background.paper",
        minHeight: "100vh",
        pt: 8,
        pb: 6,
      }}
    >
      <Box
        sx={{
          position: "relative",
          minWidth: "60%",
          maxWidth: "90%",
          height: "60%",
          bgcolor: "primary.light",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "2em",
          color: "primary",
          borderRadius: "0.3em",
        }}
      >
        {error && !loading && <Error message={error} />}

        {!error && loading && <LoadBox />}

        {currentProduct && !error && !loading && (
          <>
            <Typography
              color="primary.dark"
              variant="h4"
              align="center"
              gutterBottom
            >
              {currentProduct.title}
            </Typography>
            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "3em",
              }}
            >
              <Grid item xs={12} sm={6} sx={{ mb: "2em" }}>
                <ImageSlider images={currentProduct.images} />
              </Grid>

              <Box maxWidth={"400px"} sx={{ mb: "2em" }}>
                <Typography
                  variant="body1"
                  color="primary.dark"
                  sx={{ fontWeight: "bold" }}
                  gutterBottom
                >
                  Product's category: "{currentProduct.category.name}"
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {currentProduct.description}
                </Typography>
                <Typography
                  sx={{ fontWeight: "bold" }}
                  color="primary.dark"
                  variant="body1"
                  gutterBottom
                >
                  Price: {currentProduct.price}€
                </Typography>

                {currentUser && currentUser.role !== "ADMIN" && (
                  <SnackBarCompletion
                    buttonText="Add to Cart"
                    message="Product added to cart successfully"
                    buttonSize="small"
                    handleButtonClick={() => onAddToCart(currentProduct)}
                  />
                )}

                {currentUser && currentUser.role === "ADMIN" && (
                  <ButtonGroup>
                    <Button
                      sx={{
                        borderColor: "primary.dark",
                        color: "primary.dark",
                      }}
                      variant="outlined"
                      onClick={() => setIsUpdateForm(true)}
                    >
                      Update
                    </Button>
                    <Button
                      sx={{
                        borderColor: "primary.dark",
                        color: "primary.dark",
                      }}
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      onClick={() => onDelete(currentProduct._id)}
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                )}
              </Box>
            </Grid>
            <Button
              variant="contained"
              onClick={handleReturn}
              sx={{ mb: "1em" }}
            >
              Return to Home page
            </Button>
            {currentUser && currentUser.role === "ADMIN" && isUpdateForm && (
              <>
                <UpdateProductForm
                  onGetProduct={getProduct}
                  productId={currentProduct._id}
                />
                <Button onClick={() => setIsUpdateForm(false)}>
                  Hide form
                </Button>
              </>
            )}
          </>
        )}
        <Box>
          <CreateProductForm />
        </Box>
      </Box>
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={() => setIsInfoTooltipOpen(false)}
        isSuccessed={isInfoTooltipSuccessed}
        successText="User successfully created"
        errorText={errorText}
      />
    </Container>
  );
};

export default SingleProduct;
