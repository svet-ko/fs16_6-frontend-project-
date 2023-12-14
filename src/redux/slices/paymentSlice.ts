import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { BASE_URL } from "../../config/api";
import OrderToCreateItem from "../../types/OrderToCreateItem";
import Payment from "../../types/Payment";
import PaymentToCreate from "../../types/PaymentToCreate";

export interface PaymentsReducerState {
  payments: Payment[];
  currentPayment?: Payment;
  error?: string;
  loading: boolean;
}

export const initialState: PaymentsReducerState = {
  payments: [],
  loading: false,
};

export const fetchPaymentsAsync = createAsyncThunk<
  Payment[],
  string,
  { rejectValue: string }
>("fetchPaymentsAsync", async (accessToken: string, { rejectWithValue }) => {
  try {
    const result = await axios.get(`${BASE_URL}/payments`, {
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

export const createPaymentAsync = createAsyncThunk<
  Payment,
  {
    accessToken: string,
    payment: PaymentToCreate,
  },
  { rejectValue: string }
>("createPaymentAsync", async ({accessToken, payment}, { rejectWithValue }) => {
  try {
    const result = await axios.post(
      `${BASE_URL}/payments`,
      payment,
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

const paymentSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    //collection of actions to be used in the reducer of this slice
    //contains key-value pairs where key is a name of the method (action) and value is a function point to the algorithm of how to proceed with an action
  
  },
  extraReducers(builder) {
    builder.addCase(fetchPaymentsAsync.fulfilled, (state, action) => {
      state.payments = action.payload;
      state.loading = false;
    });

    builder.addCase(fetchPaymentsAsync.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(fetchPaymentsAsync.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    builder.addCase(createPaymentAsync.fulfilled, (state, action) => {
      state.currentPayment = action.payload;
      state.loading = false;
    });

    builder.addCase(createPaymentAsync.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(createPaymentAsync.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

const paymentsReducer = paymentSlice.reducer;

export default paymentsReducer;