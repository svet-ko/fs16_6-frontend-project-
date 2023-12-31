import {
  Box,
  Button,
  Grid,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import InfoTooltip from "./InfoTooltip";
import useAppDispatch from "../hooks/useDispatch";
import { createProductAsync } from "../redux/slices/productsSlice";
import CategoriesFormControl from "./CategoriesFormControl";

const CreateProductForm = () => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState<string | undefined>();
  const [price, setPrice] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [categoryId, setCategoryId] = useState<string | undefined>();
  const [images, setImages] = useState<Array<string> | undefined>();

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isInfoTooltipSuccessed, setIsInfoTooltipSuccessed] = useState(false);

  const jwt = localStorage.getItem('token');

  const isFormValid =
    !!title && !!price && !!description && !!categoryId && !!images;
    
  const handleCategoryIdChange = (
    event: SelectChangeEvent<string | number>
  ) => {
    setCategoryId(event.target.value as string);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      createProductAsync({
        accessToken: jwt as string,
        product: {
          title: title as string,
          price: Number(price),
          description: description as string,
          categoryId: categoryId as string,
          images: images as Array<string>,
      }
    })
    )
      .unwrap()
      .then(() => {
        setIsInfoTooltipSuccessed(true);
      })
      .catch((err) => {
        setIsInfoTooltipSuccessed(false);
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      });
  };

  return (
    <Box
      maxWidth="400px"
      sx={{
        p: "1em",
        borderRadius: "0.3em",
        backgroundColor: "secondary.light",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" color="secondary">
          Create new product
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                sx={{ zIndex: 0 }}
                autoComplete="title"
                name="title"
                required
                fullWidth
                id="title"
                label="Title"
                autoFocus
                value={title || ""}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="price"
                label="Price"
                name="price"
                value={price || ""}
                onChange={(e) => setPrice(e.target.value)}
                sx={{ zIndex: 0 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="secondary"
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                value={description || ""}
                onChange={(e) => setDescription(e.target.value)}
                sx={{ zIndex: 0 }}
              />
            </Grid>
            <Grid item xs={12}>
              <CategoriesFormControl
                selectValue={categoryId || ""}
                onItemChange={(e) => handleCategoryIdChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="secondary"
                required
                fullWidth
                id="images"
                label="Images"
                name="images"
                value={images || []}
                onChange={(e) => setImages(e.target.value.split(","))}
                sx={{ zIndex: 0 }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!isFormValid}
          >
            create product
          </Button>
        </Box>
      </Box>
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={() => setIsInfoTooltipOpen(false)}
        isSuccessed={isInfoTooltipSuccessed}
        successText="Product successfully created"
        errorText="Something went wrong! Try again."
      />
    </Box>
  );
};

export default CreateProductForm;
