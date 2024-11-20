import userSlice from "./userSlice";
import feedSlice from "./feedSlice";
import connectionSlice from "./connectionSlice";
import { configureStore } from '@reduxjs/toolkit';

const appStore = configureStore({
    reducer: {
        user: userSlice,
        feed: feedSlice,
        connections: connectionSlice
    }
})

export default appStore;