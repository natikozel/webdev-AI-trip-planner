import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from 'axios';
import {fetchCsrfToken} from "./csrfSlice";

const REACT_APP_STABLEHORDE_API_STATUS_URL = "https://stablehorde.net/api/v2/generate/status";
const REACT_APP_SERVER_ENDPOINT_URL = process.env.REACT_APP_SERVER_ENDPOINT_URL
export const fetchImage = createAsyncThunk(
    'tripImage/fetchImage',
    async (imageId, {getState, dispatch, rejectWithValue}) => {

        while (true) {
            try {
                const response = await axios.get(REACT_APP_STABLEHORDE_API_STATUS_URL + `/${imageId}`, {
                    headers: {
                        'accept': 'application/json',
                        'Client-Agent': 'unknown:0:unknown'
                    },
                });

                const isFinished = response.data.finished === 1;
                if (isFinished) {
                    const state = getState();
                    let csrfToken = state.csrf.token;

                    if (!csrfToken) {
                        await dispatch(fetchCsrfToken());
                        csrfToken = getState().csrf.token;
                    }
                    await axios.post(REACT_APP_SERVER_ENDPOINT_URL + '/save-image', {imageId, data: response.data}, {
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRF-Token': csrfToken,
                        },
                        withCredentials: true
                    });

                    return response.data;
                } else {
                    await new Promise(resolve => setTimeout(() => {
                        dispatch(fetchImage(imageId))
                    }, (response.data.wait_time + 1) * 1000));
                }
            } catch (error) {
                const errorMessage = error?.response?.data?.message;
                const errorDetails = error?.response?.data?.details;
                return rejectWithValue(errorMessage ? `${errorMessage}:\n${errorDetails}` : "An error has occurred, please try again.");
            }
        }
    }
);

const tripImageSlice = createSlice({
    name: "tripImage",
    initialState: {
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
                console.log(action)
                state.status = 'succeeded';
                state.imageUrl = action.payload.generations[0].img;
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