import React from 'react'
import {Drawer as MUIDrawer,
        List,
        ListItemButton,
        ListItemText} from '@mui/material';


export default function Drawer() {
  return (
    <MUIDrawer>
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItemButton
              key={text}
            >
              <ListItemText primary={text} />
            </ListItemButton>
          ))}
        </List>
    </MUIDrawer>
  )
}
