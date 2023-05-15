import React, { Fragment, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { currencyActions } from "../store/currency/currency.actions";
import Select from 'react-select';
import { Item } from "../ui/Item";
import { TopBar } from "../ui/TopBar";
import { Button } from "../ui/Button";
import { SelectContainer } from "../ui/SelectContainer";
import { changeBaseCurrency } from "../store/currency/currency.slice";
import { ICurrency } from "../store/currency/currency.types";
import { Loader, LoaderContainer } from "../ui/Loader";

export function Home({
    changeCurrency,
    availableCurrency,
    baseCurrency,
    getCurrency,
    list
}: any) {
    const getDate = useCallback(() => getCurrency(baseCurrency), [getCurrency, baseCurrency])

    useEffect(() => {
        getDate()
        const timer = setInterval(() => {
            getDate()
        }, 6000)

        return () => clearInterval(timer)
    }, [getDate]) 

    return (
        <Fragment>
            <TopBar>
                <SelectContainer>
                    <label htmlFor="currency">Главная валюта</label>
                    <Select
                        id="currency"
                        isSearchable
                        value={baseCurrency}
                        onChange={changeCurrency}
                        options={availableCurrency}
                        getOptionLabel={(option: ICurrency) => option.name}
                        getOptionValue={(option: ICurrency) => option.id}
                        placeholder="Выберете валюту..."
                    />
                </SelectContainer>
                <Button onClick={getDate}>Обновить все курсы валют</Button>
            </TopBar>
            
            {list.length ? (
                list.map((item: ICurrency) => (
                <Item key={item.id}>
                    <span>1 {item.id} ({item.name})</span>
                    <span>{item.price} {baseCurrency.id}</span>
                </Item>
                ))
            ) : (
                <LoaderContainer>
                    <Loader />
                </LoaderContainer>
            )
        }
        </Fragment>
    );
}

const mapStateToProps = (state: any) => ({ 
    availableCurrency: state.currency.availableCurrency || [],
    baseCurrency: state.currency.base || {},
    list: state.currency.list || []
})

const mapDispatchToProps = (dispatch: any) => {
    return {
      getCurrency: (currency: ICurrency) => dispatch({ type: currencyActions.FETCH_CURRENCY_SAGA, payload: currency.id }),
      changeCurrency: (currency: ICurrency) => dispatch(changeBaseCurrency(currency)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)