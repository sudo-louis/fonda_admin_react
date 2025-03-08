 
// export default DashboardPage;
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavbarSidebarLayout from "../layouts/navbar-sidebar";
import { productListAction } from "../Redux/Actions/Product";
import { orderListAction, fetchTotalSalesAction } from "../Redux/Actions/Order";

import { RootState, AppDispatch } from "../Redux/store";

const DashboardPage: FC = function () {
   const dispatch: AppDispatch = useDispatch();

   const products = useSelector((state: RootState) => state.productListReducer.products);

  const orders = useSelector((state: RootState) => state.orderListReducer.orders);
  const totalSales = useSelector((state: RootState) => state.orderListReducer.totalSales);

    useEffect(() => {
    dispatch(productListAction());
    dispatch(fetchTotalSalesAction());

  }, [dispatch]);

   const totalProductos = products?.length || 0;

  return (
    <NavbarSidebarLayout>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 p-4">
        {/* Sección de productos en stock */}
        <div className="bg-blue-500 text-white rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Total de Productos en Almacen: {totalProductos}</h2>
          </div>
          <p className="mt-2">Stock</p>
        </div>

        {/* Enlace al sitio web */}
        <div className="bg-yellow-500 text-white rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-bold">
            <a href="https://mex-shoes-client.vercel.app">tusitioweb.com</a>
          </h2>
          <p className="mt-2">Sitio Web</p>
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

export default DashboardPage;

