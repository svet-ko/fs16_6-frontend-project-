import React, { useState } from 'react'
import {
  Box,
  Button,
  Grid,
  SelectChangeEvent,
  TextField, 
  Typography
} from '@mui/material';

import useAppDispatch from '../hooks/useDispatch';
import { updateProductAsync } from '../redux/slices/productsSlice';
import InfoTooltip from './InfoTooltip';
import ProductToCreate from '../types/ProductToCreate';
import CategoriesFormControl from './CategoriesFormControl';

type UpdateProductFormProps = {
  onGetProduct: () => void
  productId: number
}

const UpdateProductForm = ({onGetProduct, productId}: UpdateProductFormProps) => {
   const dispatch = useAppDispatch();

  const [title, setTitle] = useState<string | undefined>();
  const [price, setPrice] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [categoryId, setCategoryId] = useState<number | undefined>();
  const [images, setImages] = useState<Array<string> | undefined>();

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isInfoTooltipSuccessed, setIsInfoTooltipSuccessed] = useState(false);
  const [errorText, setErrorText] = useState<string>('Something went wrong');

  const isFormValid = !!title || !!price || !!description || !!categoryId || !!images;
  const productToUpdate: Partial<ProductToCreate> = {};

  const handleCategoryIdChange = (event: SelectChangeEvent<number>) => {
    console.log(event.target.value);
    setCategoryId(Number(event.target.value))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (title) {
      productToUpdate.title = title as string;
    }

    if (price) {
      productToUpdate.price = Number(price);
    }
    
    if (description) {
      productToUpdate.description = description;
    }

    if (categoryId) { 
      productToUpdate.categoryId = categoryId;
    }

    if (images) {
      productToUpdate.images = images;
    }

    event.preventDefault();
    dispatch(updateProductAsync({ id: productId, update: productToUpdate }))
    .unwrap()
    .then(() => {
      onGetProduct();
    })
    .catch((err) => {
      setErrorText(err);
      setIsInfoTooltipSuccessed(false);
    })
    .finally(() => {
      setIsInfoTooltipOpen(true);
    })
  };

  return (
    <Box maxWidth="400px" sx={{
      borderRadius: '0.3em',
      p: '1em',
      backgroundColor: 'white'
    }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" color='primary'>
            Update product
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="title"
                  name="title"
                  fullWidth
                  id="title"
                  label="Title"
                  autoFocus
                  value={title|| ''}
                  onChange={(e) => setTitle(e.target.value)}
                  sx={{zIndex: 0}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="price"
                  label="Price"
                  name="price"
                  value={price || ''}
                  onChange={(e) => setPrice((e.target.value))}
                  sx={{zIndex: 0}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                  value={description || ''}
                  onChange={(e) => setDescription(e.target.value)}
                  sx={{zIndex: 0}}
                />
              </Grid>
              <Grid item xs={12}>
                {(<CategoriesFormControl selectValue={categoryId || ''} onItemChange={(e) => handleCategoryIdChange(e)} /> )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="images"
                  label="Images"
                  name="images"
                  value={images || ''}
                  onChange={(e) => setImages(e.target.value.split(','))}
                  sx={{zIndex: 0}}
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
              update product
            </Button>
          </Box>
        </Box>
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={() => setIsInfoTooltipOpen(false)}
        isSuccessed={isInfoTooltipSuccessed}
        successText='Product successfully updated'
        errorText={errorText}
      />
    </Box>
  )
}

export default UpdateProductForm