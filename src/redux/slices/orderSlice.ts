import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";

import Order from "../../types/Order";
import { BASE_URL } from "../../config/api";
import OrderItem from "../../types/OrderItem";

export interface OrdersReducerState {
  orders: Order[];
  currentOrder?: Order;
  error?: string;
  loading: boolean;
}

export const initialState: OrdersReducerState = {
  orders: [],
  loading: false,
};

export const fetchOrdersAsync = createAsyncThunk<
  Order[],
  string,
  { rejectValue: string }
>("fetchOrdersAsync", async (accessToken: string, { rejectWithValue }) => {
  try {
    const result = await axios.get(`${BASE_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return result.data;
  } catch (e) {
    const error = e as Error;
    return rejectWithValue(error.message);
  }
});

export const createOrderAsync = createAsyncThunk<
  Order,
  {
    accessToken: string,
    order: OrderItem[],
    userId: string
  },
  { rejectValue: string }
>("createOrderAsync", async ({accessToken, order, userId}, { rejectWithValue }) => {
  try {
    const result = await axios.post(
      `${BASE_URL}/orders/checkout/${userId}`,
      order,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return result.data;
  } catch (e) {
    const error = e as Error;
    return rejectWithValue(error.message);
  }
});

export const fetchOrdersByUserAsync = createAsyncThunk<
  Order[],
  {
    accessToken: string,
    userId: string
  },
  { rejectValue: string }
>("fetchOrdersByUserAsync", async ({ accessToken, userId }, { rejectWithValue }) => {
  try {
    const result = await axios.get(
      `${BASE_URL}/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return result.data;
  } catch (e) {
    const error = e as Error;
    return rejectWithValue(error.message);
  }
})

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    //collection of actions to be used in the reducer of this slice
    //contains key-value pairs where key is a name of the method (action) and value is a function point to the algorithm of how to proceed with an action
  
  },
  extraReducers(builder) {
    builder.addCase(fetchOrdersAsync.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.loading = false;
    });

    builder.addCase(fetchOrdersAsync.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(fetchOrdersAsync.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    builder.addCase(createOrderAsync.fulfilled, (state, action) => {
      state.currentOrder = action.payload;
      state.loading = false;
    });

    builder.addCase(createOrderAsync.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(createOrderAsync.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    builder.addCase(fetchOrdersByUserAsync.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.loading = false;
    });

    builder.addCase(fetchOrdersByUserAsync.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(fetchOrdersByUserAsync.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

const ordersReducer = ordersSlice.reducer;

export default ordersReducer;