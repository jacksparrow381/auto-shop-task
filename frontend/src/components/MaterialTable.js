import React from "react";
import MaterialTable from "@material-table/core";
import AddCarDrawer from "./AddCarDrawer";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDeleteCarMutation, useGetCarsQuery } from "../service/VehicleApi";

const columns = [
  { title: "Name", field: "verhicle_name" },
  { title: "Category", field: "category" },
  { title: "Color", field: "color" },
  { title: "Price", field: "price" },
  { title: "Model", field: "model" },
  { title: "Make", field: "make" },
  { title: "Registration Number", field: "registration_number" },
];

export default function Table() {
  const [cars, setCars] = React.useState([]);
  const [editedRow, setEditedRow] = React.useState(null);

  const { data, isLoading, isSuccess, isError, error } = useGetCarsQuery();
  const [deleteCar] = useDeleteCarMutation();

  console.log(data, isLoading, isSuccess, isError, error);

  const [isOpen, setIsOpen] = React.useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleDelete = async (id) => {
    try {
      await deleteCar(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id) => {
    try {
      const editedCar = data.find((car) => car._id === id);
      setEditedRow(editedCar);
      setIsOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <AddCarDrawer
        editedRow={editedRow}
        isOpen={isOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
      <MaterialTable
        title="Registered Cars"
        options={{
          search: false,
          actionsColumnIndex: -1,
        }}
        columns={columns}
        data={data}
        actions={[
          {
            icon: EditIcon,
            tooltip: "Edit Car",
            onClick: (event, rowData) => handleEdit(rowData._id),
          },
          (rowData) => ({
            icon: DeleteIcon,
            tooltip: "Delete Car",
            onClick: (event, rowData) => handleDelete(rowData._id),
          }),
        ]}
      />
    </div>
  );
}
