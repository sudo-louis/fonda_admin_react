import { redirect } from "react-router";
import api from "../Constants/api";
import { Dispatch } from "redux";

export const FETCH_ORDERS = "FETCH_ORDERS";
export const FETCH_TOTAL_SALES = "FETCH_TOTAL_SALES";

 export const orderListAction = () => async (dispatch: Dispatch) => {
  const response = await api.get("api/admin/order");
  dispatch({ type: FETCH_ORDERS, payload: response.data });
};

export const fetchTotalSalesAction = () => async (dispatch: Dispatch) => {
  const response = await api.get("/api/admin/total-sales");
  dispatch({ type: FETCH_TOTAL_SALES, payload: response.data.totalSales });
};