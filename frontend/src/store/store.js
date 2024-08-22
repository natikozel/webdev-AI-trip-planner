import { configureStore} from "@reduxjs/toolkit";
import tripSlice from "./slices/TripSlice";
import csrfSlice from "./slices/csrfSlice";

const store = configureStore({
    reducer: {
        trips: tripSlice,
        csrf: csrfSlice
    }
})

export default store