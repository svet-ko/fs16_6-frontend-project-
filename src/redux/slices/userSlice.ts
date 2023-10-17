import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { BASE_URL } from "../../config/api";
import User from "../../types/User";
import UserCredentials from "../../types/UserCredentials";
import UserToCreate from "../../types/UserToCreate";
import { JWTPair } from "../../types/JwtPair";

export interface UserReducerState {
  users: User[];
  currentUser?: User;
  loading: boolean;
  error?: string;
}

export const initialState: UserReducerState = {
  users: [],
  loading: false,
};

export const fetchAllUsersAsync = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>("fetchUsersAsync", async (_, { rejectWithValue }) => {
  try {
    const result = await axios.get(`${BASE_URL}/users`);
    return result.data;
  } catch (e) {
    const error = e as Error;
    return rejectWithValue(error.message);
  }
});

export const getUserProfile = createAsyncThunk<
  User,
  string,
  { rejectValue: string }
>("getUserProfile", async (accessToken: string, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    return rejectWithValue(error.message);
  }
});

export const authUserAsync = createAsyncThunk<
  JWTPair,
  UserCredentials,
  { rejectValue: string }
>("authUser", async (cred, { rejectWithValue }) => {
  try {
    const result = await axios.post(`${BASE_URL}/auth/login`, cred);
    if (typeof result.data === "string") {
      throw new Error("User was not authenticated");
    }
    return result.data;
  } catch (err) {
    const error = err as AxiosError;
    return rejectWithValue(error.message);
  }
});

export const registerUserAsync = createAsyncThunk<
  User,
  UserToCreate,
  { rejectValue: string }
>("registerUser", async (newUser, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.post(`${BASE_URL}/users`, newUser);
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    return rejectWithValue(error.message);
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.currentUser = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsersAsync.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });

    builder.addCase(fetchAllUsersAsync.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(fetchAllUsersAsync.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    builder.addCase(authUserAsync.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(authUserAsync.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = undefined;
    });

    builder.addCase(getUserProfile.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getUserProfile.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    builder.addCase(registerUserAsync.fulfilled, (state, action) => {
      state.users.push(action.payload);
      state.loading = false;
    });

    builder.addCase(registerUserAsync.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

const usersReducer = usersSlice.reducer;

export const { logoutUser } = usersSlice.actions;

export default usersReducer;
