import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios"

import { BASE_URL } from "../../config/api"

export type Role = 'customer'|'admin';

interface UserReducerState {
    users: User[],
    error?: string
}

interface UserCredentials {
    email: string,
    password: string
}

const initialState: UserReducerState = {
    users: [],
}

interface User {
    id: number
    email: string,
    password: string,
    role: Role,
}

export const fetchUsersAsync = createAsyncThunk<User[], void, { rejectValue: string }>(
    'fetchUsersAsync',
    async (_, { rejectWithValue }) => {
        try {
            const result = await axios.get('https://api.escuelajs.co/api/v1/users')
            return result.data
        } catch (e) {
            const error = e as Error
            return rejectWithValue(error.message)
        }
    }
)

export const loginUserAsync = createAsyncThunk(
    'loginUsers',
    async (cred: UserCredentials,{rejectWithValue}) => {
        try {
            const result = await axios.post(`${BASE_URL}/auth/login`, cred);
            const {access_token} = result.data
            const getProfile = await axios.get(`${BASE_URL}/auth/profile`)
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
        addUser: (state, action) => {
            state.users.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsersAsync.fulfilled, (state, action) => {
            state.users = action.payload;
        })

        builder.addCase(fetchUsersAsync.rejected, (state, action) => {
            state.error = action.payload;
        })

        builder.addCase(loginUserAsync.fulfilled, (state, action) => {
            
        })
    }
})

const usersReducer = usersSlice.reducer
export default usersReducer