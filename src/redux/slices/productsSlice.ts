import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { AxiosError, AxiosResponse } from "axios"

import Product from "../../types/Product"
import PaginationQuery from "../../types/PaginationQuery"
import UpdationOfProductRequest from "../../types/UpdationOfProductRequest"
import { BASE_URL } from "../../config/api"
import ProductToCreate from "../../types/ProductToCreate"

export interface ProductsReducerState {
  products: Product[],
  currentProduct?: Product,
  error?: string,
  loading: boolean
}

export const initialState: ProductsReducerState = {
  products: [],
  loading: false
}

export const fetchAllProductsAsync = createAsyncThunk<Product[], PaginationQuery, { rejectValue: string }>(
  'fetchAllProductsAsync',
  async (fetchParams, { rejectWithValue }) => {
    try {
      const response = await axios.get<any, AxiosResponse<Product[]>>(`${BASE_URL}/products`, {
        params: {
          ...fetchParams,
        }
      });
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.message);
    }
  }
)

export const fetchOneProductAsync = createAsyncThunk<Product, number, { rejectValue: string }>(
  'fetchOneProductAsync',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get<any, AxiosResponse<Product>>(`${BASE_URL}/products/${id}`)
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.message);
    }
  }
)

export const updateProductAsync = createAsyncThunk<Product, UpdationOfProductRequest, { rejectValue: string }>(
  'updateProduct',
  async ({id, update}, { rejectWithValue }) => {
    try {
      const response = await axios.put<any, AxiosResponse<Product>>(`${BASE_URL}/products/${id}`, update);
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.message);
    }
  }
)

export const createProductAsync = createAsyncThunk<Product, ProductToCreate, { rejectValue: string }>(
  'createProduct',
  async (product, { rejectWithValue }) => {
    try {
      const response = await axios.post<Product>(`${BASE_URL}/products/`, product);
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.message);
    }
  }
)

export const deleteProductAsync = createAsyncThunk<number, number, { rejectValue: string }>(
  'deleteProduct',
  async (productId: number, { rejectWithValue }) => {
    try {
      const response = await axios.delete<AxiosResponse<boolean>>(`${BASE_URL}/products/${productId}`);
      if (response.data) {
        return productId;
      } else {
        throw new AxiosError('Product was not deleted');
      }
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.message);
    }
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: { //collection of actions to be used in the reducer of this slice
    //contains key-value pairs where key is a name of the method (action) and value is a function point to the algorithm of how to proceed with an action

    sortByPrice: (state, action:  PayloadAction<string>) => {
      if (action.payload === 'asc') {
        state.products.sort((a,b) => a.price - b.price)
      } else {
        state.products.sort((a,b) => b.price - a.price)
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProductsAsync.fulfilled, (state, action) => { //data, which func in the first parameter returns is put as a payload of an action of the second callback func
      state.products = action.payload;
      state.loading = false;
    })

    builder.addCase(fetchAllProductsAsync.pending, (state, action) => {
      state.loading = true;
    })

    builder.addCase(fetchAllProductsAsync.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    })

    builder.addCase(fetchOneProductAsync.fulfilled, (state, action) => {
      state.currentProduct = action.payload;
      state.loading = false;
    })

    builder.addCase(fetchOneProductAsync.pending, (state, action) => {
      state.loading = true;
    })

    builder.addCase(fetchOneProductAsync.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    })

    builder.addCase(updateProductAsync.fulfilled, (state, action) => {
      const id = action.payload.id;
      const foundIndex = state.products.findIndex(product => product.id === id)
      if (foundIndex !== -1) {
        state.products[foundIndex] = action.payload;
      }
    })

    builder.addCase(updateProductAsync.pending, (state, action) => {
      state.loading = true;
    })

    builder.addCase(updateProductAsync.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    })

    builder.addCase(createProductAsync.fulfilled, (state, action) => {
      state.products.push(action.payload);
      state.loading = false;
    })

    builder.addCase(createProductAsync.pending, (state, action) => {
      state.loading = true;
    })

    builder.addCase(createProductAsync.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    })

    builder.addCase(deleteProductAsync.fulfilled, (state, action) => {
      const foundIndex = state.products.findIndex(p => p.id === action.payload);
      state.products.splice(foundIndex, 1);
      state.loading = false;
    })

    builder.addCase(deleteProductAsync.pending, (state, action) => {
      state.loading = true;
    })

    builder.addCase(deleteProductAsync.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    })
  }
})

const productsReducer = productsSlice.reducer;

export const { sortByPrice } = productsSlice.actions;

export default productsReducer;