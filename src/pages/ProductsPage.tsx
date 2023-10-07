import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent, TextField } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';

import { AppState } from '../redux/store';
import { fetchAllProductsAsync, sortByPrice } from '../redux/slices/productsSlice';
import { addToCart } from '../redux/slices/cartSlice';
import useAppSelector from '../hooks/useAppSelector';
import useAppDispatch from '../hooks/useDispatch';
import { getFiltered } from '../redux/selectors/getFiltered';
import LoadBox from '../components/LoadBox';
import ErrorPage from './ErrorPage';
import useDebounce from '../hooks/useDebounce';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function ProductsPage() {
  const {products, loading, error} = useAppSelector((state: AppState) => state.productReducer); //method to read any state from the global store
  const [search, setSearch] = useState<string | undefined>();
  const [offset, setOffset] = useState<number>(1);
  const [debouncedSearch, setDebouncedSearch] = useState<string | undefined>(search);
  const [sortDirection, setSortDirection] = useState<string | undefined>();
  const dispatch = useAppDispatch();
  //const cart = useAppSelector((state: AppState) => state.cartReducer);
  let amountOfPages = Math.ceil(products.length/9);
  const paginatedSlice = products.slice((offset - 1) * 9, offset * 9);

  useDebounce(() => setDebouncedSearch(search), search);

  useEffect(() => {
    dispatch(fetchAllProductsAsync({title: search}))//possible to make "fetch more" button which grows the value of offset and limit. Offset and limit is set through the dispatch func
  }, [debouncedSearch]);

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setOffset(value);
  };

  useEffect(() => {
    if (sortDirection) {
      dispatch(sortByPrice(sortDirection));
    }
  }, [sortDirection])

  type SortDirectionsTypes = 'asc' | 'desc';

  const handleSortDirectionChange = (event: SelectChangeEvent<string>) => {
    setSortDirection(event.target.value);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Meet our products:
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Something short and leading about the collection below—its contents,
              the creator, etc. Make it short and sweet, but not too short so folks
              don&apos;t simply skip over it entirely.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <TextField
                id="outlined-controlled"
                label="Search for item"
                value={search}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setSearch(event.target.value);
                }}
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Sort by:</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sortDirection}
                  label="Sort by"
                  onChange={handleSortDirectionChange}
                >
                  <MenuItem value={'asc'}>Ascending</MenuItem>
                  <MenuItem value={'desc'}>Descending</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8, display: 'flex', alignItems: 'center', justifyContent: "center", flexDirection: 'column', rowGap: 5}} maxWidth="md">
          {/* End hero unit */}
          {error && !loading && (
            <ErrorPage message={error} />
          )}
          {loading && !error && (
            <LoadBox />
          )}

          {!loading && !error && products && (<Grid container spacing={4}>
            {paginatedSlice.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '85%',
                    }}
                    image={product.images[0]}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {product.title}
                    </Typography>
                    <Typography gutterBottom>
                      {product.description}
                    </Typography>
                  </CardContent>
                  <Typography align='center' variant="h5" color="primary" gutterBottom>
                      {product.price}€
                    </Typography>
                  <CardActions sx={{ display: 'flex', justifyContent: 'center', marginBottom: '.5em'}}>
                    <Button variant="contained" size="medium">Add to Cart</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>)}
          <Pagination page={offset} count={amountOfPages} onChange={handlePageChange} color="primary" />
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}