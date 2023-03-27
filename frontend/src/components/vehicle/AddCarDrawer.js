import React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import {
  useCreateCarMutation,
  useUpdateCarMutation,
} from "../../service/VehicleApi";
import { useGetCategoriesQuery } from "../../service/CategoryApi";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const validationSchema = Yup.object().shape({
  carName: Yup.string().required("*carName is a required field"),
  // carCategory: Yup.array(),
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
  const [createCar] = useCreateCarMutation(); // mutation to create a car
  const [updateCar] = useUpdateCarMutation(); // mutation to update a car
  const { data } = useGetCategoriesQuery(); // query to get all categories

  return (
    <div>
      <Button
        variant="contained"
        sx={{ mt: 2, mr: 3 }}
        onClick={handleOpen}
        startIcon={<LocalShippingIcon />}
      >
        Add Car
      </Button>

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
            console.log(values);
            try {
              if (editedRow) {
                await updateCar({ id: editedRow._id, values });

                handleClose(); // close the drawer and nullify the editedRow
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
            console.log(values);
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
                    sx={{ mt: 2, width: 400 }}
                  />
                  <FormControl
                    sx={{
                      mt: 2,
                      width: 400,
                    }}
                  >
                    <InputLabel id="carCategory">Car Category</InputLabel>
                    <Select
                      id="carCategory"
                      name="carCategory"
                      value={values.carCategory}
                      label="Car Category"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.carCategory && Boolean(errors.carCategory)}
                      helperText={touched.carCategory && errors.carCategory}
                    >
                      {data?.map((category) => (
                        <MenuItem value={category.category_name}>
                          {category.category_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {values.carCategory && (
                    <Box sx={{ width: 400 }}>
                      <TextField
                        id="carColor"
                        name="carColor"
                        label="Car Color"
                        value={values.carColor}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.carColor && Boolean(errors.carColor)}
                        helperText={touched.carColor && errors.carColor}
                        sx={{ mt: 2, width: 400 }}
                      />
                      <TextField
                        id="carPrice"
                        name="carPrice"
                        label="Car Price"
                        type={"number"}
                        value={values.carPrice}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.carPrice && Boolean(errors.carPrice)}
                        helperText={touched.carPrice && errors.carPrice}
                        sx={{ mt: 2, width: 400 }}
                      />
                      <TextField
                        id="carModel"
                        name="carModel"
                        type={"number"}
                        label="Car Model"
                        value={values.carModel}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.carModel && Boolean(errors.carModel)}
                        helperText={touched.carModel && errors.carModel}
                        sx={{ mt: 2, width: 400 }}
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
                        sx={{ mt: 2, width: 400 }}
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
                        sx={{ mt: 2, width: 400 }}
                      />
                    </Box>
                  )}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      mt: 2,
                      width: 400,
                    }}
                  >
                    <Button variant="contained" onClick={handleClose}>
                      Close
                    </Button>
                    <Button sx={{ ml: 2 }} variant="contained" type="submit">
                      Save
                    </Button>
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
