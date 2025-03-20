/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Breadcrumb,
  Button,
  Label,
  Modal,
  Table,
  TextInput,
} from "flowbite-react";

import type { FC } from "react";

import { FaEdit, FaPlus } from "react-icons/fa";
import {
  HiHome,
  HiOutlineExclamationCircle,
  HiTrash,
} from "react-icons/hi";

import NavbarSidebarLayout from "../../layouts/navbar-sidebar";

import { useEffect, useState } from "react";
import { useAppDispatch } from "../../Redux/hook";
import { RootState } from "../../Redux/store";
import {
  addProductAction,
  updateProductAction,
  deleteProductAction,
  productListAction
} from "../../Redux/Actions/Product";

import {
  categorieListAction
} from "../../Redux/Actions/Categorias";

import {
  providerListAction
} from "../../Redux/Actions/Proveedores";

import { Product } from "../../Redux/types";
import { useDispatch, useSelector } from "react-redux";

const ProductosPage: FC = function () {
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
              Productos
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
              <ProductsTable products={products} />
            </div>
          </div>
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

export default ProductosPage;

 
const AddProductModal = () => {
  const [isOpen, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [provider, setProvider] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const dispatch = useAppDispatch();

  // Obtener categorías y proveedores desde el estado
  const { categories } = useSelector((state: RootState) => state.categorieListReducer);
  const { providers } = useSelector((state: RootState) => state.providerListReducer);

  useEffect(() => {
    // Cargar categorías y proveedores al abrir el modal
    dispatch(categorieListAction());
    dispatch(providerListAction());
  }, [dispatch]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]); // Guarda la imagen en el estado
    }
  };

  // Agregar producto
  const handleAddProduct = () => {
    if (!name || !price || !category || !provider) {
      alert("Todos los campos son obligatorios");
      return;
    }
  
    const newProduct = {
      name,
      price: Number(price), // Asegurar conversión a número
      category,
      provider,
      image,
    };
  
    dispatch(addProductAction(newProduct)); // Enviar datos limpios
    setOpen(false);
  };
  

  return (
    <>
      <Button color="primary" onClick={() => setOpen(!isOpen)}>
        <FaPlus className="mr-3 text-sm" />
        Añadir Producto
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen} className="overflow-auto">
        <Modal.Header className="border-b border-gray-200 dark:border-gray-700">
          <strong>Agregar Producto</strong>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <Label htmlFor="productName">Nombre</Label>
                <TextInput
                  placeholder="Nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="productPrice">Precio</Label>
                <TextInput
                  placeholder="Precio"
                  value={price}
                  type="Number"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              
              

              <div>
                  <Label htmlFor="productCategory">Categoría</Label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="block w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="">Seleccione una categoría</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}> {/* Usa cat._id como valor */}
                        {cat.name} {/* Muestra el nombre de la categoría */}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="productProvider">Proveedor</Label>
                  <select
                    value={provider}
                    onChange={(e) => setProvider(e.target.value)}
                    className="block w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="">Seleccione un proveedor</option>
                    {providers.map((prov) => (
                      <option key={prov._id} value={prov._id}> {/* Usa prov._id como valor */}
                        {prov.name} {/* Muestra el nombre del proveedor */}
                      </option>
                    ))}
                  </select>
                </div>



              <div>
                <Label htmlFor="productImage">Imagen</Label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
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
      await dispatch(deleteProductAction(product._id));
      setOpen(false);
      window.location.reload();
    }
  };

  return (
    <>
      <Button color="failure" onClick={() => setOpen(!isOpen)}>
        <HiTrash className="mr-2 text-lg" />
      </Button>

      <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
        <Modal.Header className="px-3 pt-3 pb-0">
          <span className="sr-only">Eliminar producto</span>
        </Modal.Header>
        <Modal.Body className="px-6 pb-6 pt-0">
          <div className="flex flex-col items-center gap-y-6 text-center">
            <HiOutlineExclamationCircle className="text-7xl text-red-600" />
            <p className="text-lg text-gray-500 dark:text-gray-300">
              ¿Seguro que quieres eliminar el producto?
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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (product) {
      setProductData(product);
    }
  }, [product]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]); // Guarda la nueva imagen seleccionada
    }
  };
  
  const handleUpdateProduct = async () => {
    const updatedData = { ...productData, image: imageFile || productData.image }; // Mantiene la imagen anterior si no se cambia
    if (updatedData._id) {
      await dispatch(updateProductAction(updatedData));
      await dispatch(productListAction());
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
              <Label>Precio</Label>
              <TextInput
                type="number"
                value={productData.price || ""}
                onChange={(e) => setProductData({ ...productData, price: Number(e.target.value) })}
              />
            </div>
            <div>
                <Label htmlFor="productImage">Imagen</Label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
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
        <Table.HeadCell>Precio</Table.HeadCell>
        <Table.HeadCell>Categoría</Table.HeadCell>
        <Table.HeadCell>Proveedor</Table.HeadCell>
        <Table.HeadCell>Acciones</Table.HeadCell>
      </Table.Head>
      <Table.Body>
        {products.map((product: Product) => (
          <Table.Row key={product._id}>
            <Table.Cell>{product._id}</Table.Cell>
            <Table.Cell>
                <img
                src={product.image ? `http://localhost:5000/uploads/products/${product.image}` : "/placeholder.jpg"}
                alt={product.name}
                className="w-16 h-16 object-cover rounded"
                />
            </Table.Cell>
            <Table.Cell>{product.name}</Table.Cell>
            <Table.Cell>{product.price}</Table.Cell>
            <Table.Cell>{product.category ? product.category.name : "Sin categoría"}</Table.Cell>
            <Table.Cell>{product.provider ? product.provider.name : "Sin proveedor"}</Table.Cell>
            <Table.Cell>
              <Button color="primary" onClick={() => handleEditClick(product)}>
                <FaEdit className="text-sm" />
              </Button>
              <DeleteProductModal product={product} />
            </Table.Cell>
          </Table.Row>
        ))}
        <EditProductModal product={selectedProduct} isOpen={isEditOpen} setOpen={setEditOpen} />
      </Table.Body>
    </Table>
  );
};