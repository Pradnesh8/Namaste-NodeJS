import userSlice from "./userSlice";
import feedSlice from "./feedSlice";
import connectionSlice from "./connectionSlice";
import requestSlice from "./requestSlice";
import { configureStore } from '@reduxjs/toolkit';

const appStore = configureStore({
    reducer: {
        user: userSlice,
        feed: feedSlice,
        connections: connectionSlice,
        requests: requestSlice
    }
})

export default appStore;