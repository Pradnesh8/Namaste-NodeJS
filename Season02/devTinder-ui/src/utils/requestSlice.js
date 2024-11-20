import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "request",
    initialState: null,
    reducers: {
        addRequests: (state, action) => action.payload,
        removeRequest: (state, action) => {
            const filtered = state.filter(request => request?.fromUserId?._id !== action.payload)
            return filtered;
        },
        removeAllRequests: () => null
    }
})

export const { addRequests, removeRequest, removeAllRequests } = requestSlice.actions

export default requestSlice.reducer;