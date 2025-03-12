import { 
 FETCH_CATEGORIES,
 ADD_CATEGORIES,
 UPDATE_CATEGORIES,
 DELETE_CATEGORIES
} from "../Actions/Categorias";

import { Categorie } from "../types";

// Definir el estado inicial con el tipo Categorie[]
type CategorieState = {
  categories: Categorie[];
};

const initialState: CategorieState = {
  categories: [],
};

// Reducer actualizado
export const categorieListReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return { ...state, categories: action.payload };
      
    case ADD_CATEGORIES:
      return { ...state, categories: [...state.categories, action.payload] };

    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: state.categories.map((categorie) =>
          categorie._id === action.payload.id ? action.payload : categorie
        ),
      };

    case DELETE_CATEGORIES:
      return {
        ...state,
        categories: state.categories.filter(
          (categorie) => categorie._id !== action.payload
        ),
      };

    default:
      return state;
  }
};
