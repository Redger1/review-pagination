import { configureStore } from "@reduxjs/toolkit";
import { LanguageSlice } from "./langugaeSlice";
import { ClockSlice } from "./clocksSlice";

export const store = configureStore({
    reducer: {
        clock: ClockSlice.reducer,
        language: LanguageSlice.reducer,
    }
})
