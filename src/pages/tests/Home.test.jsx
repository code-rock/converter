import { Home } from "../Home.page";
import renderer from 'react-test-renderer';

it('draw page Home', () => {
    const changeCurrency = jest.fn(() => {})
    const getCurrency = jest.fn(() => {})
    const availableCurrency = [
      { id: "USD", name: "Доллар США", price: "77.2041"},
      { id: "RUS", name: "Рубль", price: "0.013"}
    ]
    const baseCurrency = { id: "USD", name: "Доллар США", price: "77.2041"}
    const list = [
      { id: "CSD", name: "Валюта чья-то", price: "941"},
      { id: "RUS", name: "Рубль", price: "0.013"}
    ]

    const component = renderer.create(
      <Home 
        changeCurrency={changeCurrency} 
        getCurrency={getCurrency} 
        availableCurrency={availableCurrency} 
        baseCurrency={baseCurrency} 
        list={list}
      />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});