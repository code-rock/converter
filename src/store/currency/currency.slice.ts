import { createSlice } from "@reduxjs/toolkit";
import { ICurrency } from "./currency.types";

export interface ICurrencyState {
    amount: number,
    amountWanted: number,
    base: ICurrency,
    wanted: ICurrency,
    list: any[],
    error?: string,
    isLoading: boolean,
    availableCurrency: ICurrency[] | []
}

export const currencySlice = createSlice({
    name: "currency",
    initialState: {
        base: { id: "USD", name: "Доллар США", price: "77.2041"},
        wanted: { id: "RUS", name: "Рубль", price: "0.013"},
        list: [],
        error: undefined,
        isLoading: false,
        availableCurrency: [
            { id: "USD", name: "Доллар США", price: "77.2041"},
            { id: "RUS", name: "Рубль", price: "0.013"}
        ],
        amount: 1,
        amountWanted: 0.013
    } as ICurrencyState,
    reducers: {
        fetchCurrency: (state, action: { payload: any; type: string; }) => {
            state.list = action.payload
            state.wanted = action.payload.find((c: ICurrency) => c.id === state.wanted.id) || state.wanted
        },
        fetchCurrencyFailure: (state, action: { payload: any; type: string; }) => {
            state.error = action.payload
        },
        changeBaseCurrency: (state, action: { payload: ICurrency; type: string; }) => {
            state.base = action.payload
            if (action.payload.id === state.wanted.id) state.wanted = state.availableCurrency.find(c => c.id !== action.payload.id) || state.availableCurrency[0]
        },
        changeWantedCurrency: (state, action: { payload: ICurrency; type: string; }) => {
            state.wanted = action.payload
        },
        changeAmount: (state, action: { payload: { amount: any, amountWanted: any }; type: string; }) => {
            state.amountWanted = action.payload.amountWanted
            state.amount = action.payload.amount
        },
    }
})
  
export const { fetchCurrency, changeBaseCurrency, changeWantedCurrency, changeAmount } = currencySlice.actions;