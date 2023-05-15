import renderer from 'react-test-renderer';
import { Сonverter } from '../Сonverter.page'

it('draw page Converter', () => {
    const setBaseCurrency = jest.fn(() => {})
    const getAllCurrency = jest.fn(() => {})
    const setWantedCurrency = jest.fn(() => {})
    const setAmount = jest.fn(() => {})
    const setAmountWanted = jest.fn(() => {})

    const availableCurrency = [
      { id: "USD", name: "Доллар США", price: "77.2041"},
      { id: "RUS", name: "Рубль", price: "0.013"}
    ]
    const baseCurrency = { id: "USD", name: "Доллар США", price: "77.2041"}
    const wantedCurrency = { id: "RUS", name: "Рубль", price: "0.013"}
    const list = [
      { id: "CSD", name: "Валюта чья-то", price: "941"},
      { id: "RUS", name: "Рубль", price: "0.013"}
    ]
    const amount = 1
    const amountWanted = 0.013

    const component = renderer.create(
      <Сonverter 
        setBaseCurrency={setBaseCurrency}
        getAllCurrency={getAllCurrency}
        availableCurrency={availableCurrency}
        baseCurrency={baseCurrency}
        list={list}
        amount={amount}
        amountWanted={amountWanted}
        wantedCurrency={wantedCurrency}
        setWantedCurrency={setWantedCurrency}
        setAmount={setAmount}
        setAmountWanted={setAmountWanted}
      />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });