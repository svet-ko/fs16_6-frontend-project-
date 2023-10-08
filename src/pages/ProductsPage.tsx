import React, { 
  ChangeEvent,
  useEffect,
  useState
} from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {
  createTheme,
  ThemeProvider
} from '@mui/material/styles';
import { 
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  TextField
} from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';

import { AppState } from '../redux/store';
import {
  fetchAllProductsAsync,
  sortByPrice
} from '../redux/slices/productsSlice';
import useAppSelector from '../hooks/useAppSelector';
import useAppDispatch from '../hooks/useDispatch';
import LoadBox from '../components/LoadBox';
import ErrorPage from './ErrorPage';
import useDebounce from '../hooks/useDebounce';
import ProductCard from '../components/ProductCard';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function ProductsPage() {
  const {products, loading, error} = useAppSelector((state: AppState) => state.productReducer); //method to read any state from the global store
  const [search, setSearch] = useState<string>('');
  const [offset, setOffset] = useState<number>(1);
  const [debouncedSearch, setDebouncedSearch] = useState<string | undefined>(search);
  const [sortDirection, setSortDirection] = useState<string>('');
  const dispatch = useAppDispatch();

  let amountOfPages = Math.ceil(products.length/9);
  const paginatedSlice = products.slice((offset - 1) * 9, offset * 9);

  useDebounce(() => setDebouncedSearch(search), search);

  useEffect(() => {
    dispatch(fetchAllProductsAsync({title: search}))//possible to make "fetch more" button which grows the value of offset and limit. Offset and limit is set through the dispatch func
    setSortDirection('')
  }, [debouncedSearch]);

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setOffset(value);
  };

  useEffect(() => {
    if (sortDirection !== '') {
      dispatch(sortByPrice(sortDirection));
    }
  }, [sortDirection])

  const handleSortDirectionChange = (event: SelectChangeEvent<string>) => {
    setSortDirection(event.target.value);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <main>
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
          {error && !loading && (
            <ErrorPage message={error} />
          )}
          {loading && !error && (
            <LoadBox />
          )}

          {!loading && !error && products && (<Grid container spacing={4}>
            {paginatedSlice.map((product) => (
              <ProductCard key={product.id} product={product}/>
            ))}
          </Grid>)}
          <Pagination page={offset} count={amountOfPages} onChange={handlePageChange} color="primary" />
        </Container>
      </main>
    </ThemeProvider>
  );
}