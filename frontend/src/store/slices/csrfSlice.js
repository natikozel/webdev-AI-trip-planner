import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


const SERVER_ENDPOINT_URL = process.env.REACT_APP_SERVER_ENDPOINT_URL

export const fetchCsrfToken = createAsyncThunk(
    'csrf/fetchCsrfToken',
    async () => {
        const response = await axios.get(SERVER_ENDPOINT_URL + '/csrf-token', {
            withCredentials: true
        })
        return response.data.csrfToken
    }
)


const csrfSlice = createSlice({
    name:'csrf',
    initialState: {
        token: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCsrfToken.fulfilled, (state, action) => {
                state.token = action.payload
            })
    }
})

export default csrfSlice.reducer