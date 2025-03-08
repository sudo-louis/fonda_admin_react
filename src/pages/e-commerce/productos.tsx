/* eslint-disable jsx-a11y/anchor-is-valid */
import {
    Breadcrumb,
    Button,
    Checkbox,
    Label,
    Modal,
    Table,
    Textarea,
    TextInput,
    Select
  } from "flowbite-react";
  
  import type { FC } from "react";
  
  import { FaEdit, FaPlus } from "react-icons/fa";
  import {
    HiCog,
    HiDotsVertical,
    HiExclamationCircle,
    HiHome,
    HiOutlineExclamationCircle,
    HiPencilAlt,
    HiTrash,
    HiUpload,
  } from "react-icons/hi";
  import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
  
  import { useEffect, useState } from "react";
  import { useAppDispatch } from "../../Redux/hook";
  import { RootState } from "../../Redux/store";
  import {
    productListAction,
    addProductAction,
    updateProductAction,
    updateProductStatusAction,
  } from "../../Redux/Actions/Product";

  import { Product } from "../../Redux/types";
  
  import { useDispatch, useSelector } from "react-redux";
  
   
  const enumSizes = [24,24.5,25,25.5,26,26.5,27,27.5,28,28.5,29,29.5];
  const enumBrand = ["Adidas","Nike","Puma","Reebok","Charly","Vans","Panam","Otras"];
  
  
  
  const EcommerceProductsPage: FC = function () {
  
    const dispatch = useAppDispatch();
    const { products } = useSelector((state: RootState) => state.productListReducer);
  
    useEffect(() => {
      dispatch(productListAction());
    }, [dispatch]);
  
    return (
      <NavbarSidebarLayout isFooter={false}>
        <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
          <div className="mb-1 w-full">
            <div className="mb-4">
              <Breadcrumb className="mb-4">
                <Breadcrumb.Item href="#">
                  <div className="flex items-center gap-x-3">
                    <HiHome className="text-xl" />
                    <span className="dark:text-white">Inicio</span>
                  </div>
                </Breadcrumb.Item> 
                <Breadcrumb.Item>Productos</Breadcrumb.Item>
              </Breadcrumb>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                Todos los productos
              </h1>
            </div>
            <div className="block items-center sm:flex">
               
              <div className="flex w-full items-center sm:justify-end">
                <AddProductModal />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden shadow">
                <ProductsTable products={products}/>          
              </div>
            </div>
          </div>
        </div>
       </NavbarSidebarLayout>
    );
  };
  
  
 
  const AddProductModal = () => {
    const [isOpen, setOpen] = useState(false);
    const [productData, setProductData] = useState<Partial<Product>>({
      name: "",
      image: "",
      price: 0,
      brand: "",
      sizes: [],
      countInStock: 0,
      description: "",
    });
  
    const dispatch = useAppDispatch();
  
    // Manejar el cambio de tamaño y cantidad
    const handleSizeChange = (size: number, quantity: number) => {
      const updatedSizes = [...(productData.sizes || [])];
      const existingSizeIndex = updatedSizes.findIndex((item) => item.size === size);
  
      if (existingSizeIndex !== -1) {
        updatedSizes[existingSizeIndex].quantity = quantity;
      } else {
        updatedSizes.push({ size, quantity });
      }
  
      const totalQuantity = updatedSizes.reduce((sum, item) => sum + (item.quantity || 0), 0);
  
      setProductData({ ...productData, sizes: updatedSizes, countInStock: totalQuantity });
    };
  
    // Agregar producto
    const handleAddProduct = () => {
      dispatch(addProductAction(productData));
      setOpen(false);
    };
  
    return (
      <>
        <Button color="primary" onClick={() => setOpen(!isOpen)}>
          <FaPlus className="mr-3 text-sm" />
          Añadir Producto
        </Button>
        <Modal
          onClose={() => setOpen(false)}
          show={isOpen}
          className="overflow-auto" // Ajustar altura máxima y permitir desplazamiento
        >
          <Modal.Header className="border-b border-gray-200 dark:border-gray-700">
            <strong>Agregar producto</strong>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Campos existentes */}
                <div>
                  <Label htmlFor="productName">Nombre</Label>
                  <TextInput
                    placeholder="Nombre"
                    value={productData.name || ""}
                    onChange={(e) =>
                      setProductData({ ...productData, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="productImage">Imagen</Label>
                  <TextInput
                    placeholder="URL de Imagen"
                    value={productData.image || ""}
                    onChange={(e) =>
                      setProductData({ ...productData, image: e.target.value })
                    }
                  />
                </div>
                {/* Tallas y cantidades */}
                <div className="lg:col-span-2">
                  <Label htmlFor="sizes">Tallas y Cantidades</Label>
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    {enumSizes.map((size) => (
                      <div key={size} className="flex flex-col items-start">
                        <Label>{size}</Label>
                        <TextInput
                          type="number"
                          placeholder="Cantidad"
                          min={0}
                          onChange={(e) =>
                            handleSizeChange(size, parseInt(e.target.value) || 0)
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
  
                <div>
                  <Label htmlFor="brand">Marca</Label>
                  <Select
                    value={productData.brand}
                    onChange={(e) =>
                      setProductData({ ...productData, brand: e.target.value })
                    }
                  >
                    <option value="">Seleccionar marca</option>
                    {enumBrand.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </Select>
                </div>
  
                {/* Otros campos */}
                <div>
                  <Label htmlFor="price">Precio</Label>
                  <TextInput
                    placeholder="1800"
                    type="number"
                    value={productData.price || ""}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        price: parseFloat(e.target.value),
                      })
                    }
                  />
                </div>
  
                <div>
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    placeholder="Detalles del producto"
                    value={productData.description || ""}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
  
                {/* Cantidad total automática */}
                <div>
                  <Label htmlFor="cantidad">Cantidad Total</Label>
                  <TextInput
                    id="countInStock"
                    name="countInStock"
                    type="number"
                    value={productData.countInStock || ""}
                    placeholder="Ejemplo: 10 unidades"
                    disabled
                  />
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button color="primary" onClick={handleAddProduct}>
              Añadir Producto
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };
  
  
  interface DeleteProductModalProps {
    product: Product;
  }
  
  const DeleteProductModal: FC<DeleteProductModalProps> = ({ product }) => {
    const [isOpen, setOpen] = useState(false);
    const dispatch = useAppDispatch();
  
    const handleDelete = async () => {
      if (product._id) {
        await dispatch(updateProductStatusAction({ ...product, status_Active: false }));
        setOpen(false); // Cerrar el modal después de la acción
        window.location.reload()
      }
    };
  
    return (
      <>
        {/* Botón que abre el modal */}
        <Button color="failure" onClick={() => setOpen(!isOpen)}>
          <HiTrash className="mr-2 text-lg" />
        </Button>
  
        {/* Modal de confirmación */}
        <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
          <Modal.Header className="px-3 pt-3 pb-0">
            <span className="sr-only">Eliminar producto</span>
          </Modal.Header>
          <Modal.Body className="px-6 pb-6 pt-0">
            <div className="flex flex-col items-center gap-y-6 text-center">
              <HiOutlineExclamationCircle className="text-7xl text-red-600" />
              <p className="text-lg text-gray-500 dark:text-gray-300">
                ¿Seguro que quieres dar de baja el producto?
              </p>
              <div className="flex items-center gap-x-3">
                <Button color="failure" onClick={handleDelete}>
                  Aceptar
                </Button>
                <Button color="gray" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  };
  
  interface EditProductModalProps {
    product: Product | null;
    isOpen: boolean;
    setOpen: (open: boolean) => void;
  }
  
  
  const EditProductModal: FC<EditProductModalProps> = ({ product, isOpen, setOpen }) => {
    const [productData, setProductData] = useState<Partial<Product>>(product || {});
    const dispatch = useAppDispatch();
  
    useEffect(() => {
      if (product) {
        setProductData(product);  
      }
    }, [product]);


    useEffect(() => {
      if (productData.sizes) {
        const totalQuantity = productData.sizes.reduce((total, item) => total + item.quantity, 0);
        setProductData((prev) => ({ ...prev, countInStock: totalQuantity }));
      }
    }, [productData.sizes]);

  
    
    const handleSizeChange = (size: number, quantity: number) => {
      const updatedSizes = [...(productData.sizes || [])];
      const existingSizeIndex = updatedSizes.findIndex((item) => item.size === size);
    
      if (existingSizeIndex !== -1 && updatedSizes[existingSizeIndex]) {
        if (quantity > 0) {
          // Actualizar cantidad existente
          updatedSizes[existingSizeIndex].quantity = quantity;
        } else {
          // Eliminar talla si cantidad es 0
          updatedSizes.splice(existingSizeIndex, 1);
        }
      } else if (quantity > 0) {
        // Agregar nueva talla
        updatedSizes.push({ size, quantity });
      }
    
      // Calcular la suma total de cantidades
      const totalQuantity = updatedSizes.reduce((total, item) => total + item.quantity, 0);
    
      // Actualizar el estado del producto con las tallas y el conteo total
      setProductData({ ...productData, sizes: updatedSizes, countInStock: totalQuantity });
    };
    

    const handleUpdateProduct = async () => {
      if (productData._id) {
        await dispatch(updateProductAction(productData)); // Actualizar el producto en la base de datos
        await dispatch(productListAction()); // Refrescar la lista de productos
        setOpen(false);
      }
    };
  
    return (
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header>
          <strong>Editar producto</strong>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <Label>Nombre</Label>
                <TextInput
                  value={productData.name || ""}
                  onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                />
              </div>
              <div>
                <Label>Imagen</Label>
                <TextInput
                  value={productData.image || ""}
                  onChange={(e) => setProductData({ ...productData, image: e.target.value })}
                />
              </div>
              <div>
                <Label>Marca</Label>
                <Select
                  value={productData.brand || ""}
                  onChange={(e) => setProductData({ ...productData, brand: e.target.value })}
                >
                  <option value="">Seleccionar marca</option>
                  {enumBrand.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label>Precio</Label>
                <TextInput
                  type="number"
                  value={productData.price || ""}
                  onChange={(e) => setProductData({ ...productData, price: parseFloat(e.target.value) })}
                />
              </div>
              <div className="lg:col-span-2">
                <Label>Tallas y Cantidades</Label>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  {enumSizes.map((size) => {
                    const existingSize = productData.sizes?.find((item) => item.size === size);
                    return (
                      <div key={size} className="flex flex-col items-start">
                        <Label>{size}</Label>
                        <TextInput
                          type="number"
                          placeholder="Cantidad"
                          min={0}
                          value={existingSize?.quantity || ""}
                          onChange={(e) =>
                            handleSizeChange(size, parseInt(e.target.value) || 0)
                          }
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <Label>Cantidad Total</Label>
                <TextInput
                  type="number"
                  value={productData.sizes?.reduce((total, item) => total + item.quantity, 0) || 0 }
                  // onChange={(e)=>setProductData({})}
                  onChange={(e) => setProductData({ ...productData,  countInStock: parseFloat(e.target.value) })}
                />
              </div>

              <div className="">
                <Label>Descripción</Label>
                <Textarea
                  rows={3}
                  value={productData.description || ""}
                  onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={handleUpdateProduct}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  









  
  const ProductsTable = ({ products }: { products: Product[] }) => {
    
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isEditOpen, setEditOpen] = useState(false);
  
    const handleEditClick = (product: Product) => {
      setSelectedProduct(product);
      setEditOpen(true);
    };  
    
    return (
 
      <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
        <Table.Head className="bg-gray-100 dark:bg-gray-700">
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Imagen</Table.HeadCell>
          <Table.HeadCell>Nombre</Table.HeadCell>
          <Table.HeadCell>Descripcion</Table.HeadCell>
          <Table.HeadCell>Marca</Table.HeadCell>
          <Table.HeadCell>Precio</Table.HeadCell>
          <Table.HeadCell>Tallas y Disponibilidad</Table.HeadCell>
          <Table.HeadCell>Stock Total</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Acciones</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
          {products.map((product: Product) => (
            <Table.Row key={product._id} className="hover:bg-gray-100 dark:hover:bg-gray-700">

              <Table.Cell className={product.status_Active  ? "whitespace-normal break-words p-4 text-base font-medium text-gray-900 dark:text-white": "text-gray-500 line-through"}>
                {product._id}
              </Table.Cell>

              <Table.Cell className="w-4 p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-16 w-16 object-cover rounded"
                />
              </Table.Cell>
      {/* className="whitespace-normal break-words p-4 text-sm font-normal text-gray-500 dark:text-gray-400" */}
              <Table.Cell >
                <div className={product.status_Active  ? "text-base font-semibold text-gray-900 dark:text-white": "text-gray-500 line-through"}  >
                  {product.name}
                </div>
              </Table.Cell>

              <Table.Cell className={product.status_Active  ? "whitespace-normal break-words p-4 text-base font-medium text-gray-900 dark:text-white": "text-gray-500 line-through"}>
                {product.description}
              </Table.Cell>

              <Table.Cell className={product.status_Active  ? "whitespace-normal break-words p-4 text-base font-medium text-gray-900 dark:text-white": "text-gray-500 line-through"}>
                {product.brand}
              </Table.Cell>

              <Table.Cell className={product.status_Active  ? "whitespace-normal break-words p-4 text-base font-medium text-gray-900 dark:text-white": "text-gray-500 line-through"}>
                {product.price}
              </Table.Cell>

              <Table.Cell className={product.status_Active ?  "whitespace-normal break-words p-4 text-base font-medium text-gray-900 dark:text-white"   : "text-gray-500 line-through"  }>
                
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-1 border border-gray-300  bg-gray-50"
                    >
                      <span className="font-bold text-gray-900">Talla: {item.size}</span>
                      <span className="text-gray-500">Stock: {item.quantity}</span>
                    </div>
                  ))}
                </div>
              </Table.Cell>

              <Table.Cell className={product.status_Active ?  "whitespace-normal break-words p-4 text-base font-medium text-gray-900 dark:text-white"   : "text-gray-500 line-through"  }>  
                {product.countInStock}
              </Table.Cell>

              <Table.Cell className="whitespace-normal break-words p-4 text-base font-medium text-gray-900 dark:text-white">
                {product.status_Active ? (
                  <div>
                    <p>Activo</p>
                  </div>
                ) : (
                  <div className="text-gray-500 line-through">
                    <p>Inactivo</p>
                  </div>
                )}
              </Table.Cell>

              <Table.Cell className="whitespace-normal break-words p-4">
                {/* Alineación horizontal de los botones */}
                <div className="flex items-center space-x-2">
                  <Button color="primary" onClick={() => handleEditClick(product)}>
                    <FaEdit className="text-sm" />
                  </Button>
                  <DeleteProductModal product={product} />
                </div>
              </Table.Cell>
            </Table.Row>
          ))}

          {/* Modal de edición */}
          <div className="flex items-center gap-x-3">
            <EditProductModal product={selectedProduct} isOpen={isEditOpen} setOpen={setEditOpen} />
          </div>
        </Table.Body>
      </Table>

    );
  };
  
  export default EcommerceProductsPage;
 