import userSlice from "./userSlice";
import { configureStore } from '@reduxjs/toolkit';

const appStore = configureStore({
    reducer: {
        user: userSlice
    }
})

export default appStore;