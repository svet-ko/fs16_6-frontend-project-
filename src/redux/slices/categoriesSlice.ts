import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import Category from "../../types/Category";
import { BASE_URL } from "../../config/api";

export interface CategoriesReducerState{
  categories: Category[],
  loading: boolean,
  error?: string
}

const initialState: CategoriesReducerState = {
  categories: [],
  loading: false,
}

export const fetchAllCategoriesAsync = createAsyncThunk<Category[], void, { rejectValue: string }>(
  'fetchAllCategories',
  async (_, { rejectWithValue }) => {
    try {
      const result = await axios.get(`${BASE_URL}/categories`);
      return result.data
    } catch (e) {
      const error = e as Error
      return rejectWithValue(error.message)
    }
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.loading = false;
    })

    builder.addCase(fetchAllCategoriesAsync.pending, (state, action) => {
      state.loading = true;
    })

    builder.addCase(fetchAllCategoriesAsync.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    })
  }
})

const categoriesReducer = categoriesSlice.reducer;

export default categoriesReducer;