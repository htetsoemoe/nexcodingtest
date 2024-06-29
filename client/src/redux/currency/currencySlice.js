import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currencies: []
}

const currencySlice = createSlice({
    name: "currency",
    initialState,
    reducers: {
        addCurrencyToStore: (state, action) => {
            state.currencies = action.payload
        }
    }
})

export const { addCurrencyToStore } = currencySlice.actions
export default currencySlice.reducer