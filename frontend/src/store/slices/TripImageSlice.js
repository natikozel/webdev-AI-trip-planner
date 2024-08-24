import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { fetchCsrfToken } from "./csrfSlice";

const SERVER_ENDPOINT_URL = process.env.REACT_APP_SERVER_ENDPOINT_URL;

export const fetchImage = createAsyncThunk(
    'tripImage/fetchImage',
    async (imageId, { getState, dispatch, rejectWithValue }) => {
        const state = getState();
        let csrfToken = state.csrf.token;

        if (!csrfToken) {
            await dispatch(fetchCsrfToken());
            csrfToken = getState().csrf.token;
        }
        try {
            const response = await axios.post(SERVER_ENDPOINT_URL + '/get-image', { imageId }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrfToken,
                },
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            const errorMessage = error?.response?.data.message;
            const errorDetails = error?.response?.data.details;
            return rejectWithValue(errorMessage ? `${errorMessage}:\n${errorDetails}` : "An error has occurred, please try again.");
        }
    }
);

const tripImageSlice = createSlice({
    name: "tripImage",
    initialState: {
        imageId: '',
        wait_time: 0,
        imageUrl: '',
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchImage.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchImage.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.imageUrl = action.payload;
                state.error = null;
            })
            .addCase(fetchImage.rejected, (state, action) => {
                state.status = 'failed';
                state.imageUrl = '';
                state.wait_time = action.payload;
            });
    }
});

export default tripImageSlice.reducer;