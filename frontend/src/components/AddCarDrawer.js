import React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import axios from "axios";
import {
  useCreateCarMutation,
  useUpdateCarMutation,
} from "../service/VehicleApi";

const validationSchema = Yup.object().shape({
  carName: Yup.string()
    .required("*Email is a required field")
    .email("Invalid email format"),
  carCategory: Yup.string()
    .required("*Password is a required field")
    .min(8, "*Password must be at least 8 characters"),
  carColor: Yup.string().required("*Color is a required field"),
  carPrice: Yup.number().required("*Price is a required field"),
  carModel: Yup.number().required("*Model is a required field"),
  carMake: Yup.string().required("*Make is a required field"),
  carRegistrationNumber: Yup.string().required(
    "*Registration Number is a required field"
  ),
});

export default function AddCarDrawer({
  editedRow,
  isOpen,
  handleOpen,
  handleClose,
}) {
  const [createCar] = useCreateCarMutation();
  const [updateCar] = useUpdateCarMutation();

  console.log(editedRow);

  return (
    <div>
      <Button onClick={handleOpen}>Add Car</Button>

      <Drawer open={isOpen} onClose={handleClose} anchor="right">
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            carName: editedRow ? editedRow.verhicle_name : "",
            carCategory: editedRow ? editedRow.category : "",
            carColor: editedRow ? editedRow.color : "",
            carPrice: editedRow ? editedRow.price : "",
            carModel: editedRow ? editedRow.model : "",
            carMake: editedRow ? editedRow.make : "",
            carRegistrationNumber: editedRow
              ? editedRow.registration_number
              : "",
          }}
          onSubmit={async (values) => {
            try {
              if (editedRow) {
                await updateCar({ id: editedRow._id, values });

                handleClose();
              } else {
                await createCar(values);
                handleClose();
              }
            } catch (error) {
              console.log(error);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Box
                  sx={{
                    width: 500,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    mr: 2,
                  }}
                >
                  <TextField
                    id="carName"
                    name="carName"
                    label="Car Name"
                    value={values.carName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.carName && Boolean(errors.carName)}
                    helperText={touched.carName && errors.carName}
                  />
                  <TextField
                    id="carCategory"
                    name="carCategory"
                    label="Car Category"
                    value={values.carCategory}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.carCategory && Boolean(errors.carCategory)}
                    helperText={touched.carCategory && errors.carCategory}
                  />
                  <TextField
                    id="carColor"
                    name="carColor"
                    label="Car Color"
                    value={values.carColor}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.carColor && Boolean(errors.carColor)}
                    helperText={touched.carColor && errors.carColor}
                  />
                  <TextField
                    id="carPrice"
                    name="carPrice"
                    label="Car Price"
                    value={values.carPrice}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.carPrice && Boolean(errors.carPrice)}
                    helperText={touched.carPrice && errors.carPrice}
                  />
                  <TextField
                    id="carModel"
                    name="carModel"
                    label="Car Model"
                    value={values.carModel}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.carModel && Boolean(errors.carModel)}
                    helperText={touched.carModel && errors.carModel}
                  />
                  <TextField
                    id="carMake"
                    name="carMake"
                    label="Car Make"
                    value={values.carMake}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.carMake && Boolean(errors.carMake)}
                    helperText={touched.carMake && errors.carMake}
                  />
                  <TextField
                    id="carRegistrationNumber"
                    name="carRegistrationNumber"
                    label="Car Registration Number"
                    value={values.carRegistrationNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.carRegistrationNumber &&
                      Boolean(errors.carRegistrationNumber)
                    }
                    helperText={
                      touched.carRegistrationNumber &&
                      errors.carRegistrationNumber
                    }
                  />

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button onClick={handleClose}>Close</Button>
                    <Button type="submit">Save</Button>
                  </Box>
                </Box>
              </form>
            );
          }}
        </Formik>
      </Drawer>
    </div>
  );
}
