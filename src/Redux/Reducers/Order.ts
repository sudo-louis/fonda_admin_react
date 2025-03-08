 
import { FETCH_ORDERS, FETCH_TOTAL_SALES } from "../Actions/Order";
import { Order } from "../types";

type OrderState = {
  orders: Order[];
  totalSales: number;
};

const initialState: OrderState = {
  orders: [],
  totalSales: 0,
};

export const orderListReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_ORDERS:
      return { ...state, orders: action.payload };

    case FETCH_TOTAL_SALES:
      return { ...state, totalSales: action.payload };

    default:
      return state;
  }
};
