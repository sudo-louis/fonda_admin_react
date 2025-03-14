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

import { Provider } from "../../Redux/types";
import { useDispatch, useSelector } from "react-redux";

const ProveedoresPage: FC = function () {
  const dispatch = useAppDispatch();
  const { providers } = useSelector((state: RootState) => state.providerListReducer);

  useEffect(() => {
    dispatch(providerListAction());
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
              <Breadcrumb.Item>Proveedores</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Proveedores
            </h1>
          </div>
          <div className="block items-center sm:flex">
            <div className="flex w-full items-center sm:justify-end">
              <AddProviderModal />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <ProvidersTable providers={providers} />
            </div>
          </div>
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

export default ProveedoresPage;

 
const AddProviderModal = () => {
  const [isOpen, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const dispatch = useAppDispatch();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]); // Guarda la imagen en el estado
    }
  };

  // Agregar proveedor
  const handleAddProvider = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("contact", contact);
    if (image) {
      formData.append("image", image);
    }

    dispatch(addProviderAction(formData)); // Enviamos FormData en la acción
    setOpen(false);
  };

  return (
    <>
      <Button color="primary" onClick={() => setOpen(!isOpen)}>
        <FaPlus className="mr-3 text-sm" />
        Añadir Proveedor
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen} className="overflow-auto">
        <Modal.Header className="border-b border-gray-200 dark:border-gray-700">
          <strong>Agregar Proveedor</strong>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <Label htmlFor="providerName">Nombre</Label>
                <TextInput
                  placeholder="Nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="providerContact">Contacto</Label>
                <TextInput
                  placeholder="Contacto"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="providerImage">Imagen</Label>
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
          <Button color="primary" onClick={handleAddProvider}>
            Añadir Proveedor
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

interface DeleteProviderModalProps {
  provider: Provider;
}

const DeleteProviderModal: FC<DeleteProviderModalProps> = ({ provider }) => {
  const [isOpen, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    if (provider._id) {
      await dispatch(deleteProviderAction(provider._id));
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
          <span className="sr-only">Eliminar proveedor</span>
        </Modal.Header>
        <Modal.Body className="px-6 pb-6 pt-0">
          <div className="flex flex-col items-center gap-y-6 text-center">
            <HiOutlineExclamationCircle className="text-7xl text-red-600" />
            <p className="text-lg text-gray-500 dark:text-gray-300">
              ¿Seguro que quieres dar de baja el proveedor?
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

interface EditProviderModalProps {
  provider: Provider | null;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

const EditProviderModal: FC<EditProviderModalProps> = ({ provider, isOpen, setOpen }) => {
  const [providerData, setProviderData] = useState<Partial<Provider>>(provider || {});
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (provider) {
      setProviderData(provider);
    }
  }, [provider]);

  const handleUpdateProvider = async () => {
    if (providerData._id) {
      await dispatch(updateProviderAction(providerData));
      await dispatch(providerListAction());
      setOpen(false);
    }
  };

  return (
    <Modal onClose={() => setOpen(false)} show={isOpen}>
      <Modal.Header>
        <strong>Editar proveedor</strong>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <Label>Nombre</Label>
              <TextInput
                value={providerData.name || ""}
                onChange={(e) => setProviderData({ ...providerData, name: e.target.value })}
              />
            </div>
            <div>
              <Label>Contacto</Label>
              <TextInput
                value={providerData.contact || ""}
                onChange={(e) => setProviderData({ ...providerData, contact: e.target.value })}
              />
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button color="primary" onClick={handleUpdateProvider}>
          Guardar cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const ProvidersTable = ({ providers }: { providers: Provider[] }) => {
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [isEditOpen, setEditOpen] = useState(false);

  const handleEditClick = (provider: Provider) => {
    setSelectedProvider(provider);
    setEditOpen(true);
  };

  return (
    <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
      <Table.Head className="bg-gray-100 dark:bg-gray-700">
        <Table.HeadCell>ID</Table.HeadCell>
        <Table.HeadCell>Imagen</Table.HeadCell>
        <Table.HeadCell>Nombre</Table.HeadCell>
        <Table.HeadCell>Contacto</Table.HeadCell>
        <Table.HeadCell>Acciones</Table.HeadCell>
      </Table.Head>
      <Table.Body>
        {providers.map((provider: Provider) => (
          <Table.Row key={provider._id}>
            <Table.Cell>{provider._id}</Table.Cell>
            <Table.Cell>
                <img
                src={provider.image ? `http://localhost:5000/uploads/providers/${provider.image}` : "/placeholder.jpg"}
                alt={provider.name}
                className="w-16 h-16 object-cover rounded"
                />
            </Table.Cell>
            <Table.Cell>{provider.name}</Table.Cell>
            <Table.Cell>{provider.contact}</Table.Cell>
            <Table.Cell>
              <Button color="primary" onClick={() => handleEditClick(provider)}>
                <FaEdit className="text-sm" />
              </Button>
              <DeleteProviderModal provider={provider} />
            </Table.Cell>
          </Table.Row>
        ))}
        <EditProviderModal provider={selectedProvider} isOpen={isEditOpen} setOpen={setEditOpen} />
      </Table.Body>
    </Table>
  );
};
