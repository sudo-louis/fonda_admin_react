import { redirect } from "react-router";
import api from "../Constants/api";
import { Dispatch } from "redux";

export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const ADD_CATEGORIES = "ADD_CATEGORIES";
 export const UPDATE_CATEGORIES = "UPDATE_CATEGORIES";
export const DELETE_CATEGORIES = "DELETE_CATEGORIES";

//GET 
export const categorieListAction = () => async (dispatch: Dispatch) => {
  const response = await api.get("/api/categories");
  dispatch({ type: FETCH_CATEGORIES, payload: response.data });
 
};


//POST
export const addCategorieAction = (categorie: any) => async (dispatch: Dispatch) => {
    const response = await api.post("/api/categories", categorie);
    dispatch({ type: ADD_CATEGORIES, payload: response.data });
    window.location.href = "/categorias"; 

};

//PUT
export const updateCategorieAction = (categorie: any) => async (dispatch: Dispatch) => {
    const response = await api.put(`/api/categories/${categorie._id}`, categorie);
    dispatch({ type: UPDATE_CATEGORIES, payload: response.data });
    window.location.href = "/categorias"; 

};

//DELETE
export const deleteCategorieAction = (id: string) => async (dispatch: Dispatch) => {
    await api.delete(`/api/categories/${id}`);
    dispatch({ type: DELETE_CATEGORIES, payload: id });
    window.location.href = "/categorias"; 

};
  