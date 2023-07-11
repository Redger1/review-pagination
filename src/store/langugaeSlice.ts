import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type LanguageTypes = 'ru'|'en';
export interface LanguageSlice {
    language: LanguageTypes,
}

const initialState: LanguageSlice = {
    language: 'ru',
}

export const LanguageSlice = createSlice({
    name: "language",
    initialState,
    reducers: {
        updateLangugae(state, action: PayloadAction<LanguageTypes>) {
            state.language = action.payload
        },
    }
})

export default LanguageSlice.reducer
export const { updateLangugae } = LanguageSlice.actions