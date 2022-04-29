import React from 'react'
import {Drawer as MUIDrawer,
        List,
        ListItemButton,
        ListItemText,
      ListItemIcon} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import InsightsIcon from '@mui/icons-material/Insights';
import { Link } from 'react-router-dom';

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
    }
  ]
  return (
    <MUIDrawer variant="permanent" style={{width: "200px"}}>
        <List>
          {itemList.map((item, index) => {
            const {text, icon, url} = item;
            return (
            <ListItemButton key={text} component={Link} to={"/" + url}>
            <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>

          )})}
        </List>
    </MUIDrawer>
  )
}

export default Drawer