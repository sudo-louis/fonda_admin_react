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

import { FC, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useAppDispatch } from "../../Redux/hook";
import { RootState } from "../../Redux/store";

 
 
const ProveedoresPage: FC = function () {
  
  return (
    <h1>hola mundo</h1>
  );
};

export default ProveedoresPage;

