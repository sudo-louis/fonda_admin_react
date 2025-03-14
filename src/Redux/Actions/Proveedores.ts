import { redirect } from "react-router";
import api from "../Constants/api";
import { Dispatch } from "redux";

export const FETCH_PROVIDERS = "FETCH_PROVIDERS";
export const ADD_PROVIDERS = "ADD_PROVIDERS";
export const UPDATE_PROVIDERS = "UPDATE_PROVIDERS";
export const DELETE_PROVIDERS = "DELETE_PROVIDERS";

// GET 
export const providerListAction = () => async (dispatch: Dispatch) => {
  const response = await api.get("/api/providers");
  dispatch({ type: FETCH_PROVIDERS, payload: response.data });
};

// POST
// export const addProviderAction = (provider: any) => async (dispatch: Dispatch) => {
//     const response = await api.post("/api/providers", provider);
//     dispatch({ type: ADD_PROVIDERS, payload: response.data });
//     window.location.href = "/proveedores"; 
// };

export const addProviderAction = (formData: FormData) => async (dispatch: Dispatch) => {
    try {
      const response = await api.post("/api/providers", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      dispatch({ type: ADD_PROVIDERS, payload: response.data });
      window.location.href = "/proveedores"; 
    } catch (error) {
      console.error("Error al agregar proveedor:", error);
    }
  };


// PUT
export const updateProviderAction = (provider: any) => async (dispatch: Dispatch) => {
    const response = await api.put(`/api/providers/${provider._id}`, provider);
    dispatch({ type: UPDATE_PROVIDERS, payload: response.data });
    window.location.href = "/proveedores"; 
};

// DELETE
export const deleteProviderAction = (id: string) => async (dispatch: Dispatch) => {
    await api.delete(`/api/providers/${id}`);
    dispatch({ type: DELETE_PROVIDERS, payload: id });
    window.location.href = "/proveedores"; 
};
