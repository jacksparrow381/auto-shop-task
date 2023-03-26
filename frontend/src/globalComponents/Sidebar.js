import React from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Grid } from '@mui/material';

const Sidebar = () => {
  return (
    <Grid
      sx={{ width: 250 , display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}
    >
      <List>
      <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary={"All Categories"} />
            </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary={"All Cars"} />
            </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
      <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary={"Add Category"} />
            </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary={"Add Car"} />
            </ListItemButton>
        </ListItem>
      </List>
    </Grid>
  )
}

export default Sidebar;