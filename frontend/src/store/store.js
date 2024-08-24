import {configureStore} from "@reduxjs/toolkit";
import tripSlice from "./slices/TripSlice";
import csrfSlice from "./slices/csrfSlice";
import tripImageSlice from "./slices/TripImageSlice";

const store = configureStore({
    reducer: {
        trips: tripSlice,
        image: tripImageSlice,
        csrf: csrfSlice,
    }
})

export default store