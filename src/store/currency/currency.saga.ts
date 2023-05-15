import { call, takeEvery, put } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { currencyActions } from "./currency.actions";
import { fetchCurrency } from "./currency.slice";
import { ICurrency } from "./currency.types";
import { PayloadAction } from "@reduxjs/toolkit";
import { getCurrency } from "../../api/currency";

export function* fetchDataSaga({ payload }: PayloadAction<string>) {
    try {
        let res: AxiosResponse<ICurrency[]> = yield call(getCurrency, payload)
        yield put(fetchCurrency(res.data));
    } catch (e) {
        yield put({ type: currencyActions.CURRENCY_FETCH_FAILED });
    }
}

export default function* rootSaga() {
  yield takeEvery(currencyActions.FETCH_CURRENCY_SAGA, fetchDataSaga);
}
