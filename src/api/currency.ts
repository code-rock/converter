import Axios from "axios";
import { ICurrency } from "../store/currency/currency.types";

export const getCurrency = (id: string) => Axios.get<ICurrency[]>(`${process.env.API_PATH}/${id}`);
