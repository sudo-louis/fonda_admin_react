import { configureStore } from '@reduxjs/toolkit';

import {productListReducer} from './Reducers/Product';
import {orderListReducer} from './Reducers/Order';
import { authReducer } from "./Reducers/User";
import { categorieListReducer } from "./Reducers/Categorias";
import { providerListReducer } from "./Reducers/Proveedores";
 

const store = configureStore({
  reducer: {
    auth: authReducer,
    productListReducer: productListReducer,
    orderListReducer: orderListReducer,
    categorieListReducer: categorieListReducer,
    providerListReducer: providerListReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;


