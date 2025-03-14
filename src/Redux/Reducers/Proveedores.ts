import { 
    FETCH_PROVIDERS,
    ADD_PROVIDERS,
    UPDATE_PROVIDERS,
    DELETE_PROVIDERS
   } from "../Actions/Proveedores";
   
   import { Provider } from "../types";
   
   // Definir el estado inicial con el tipo Provider[]
   type ProviderState = {
     providers: Provider[];
   };
   
   const initialState: ProviderState = {
     providers: [],
   };
   
   // Reducer actualizado
   export const providerListReducer = (state = initialState, action: any) => {
     switch (action.type) {
       case FETCH_PROVIDERS:
         return { ...state, providers: action.payload };
         
       case ADD_PROVIDERS:
         return { ...state, providers: [...state.providers, action.payload] };
   
       case UPDATE_PROVIDERS:
         return {
           ...state,
           providers: state.providers.map((provider) =>
             provider._id === action.payload.id ? action.payload : provider
           ),
         };
   
       case DELETE_PROVIDERS:
         return {
           ...state,
           providers: state.providers.filter(
             (provider) => provider._id !== action.payload
           ),
         };
   
       default:
         return state;
     }
   };
   