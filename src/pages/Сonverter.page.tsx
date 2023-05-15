import React, { useEffect } from "react";
import { CenterIcon, Converter, Linput, Llabel, Lselect, Rinput, Rlablel, Rselect, Lspan, Rspan } from "../ui/Converter";
import { ICurrency } from "../store/currency/currency.types";
import { changeAmount, changeBaseCurrency, changeWantedCurrency } from "../store/currency/currency.slice";
import { connect } from "react-redux";
import { currencyActions } from "../store/currency/currency.actions";

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
}: any) {
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
                    onInput={(e: any) => setAmount(e.target.value, wantedCurrency.price)}></Linput>
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
                    onInput={(e: any) => setAmountWanted(e.target.value, wantedCurrency.price)}></Rinput>
                <Lspan>1 {baseCurrency.id} = {baseCurrency.price} {wantedCurrency.id}</Lspan>
                <Rspan>1 {wantedCurrency.id} = {wantedCurrency.price} {baseCurrency.id}</Rspan>
        </Converter>
    )
}
  
const mapStateToProps = (state: any) => ({ 
    availableCurrency: state.currency.availableCurrency,
    baseCurrency: state.currency.base,
    wantedCurrency: state.currency.wanted,
    list: state.currency.list|| [],
    amount: state.currency.amount,
    amountWanted: state.currency.amountWanted,
})

const mapDispatchToProps = (dispatch: any) => ({
    getAllCurrency: (currency: ICurrency) => dispatch({ type: currencyActions.FETCH_CURRENCY_SAGA, payload: currency.id }),
    setBaseCurrency: (currency: ICurrency) => dispatch(changeBaseCurrency(currency)),
    setWantedCurrency: (currency: ICurrency) => dispatch(changeWantedCurrency(currency)),
    setAmount: (value: any, price: number) => {
        dispatch(changeAmount({ 
            amount: Number(value),
            amountWanted:  Number(value) *  Number(price),
        }))
    },
    setAmountWanted: (value: any, price: number) => {
        dispatch(changeAmount({ 
            amount:  Number(value) / Number(price) || 0,
            amountWanted:  Number(value)
        }))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Сonverter)

