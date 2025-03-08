import {
  FETCH_PRODUCTS,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from "../Actions/Product";
import { Product } from "../types";

// Definir el estado inicial con el tipo Product[]
type ProductState = {
  products: Product[];
};

const initialState: ProductState = {
  products: [],
};

// Reducer actualizado
export const productListReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { ...state, products: action.payload };

    case ADD_PRODUCT:
      return { ...state, products: [...state.products, action.payload] };

    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === action.payload.id ? action.payload : product
        ),
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.payload
        ),
      };

    default:
      return state;
  }
};
