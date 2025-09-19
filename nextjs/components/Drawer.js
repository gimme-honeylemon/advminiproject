import * as React from 'react'; 
import Box from '@mui/material/Box'; 
import SwipeableDrawer from '@mui/material/SwipeableDrawer'; 
import Button from '@mui/material/Button'; 
import List from '@mui/material/List'; 
import Divider from '@mui/material/Divider'; 
import ListItem from '@mui/material/ListItem'; 
import ListItemButton from '@mui/material/ListItemButton'; 
import ListItemIcon from '@mui/material/ListItemIcon'; 
import ListItemText from '@mui/material/ListItemText'; 
import InboxIcon from '@mui/icons-material/MoveToInbox'; 
import MailIcon from '@mui/icons-material/Mail';

const list = (anchor) => (
  <Box
    sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
    role="presentation"
    onClick={toggleDrawer(anchor, false)}
    onKeyDown={toggleDrawer(anchor, false)}
  >
    {/* Horizontal menu */}
    <Box sx={{ display: 'flex', flexDirection: 'row', padding: 1 }}>
      {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
        <ListItemButton key={text} sx={{ minWidth: 'auto', marginRight: 2 }}>
          <ListItemIcon sx={{ minWidth: '30px' }}>
            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      ))}
    </Box>

    <Divider />

    <Box sx={{ display: 'flex', flexDirection: 'row', padding: 1 }}>
      {['All mail', 'Trash', 'Spam'].map((text, index) => (
        <ListItemButton key={text} sx={{ minWidth: 'auto', marginRight: 2 }}>
          <ListItemIcon sx={{ minWidth: '30px' }}>
            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      ))}
    </Box>
  </Box>
);
