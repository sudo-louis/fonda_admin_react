import { redirect } from "react-router";
import api from "../Constants/api";
import { Dispatch } from "redux";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

 export const productListAction = () => async (dispatch: Dispatch) => {
  const response = await api.get("api/admin/product");
  dispatch({ type: FETCH_PRODUCTS, payload: response.data });
};

 export const addProductAction = (product: any) => async (dispatch: Dispatch) => {
  const response = await api.post("/api/admin/product", product);
  dispatch({ type: ADD_PRODUCT, payload: response.data });
};

// Actualizar producto
export const updateProductAction = (product: any) => async (dispatch: Dispatch) => {
  const response = await api.put(`api/admin/product/${product._id}`, product);
  dispatch({ type: UPDATE_PRODUCT, payload: response.data });
};

// Actualizar producto status
export const updateProductStatusAction = (product: any) => async (dispatch: Dispatch) => {
  const response = await api.put(`api/admin/product/${product._id}/status`, product);
  dispatch({ type: UPDATE_PRODUCT, payload: response.data });
};



// Eliminar producto
export const deleteProductAction = (id: string) => async (dispatch: Dispatch) => {
  await api.delete(`/products/${id}`);
  dispatch({ type: DELETE_PRODUCT, payload: id });
};
