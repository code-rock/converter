import { call, takeEvery, put } from "redux-saga/effects";
import Axios from "axios";
import { currencyActions } from "./currency.actions";
import { fetchCurrency } from "./currency.slice";

let callAPI = async ({ url, method, data }: any) => {
  return await Axios({
    url,
    method,
    data
  });
};

export function* fetchDataSaga({payload}: any) {
    try {
        // @ts-ignore
        let result: any = yield call(() =>
            callAPI({ url: `${process.env.API_PATH}/${payload}` })
        )
        yield put(fetchCurrency(result.data));
    } catch (e) {
        yield put({ type: currencyActions.CURRENCY_FETCH_FAILED });
    }
}

export default function* rootSaga() {
  yield takeEvery(currencyActions.FETCH_CURRENCY_SAGA, fetchDataSaga);
}
