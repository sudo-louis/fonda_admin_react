import api from "../Constants/api";
import { Dispatch } from "redux";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

// Obtener lista de productos
export const productListAction = () => async (dispatch: Dispatch) => {
  const response = await api.get("/api/products");
  dispatch({ type: FETCH_PRODUCTS, payload: response.data });
};



export const addProductAction = (product: any) => async (dispatch: Dispatch) => {
  const formData = new FormData();
  
  formData.append("name", product.name);
  formData.append("price", String(product.price)); // Asegurar que sea un número convertido a string
  formData.append("category", product.category); // Debe ser un ObjectId válido
  formData.append("provider", product.provider); // Debe ser un ObjectId válido
  if (product.image) {
    formData.append("image", product.image);
  }

  try {
    const response = await api.post("/api/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    dispatch({ type: ADD_PRODUCT, payload: response.data });
    window.location.href = "/productos"; 

  } catch (error: any) {
    console.error("Error al agregar producto:", error.response?.data || error.message);
  }
};


// Actualizar producto
export const updateProductAction = (product: any) => async (dispatch: Dispatch) => {
  const formData = new FormData();
  formData.append("name", product.name);
  formData.append("price", product.price.toString());

  // Solo agregar la imagen si el usuario selecciona una nueva
  if (product.image instanceof File) {
    formData.append("image", product.image);
  }

  const response = await api.put(`/api/products/${product._id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  dispatch({ type: UPDATE_PRODUCT, payload: response.data.product });
};


// Eliminar producto
export const deleteProductAction = (id: string) => async (dispatch: Dispatch) => {
  await api.delete(`/api/products/${id}`);
  dispatch({ type: DELETE_PRODUCT, payload: id });
};
