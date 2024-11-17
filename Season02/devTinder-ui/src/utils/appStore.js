import userSlice from "./userSlice";
import feedSlice from "./feedSlice";
import { configureStore } from '@reduxjs/toolkit';

const appStore = configureStore({
    reducer: {
        user: userSlice,
        feed: feedSlice,
    }
})

export default appStore;