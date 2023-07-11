import { createSlice } from "@reduxjs/toolkit";

export interface ClockSliceState {
    timeNow: string,
}

const initialState: ClockSliceState = {
    timeNow: new Date().toLocaleTimeString(),
}

export const ClockSlice = createSlice({
    name: "clock",
    initialState,
    reducers: {
        updateTime(state) {
            state.timeNow = new Date().toLocaleTimeString()
        },
    }
})

export default ClockSlice.reducer
export const { updateTime } = ClockSlice.actions