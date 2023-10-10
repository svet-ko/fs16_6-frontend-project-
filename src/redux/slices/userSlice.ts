import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios"

import { BASE_URL } from "../../config/api"
import User from "../../types/User"
import UserCredentials from "../../types/UserCredentials"
import UserToCreate from "../../types/UserToCreate"

export interface UserReducerState {
  users: User[],
  currentUser?: User,
  loading: boolean,
  error?: string
}

export const initialState: UserReducerState = {
  users: [],
  loading: false,
}

export const fetchAllUsersAsync = createAsyncThunk<User[], void, { rejectValue: string }>(
  'fetchUsersAsync',
  async (_, { rejectWithValue }) => {
    try {
      const result = await axios.get(`${BASE_URL}/users`)
      return result.data
    } catch (e) {
      const error = e as Error
      return rejectWithValue(error.message)
    }
  }
)

export const loginUserAsync = createAsyncThunk<User, UserCredentials, { rejectValue: string }>(
  'loginUser',
  async (cred, { rejectWithValue, dispatch }) => {
    try {
      const result = await axios.post(`${BASE_URL}/auth/login`, cred);
      const { access_token } = result.data;
      const authenticatedProfile = await dispatch(authenticateUser(access_token));
      if (typeof authenticatedProfile.payload === 'string' || typeof authenticatedProfile.payload === 'undefined') { //second parameter means undefined
        throw Error('User was not authenticated');
      } else {
        return authenticatedProfile.payload as User;
      }
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.message)
    }
  }
)

export const authenticateUser = createAsyncThunk<User, string, { rejectValue: string }>(
  'authenticateUser',
  async (accessToken: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/profile`, {
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      })
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      console.log('error', error.message)
      return rejectWithValue(error.message)
    }
  }
)

export const registerUserAsync = createAsyncThunk<User, UserToCreate, { rejectValue: string }>(
  'registerUser',
  async (newUser, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(`${BASE_URL}/users`, newUser);
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.message)
    }
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.currentUser = undefined;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsersAsync.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    })

    builder.addCase(fetchAllUsersAsync.pending, (state, action) => {
      state.loading = true;
    })

    builder.addCase(fetchAllUsersAsync.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    })

    builder.addCase(loginUserAsync.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    })

    builder.addCase(loginUserAsync.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    })

    builder.addCase(registerUserAsync.fulfilled, (state, action) => {
      state.users.push(action.payload);
      state.loading = false;
    })

    builder.addCase(registerUserAsync.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    })
  }
})

const usersReducer = usersSlice.reducer;

export const { logoutUser } = usersSlice.actions;

export default usersReducer;