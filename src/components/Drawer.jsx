import React from 'react'
import {Drawer as MUIDrawer,
        List,
        ListItemButton,
        ListItemText,
      ListItemIcon} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import InsightsIcon from '@mui/icons-material/Insights';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AlbumIcon from '@mui/icons-material/Album';
import MicExternalOnIcon from '@mui/icons-material/MicExternalOn';
import { Link, useLocation } from 'react-router-dom';
import Button from "@mui/material/Button";

function handleLogOutClick() {
    localStorage.removeItem('token');
    window.location.reload(false);
}

const Drawer = () => {
  const itemList = [
    {
      url: "userstable",
      icon: <PersonIcon/>,
      text: "Users"
    },
    {
      url: "metrics",
      icon: <InsightsIcon/>,
      text: "Metrics"
    },
    {
      url: "songs",
      icon: <MusicNoteIcon/>,
      text: "Songs"
    },
    {
      url: "albums",
      icon: <AlbumIcon/>,
      text: "Albums"
    },
    {
      url: "artists",
      icon: <MicExternalOnIcon/>,
      text: "Artists"
    }
  ]
  const {pathname} = useLocation()

  return (
    <MUIDrawer variant="permanent" style={{width: "140px"}}>
        <List>
          {itemList.map((item, index) => {
            const {text, icon, url} = item;
            return (
            <ListItemButton key={text} component={Link} to={"/" + url} selected={pathname.includes(("/" + url)) }>
            <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text}  />
            </ListItemButton>

          )})}
        </List>
          <Button variant="contained" onClick={()=>{handleLogOutClick()}} style={{ marginTop: "auto"}}>Log out</Button>
    </MUIDrawer>
  )
}

export default Drawer
