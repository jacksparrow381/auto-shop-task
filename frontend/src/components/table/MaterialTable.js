import React from "react";
import MaterialTable from "@material-table/core";
import AddCarDrawer from "../vehicle/AddCarDrawer";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  useDeleteCarMutation,
  useGetCarsQuery,
} from "../../service/VehicleApi";
import { Box } from "@mui/system";

// define columns to be displayed in the table
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
  const [isOpen, setIsOpen] = React.useState(false); // state to control the drawer
  const [editedRow, setEditedRow] = React.useState(null); // state to control the edited row

  const { data } = useGetCarsQuery();
  const [deleteCar] = useDeleteCarMutation();

  const handleOpen = () => setIsOpen(true); // function to open the drawer

  // function to close the drawer
  const handleClose = () => {
    setEditedRow(null);
    setIsOpen(false);
  };

  // function to delete a car
  const handleDelete = async (id) => {
    try {
      await deleteCar(id);
    } catch (error) {
      console.log(error);
    }
  };

  // function to edit a car
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
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {/** drawer to add or edit a car */}
        <AddCarDrawer
          editedRow={editedRow}
          isOpen={isOpen}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
      </Box>
      {/** table to display the cars */}
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
    </Box>
  );
}
