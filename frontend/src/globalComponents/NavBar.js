import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { Grid } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import CategoryIcon from '@mui/icons-material/Category';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const NavBar = () => {
  return (
    <Grid container>
        <Grid item sx={{width:"100%"}}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          Auto Registration App
        </Typography>
        <Grid sx={{display:"flex", flexDirection:"row", columnGap:"20px"}}>
        <Grid sx={{display:"flex", flexDirection:"column", alignItems:"center", mr:2}}>
            <LocalShippingIcon />
            <Typography
            sx={{ fontSize:"10px", }}
          variant="h6"
          noWrap
          component="div"
         
        >
          Add Car
        </Typography>
        </Grid>
        <Grid sx={{display:"flex", flexDirection:"column", alignItems:"center", mr:2}}>
            <CategoryIcon />
            <Typography
            sx={{ fontSize:"10px", }}
          variant="h6"
          noWrap
          component="div"
         
        >
          Add Category
        </Typography>
        </Grid>
        <Grid sx={{display:"flex", flexDirection:"column", alignItems:"center", mr:2}}>
            <LogoutIcon />
            <Typography
            sx={{ fontSize:"10px", }}
          variant="h6"
          noWrap
          component="div"
         
        >
          Logout
        </Typography>
        </Grid>
        
        </Grid>
      </Toolbar>
    </AppBar>
  </Grid>
  </Grid>
  )
}

export default NavBar;

