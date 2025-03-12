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
  categorieListAction,
  addCategorieAction,
  updateCategorieAction,
  deleteCategorieAction
} from "../../Redux/Actions/Categorias";

import { Categorie } from "../../Redux/types";

import { useDispatch, useSelector } from "react-redux";

 
const CategoriasPage: FC = function () {
  
  const dispatch = useAppDispatch();
  // const { products } = useSelector((state: RootState) => state.productListReducer);
  
  const { categories } = useSelector((state: RootState) => state.categorieListReducer);

  useEffect(() => {
    dispatch(categorieListAction());
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
              <Breadcrumb.Item>Categorias</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Categorias
            </h1>
          </div>
          <div className="block items-center sm:flex">
             
            <div className="flex w-full items-center sm:justify-end">
              {/* <AddProductModal /> */}
              <AddCategorieModal />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <CategoriesTable categories={categories}/>          
            </div>
          </div>
        </div>
      </div>
     </NavbarSidebarLayout>
  );


};

export default CategoriasPage;


  
  const AddCategorieModal = () => {
    const [isOpen, setOpen] = useState(false);
    const [categorieData, setcategorieData] = useState<Partial<Categorie>>({
      name: "",
    });
  
    const dispatch = useAppDispatch();
  
    // Agregar producto
    const handleAddCategorie = () => {
      dispatch(addCategorieAction(categorieData));
      setOpen(false);
    };
  
    return (
      <>
        <Button color="primary" onClick={() => setOpen(!isOpen)}>
          <FaPlus className="mr-3 text-sm" />
          Añadir  Categoria
        </Button>
        <Modal
          onClose={() => setOpen(false)}
          show={isOpen}
          className="overflow-auto" // Ajustar altura máxima y permitir desplazamiento
        >
          <Modal.Header className="border-b border-gray-200 dark:border-gray-700">
            <strong>Agregar Categoria</strong>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Campos existentes */}
                <div>
                  <Label htmlFor="productName">Nombre</Label>
                  <TextInput
                    placeholder="Nombre"
                    value={categorieData.name || ""}
                    onChange={(e) =>
                      setcategorieData({ ...categorieData, name: e.target.value })
                    }
                  />
                </div>
 
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button color="primary" onClick={handleAddCategorie}>
              Añadir Categoria
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };
  
   interface DeleteCategorieModalProps {
    categorie: Categorie;
  }
  
  const DeleteCategorieModal: FC<DeleteCategorieModalProps> = ({ categorie }) => {
    const [isOpen, setOpen] = useState(false);
    const dispatch = useAppDispatch();

    const handleDelete = async () => {
      if (categorie._id) {
        // await dispatch(deleteCategorieAction({categorieData}));
        await dispatch(deleteCategorieAction(categorie._id));

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
            <span className="sr-only">Eliminar categoria</span>
          </Modal.Header>
          <Modal.Body className="px-6 pb-6 pt-0">
            <div className="flex flex-col items-center gap-y-6 text-center">
              <HiOutlineExclamationCircle className="text-7xl text-red-600" />
              <p className="text-lg text-gray-500 dark:text-gray-300">
                ¿Seguro que quieres dar de baja la categoria?
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

  interface EditCategorietModalProps {
    categorie: Categorie | null;
    isOpen: boolean;
    setOpen: (open: boolean) => void;
  }
  
  const EditCategorieModal: FC<EditCategorietModalProps> = ({ categorie, isOpen, setOpen }) => {
    const [categorieData, setCategorieData] = useState<Partial<Categorie>>(categorie || {});
    const dispatch = useAppDispatch();
  
    useEffect(() => {
      if (categorie) {
        setCategorieData(categorie);  
      }
    }, [categorie]);

    const handleUpdateProduct = async () => {
      if (categorieData._id) {
        await dispatch(updateCategorieAction(categorieData)); // Actualizar el producto en la base de datos
        await dispatch(categorieListAction()); // Refrescar la lista 
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
                  value={categorieData.name || ""}
                  onChange={(e) => setCategorieData({ ...categorieData, name: e.target.value })}
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
  
  const CategoriesTable = ({ categories }: { categories: Categorie[] }) => {
    
    const [selectedCategorie, setSelectedCategorie] = useState<Categorie | null>(null);
    
    const [isEditOpen, setEditOpen] = useState(false);
  
    const handleEditClick = (categorie: Categorie) => {
      setSelectedCategorie(categorie);
      setEditOpen(true);
    };  
    
    return (
 
      <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
        <Table.Head className="bg-gray-100 dark:bg-gray-700">
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Nombre</Table.HeadCell>
          <Table.HeadCell>Acciones</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
          {categories.map((categorie: Categorie) => (
            <Table.Row key={categorie._id} className="hover:bg-gray-100 dark:hover:bg-gray-700">

              <Table.Cell className="text-base font-semibold text-gray-900 dark:text-white">
                {categorie._id}
              </Table.Cell>
 
               <Table.Cell >
                <div className="text-base font-semibold text-gray-900 dark:text-white">
                  {categorie.name}
                </div>
              </Table.Cell>
 

              <Table.Cell className="whitespace-normal break-words p-4">
                {/* Alineación horizontal de los botones */}
                <div className="flex items-center space-x-2">
                  <Button color="primary" onClick={() => handleEditClick(categorie)}>
                    <FaEdit className="text-sm" />
                  </Button>
                  <DeleteCategorieModal categorie={categorie} />
                </div>
              </Table.Cell>
            </Table.Row>
          ))}

          {/* Modal de edición */}
          <div className="flex items-center gap-x-3">
            <EditCategorieModal categorie={selectedCategorie} isOpen={isEditOpen} setOpen={setEditOpen} />
          </div>
        </Table.Body>
      </Table>

    );
  };
  
  

