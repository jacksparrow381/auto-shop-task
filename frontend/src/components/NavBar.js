import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import CategoryIcon from "@mui/icons-material/Category";
import { Link } from "react-router-dom";
import axios from "axios";

const NavBar = () => {
  // get path from url
  const path = window.location.pathname;

  // handle logout
  const handleLogout = async () => {
    const response = await axios.post("http://localhost:5000/api/auth/logout", {
      withCredentials: true, // to send cookies
    });
    if (response.status === 200) {
      localStorage.removeItem("user-token");

      window.location.href = "/login";
    }
  };

  return (
    <Grid container>
      <Grid item sx={{ width: "100%" }}>
        <AppBar position="static">
          <Toolbar
            sx={{
              backgroundColor: "#2dba7a",
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Auto Vehicle App
            </Typography>
            <Grid
              sx={{ display: "flex", flexDirection: "row", columnGap: "20px" }}
            >
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mr: 2,
                }}
              >
                <CategoryIcon />
                <Typography
                  sx={{ fontSize: "10px" }}
                  variant="h6"
                  noWrap
                  component="div"
                >
                  <Link
                    to={path === "/category" ? "/home" : "/category"}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Go To {path === "/category" ? "Home" : "Category"}
                  </Link>
                </Typography>
              </Grid>
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mr: 2,
                }}
              >
                <LogoutIcon />
                <Typography
                  sx={{ fontSize: "10px", cursor: "pointer" }}
                  variant="h6"
                  noWrap
                  component="div"
                  onClick={handleLogout}
                >
                  Logout
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Grid>
    </Grid>
  );
};

export default NavBar;
