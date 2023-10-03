import { PayloadAction, createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit"
import axios, { AxiosError, AxiosResponse } from "axios"

import Product from "../../types/Product"
import PaginationQuery from "../../types/PaginationQuery"
import UpdationOfProductRequest from "../../types/UpdationOfProductRequest"
import { BASE_URL } from "../../config/api"
import ProductToCreate from "../../types/ProductToCreate"

export interface ProductsReducerState {
  products: Product[],
  error?: string,
  loading: boolean
}

export const initialState: ProductsReducerState = {
  products: [],
  loading: false
}

export const fetchAllProductsAsync = createAsyncThunk(
  'fetchAllProductsAsync',
  async ({limit, offset}: PaginationQuery) => {
    try {
      const response = await axios.get<any, AxiosResponse<Product[]>>(`${BASE_URL}/products?offset=${offset}&limit=${limit}`);
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return error.message;
    }
  }
)

export const updateProduct = createAsyncThunk(
  'updateProduct',
  async ({id, update}: UpdationOfProductRequest) => {
    try {
      const response = await axios.put<any, AxiosResponse<Product>>(`${BASE_URL}/products/${id}`, update);
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return error.message;
    }
  }
)

export const createProduct = createAsyncThunk(
  'createProduct',
  async (product: ProductToCreate) => {
    try {
      const response = await axios.post<any, AxiosResponse<Product>>(`${BASE_URL}/products/`, product);
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return error.message;
    }
  }
)

export const deleteProduct = createAsyncThunk(
  'deleteProduct',
  async (productId: number) => {
    try {
      const response = await axios.delete<AxiosResponse<boolean>>(`${BASE_URL}/products/${productId}`);
      if (response.data) {
        return productId;
      } else {
        throw new AxiosError('Product was not deleted');
      }
    } catch (err) {
      const error = err as AxiosError;
      return error.message;
    }
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: { //collection of actions to be used in the reducer of this slice
    //contains key-value pairs where key is a name of the method (action) and value is a function point to the algorithm of how to proceed with an action

    sortByPrice: (state, action:  PayloadAction<'asc' | 'desc'>) => {
      if (action.payload === 'asc') {
        state.products.sort((a,b) => a.price - b.price)
      } else {
        state.products.sort((a,b) => b.price - a.price)
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProductsAsync.fulfilled, (state, action) => { //data, which func in the first parameter returns is put as a payload of an action of the second callback func
      console.log('fulfilled');
      if (typeof action.payload !== 'string') {
        return {
          ...state,
          products: action.payload,
          loading: false
        }
      }
    })

    builder.addCase(fetchAllProductsAsync.pending, (state, action) => {
      console.log('pending');
      return {
        ...state,
        loading: true
      }
    })

    builder.addCase(fetchAllProductsAsync.rejected, (state, action) => {
      console.log('rejected');
      if (typeof action.payload === 'string') {
        return {
          ...state,
          error: action.payload,
          loading: false
        }
      }
    })

    builder.addCase(updateProduct.fulfilled, (state, action) => {
      if (typeof action.payload !== 'string') {
        const id = action.payload.id;
        const foundIndex = state.products.findIndex(product => product.id === id)
        if (foundIndex !== -1) {
          state.products[foundIndex] = action.payload;
        }
      }
    })

    builder.addCase(updateProduct.pending, (state, action) => {
      return {
        ...state,
        loading: true
      }
    })

    builder.addCase(updateProduct.rejected, (state, action) => {
      if (typeof action.payload === 'string') {
        return {
          ...state,
          error: action.payload,
          loading: false
        }
      }
    })

    builder.addCase(createProduct.fulfilled, (state, action) => {
      console.log(action.payload);
      if (typeof action.payload !== 'string') {
        state.products.push(action.payload);
      }
      state.loading = false;
    })

    builder.addCase(createProduct.pending, (state, action) => {
      console.log('pending');
      return {
        ...state,
        loading: true
      }
    })

    builder.addCase(createProduct.rejected, (state, action) => {
      console.log('rejected');
      if (typeof action.payload === 'string') {
        return {
          ...state,
          error: action.payload,
          loading: false
        }
      }
    })

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      if (typeof action.payload === 'number') {
        const foundIndex = state.products.findIndex(p => p.id === action.payload);
        state.products.splice(foundIndex, 1);
        state.loading = false;
      }
    })

    builder.addCase(deleteProduct.pending, (state, action) => {
      return {
        ...state,
        loading: true
      }
    })

    builder.addCase(deleteProduct.rejected, (state, action) => {
      if (typeof action.payload === 'string') {
        return {
          ...state,
          error: action.payload,
          loading: false
        }
      }
    })

  }
})

const productsReducer = productsSlice.reducer;

export const { sortByPrice } = productsSlice.actions;

export default productsReducer;