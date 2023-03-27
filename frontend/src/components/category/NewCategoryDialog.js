import React from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "../../service/CategoryApi";

const validationSchema = Yup.object().shape({
  categoryName: Yup.string().required("*categoryName is a required field"),
});

export default function NewCategoryDialog({
  editedCategory,
  open,
  handleClose,
  handleOpen,
}) {
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  return (
    <div>
      <Button sx={{ mt: 2, ml: 3 }} variant="contained" onClick={handleOpen}>
        Create Category
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editedCategory ? "Edit" : "Add"} Category</DialogTitle>
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            categoryName: editedCategory?.category_name || "",
          }}
          onSubmit={async (values) => {
            try {
              if (editedCategory) {
                await updateCategory({
                  id: editedCategory._id,
                  values,
                });

                handleClose();
              } else {
                await createCategory(values);
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
                  }}
                >
                  <TextField
                    id="categoryName"
                    name="categoryName"
                    label="Category Name"
                    value={values.categoryName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.categoryName && Boolean(errors.categoryName)}
                    helperText={touched.categoryName && errors.categoryName}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      mb: 1,
                      mt: 1,
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
      </Dialog>
    </div>
  );
}
