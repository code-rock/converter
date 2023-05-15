import React, { useEffect } from "react";
import { CenterIcon, Converter, Linput, Llabel, Lselect, Rinput, Rlablel, Rselect, Lspan, Rspan } from "../ui/Converter";
import { ICurrency } from "../store/currency/currency.types";
import { changeAmount, changeBaseCurrency, changeWantedCurrency } from "../store/currency/currency.slice";
import { connect } from "react-redux";
import { currencyActions } from "../store/currency/currency.actions";
import { TDispatch, TState } from "../store/store";
import { ActionMeta, SingleValue } from 'react-select';

interface IConverter {
    getAllCurrency: (currency: ICurrency) => void,
    setBaseCurrency: (currency: SingleValue<ICurrency>, actionMeta: ActionMeta<ICurrency>) => void,
    setWantedCurrency: (currency: SingleValue<ICurrency>, actionMeta: ActionMeta<ICurrency>) => void,
    setAmount: (value: number | string, price: number | string) => void,
    setAmountWanted: (value: number | string, price: number | string) => void,
    availableCurrency: ICurrency[],
    baseCurrency: ICurrency,
    list: ICurrency[] ,
    amount: number,
    amountWanted: number,
    wantedCurrency: ICurrency,
}

function Сonverter({
    setBaseCurrency,
    getAllCurrency,
    availableCurrency,
    baseCurrency,
    list,
    amount,
    amountWanted,
    wantedCurrency,
    setWantedCurrency,
    setAmount,
    setAmountWanted
}: IConverter) {
    useEffect(() => {
        getAllCurrency(baseCurrency)
        setAmount(amount, wantedCurrency.price)
    }, [baseCurrency]) 

    useEffect(() => {
        setAmount(amount, wantedCurrency.price)
    }, [wantedCurrency]) 

    return (
        <Converter>
                <Llabel htmlFor="from">У меня есть</Llabel>
                {/* @ts-ignore */}
                <Lselect
                    isSearchable
                    value={baseCurrency}
                    onChange={setBaseCurrency}
                    options={availableCurrency}
                    getOptionLabel={(option: ICurrency) => option.name}
                    getOptionValue={(option: ICurrency) => option.id}
                    isOptionDisabled={(option: ICurrency) => option.id === wantedCurrency.id}
                />
                <Linput 
                    value={amount}
                    id="from" type="number" pattern='[0-9][^eE]'
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value, wantedCurrency.price)}></Linput>
                <CenterIcon />
                <Rlablel htmlFor="to">Хочу приобрести</Rlablel>
                {/* @ts-ignore */}
                <Rselect
                    isSearchable
                    defaultValue={wantedCurrency}
                    onChange={setWantedCurrency}
                    options={list.length? list : availableCurrency}
                    getOptionLabel={(option: ICurrency) => option.name}
                    getOptionValue={(option: ICurrency) => option.id}
                    isOptionDisabled={(option: ICurrency) => option.id === baseCurrency.id}
                    placeholder="Выберете валюту..."
                />
                <Rinput 
                    value={amountWanted}
                    id="to" type="number" pattern='[0-9][^eE]'
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => setAmountWanted(e.target.value, wantedCurrency.price)}></Rinput>
                <Lspan>1 {baseCurrency.id} = {baseCurrency.price} {wantedCurrency.id}</Lspan>
                <Rspan>1 {wantedCurrency.id} = {wantedCurrency.price} {baseCurrency.id}</Rspan>
        </Converter>
    )
}
  
const mapStateToProps = (state: TState) => ({ 
    availableCurrency: state.currency.availableCurrency,
    baseCurrency: state.currency.base,
    wantedCurrency: state.currency.wanted,
    list: state.currency.list|| [],
    amount: state.currency.amount,
    amountWanted: state.currency.amountWanted,
})

const mapDispatchToProps = (dispatch: TDispatch) => ({
    getAllCurrency: (currency: ICurrency) => dispatch({ type: currencyActions.FETCH_CURRENCY_SAGA, payload: currency.id }),
    setBaseCurrency: (currency: SingleValue<ICurrency>, actionMeta: ActionMeta<ICurrency>) => {
        if (currency !== null) dispatch(changeBaseCurrency(currency))
    },
    setWantedCurrency: (currency: SingleValue<ICurrency>, actionMeta: ActionMeta<ICurrency>) => {
        if (currency !== null) dispatch(changeWantedCurrency(currency))
    },
    setAmount: (value: number | string, price: number | string) => {
        dispatch(changeAmount({ 
            amount: Number(value),
            amountWanted:  Number(value) *  Number(price),
        }))
    },
    setAmountWanted: (value: number | string, price: number | string) => {
        dispatch(changeAmount({ 
            amount:  Number(value) / Number(price) || 0,
            amountWanted:  Number(value)
        }))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Сonverter)

