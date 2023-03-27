import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "../../service/CategoryApi";
import NewCategoryDialog from "./NewCategoryDialog";
import NavBar from "../NavBar";

export default function Categories() {
  const [open, setOpen] = React.useState(false);

  const { data } = useGetCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [editCategory, setEditedCategory] = React.useState(null);

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id) => {
    const category = data.find((category) => category._id === id);
    setEditedCategory(category);
    setOpen(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setEditedCategory(null);
    setOpen(false);
  };

  return (
    <>
      <NavBar />
      <NewCategoryDialog
        editedCategory={editCategory}
        handleOpen={handleClickOpen}
        handleClose={handleClose}
        open={open}
      />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          p: 1,
          m: 1,
          bgcolor: "blue.100",
          gap: 1,
        }}
      >
        {data?.map((category) => (
          <Card sx={{ minWidth: 275, bgcolor: "#89a1e8" }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {category.category_name}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                size="small"
                onClick={() => handleEdit(category._id)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={() => handleDelete(category._id)}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </>
  );
}
