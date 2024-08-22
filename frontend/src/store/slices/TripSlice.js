import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from 'axios'
import {fetchCsrfToken} from "./csrfSlice";

const SERVER_ENDPOINT_URL = process.env.REACT_APP_SERVER_ENDPOINT_URL

export const fetchTrips = createAsyncThunk(
    'trip/fetchTrips',
    async (tripDetails, {getState, dispatch, rejectWithValue}) => {
        const state = getState();
        let csrfToken = state.csrf.token

        if (!csrfToken) {
            await dispatch(fetchCsrfToken());
            csrfToken = getState().csrf.token
        }
        try {
            const response = await axios.post(SERVER_ENDPOINT_URL + '/generate-trips', {tripDetails}, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrfToken,
                },
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            const errorMessage = error?.response?.data.message
            const errorDetails = error?.response?.data.details
            return rejectWithValue(errorMessage ? `${errorMessage}:\n${errorDetails}` : "An error has occurred, please try again.");
        }
    }
)

const tripSlice = createSlice({
    name: "trip",
    initialState: {
        tripDetails: {
            country: '',
            trip_type: ''
        },
        days: [],
        images: [],
        status: 'idle',
        error: null
    },
    reducers: {
        updateCountry: (state, action) => {
            state.tripDetails.country = action.payload;
        },
        updateTripType: (state, action) => {
            state.tripDetails.trip_type = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTrips.pending, (state) => {
                state.error = null
                state.status = 'loading';
            })
            .addCase(fetchTrips.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.error = null;
                state.days = action.payload.trips.days;
                state.images = action.payload.trips.images;
            })
            .addCase(fetchTrips.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
    }
})

export const {updateCountry, updateTripType} = tripSlice.actions
export default tripSlice.reducer