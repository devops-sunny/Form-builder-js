import * as React from 'react';
import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import { Link, useLocation } from 'react-router-dom';
import {
  InfoIcon,
  EditIcon,
  CustomizingIcon,
  VarsIcon,
  SettingsIcon,
  FlowIcon,
  ClockIcon,
} from '../../icons';

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  width: theme.spacing(16),
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  '& .MuiDrawer-paper': {
    position: 'relative',
    borderRight: `1px solid ${theme.palette.dark.$8}`,
  },
  '& .MuiListItemButton-root': {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  '& .MuiIconButton-root': {
    padding: '10px',
    '&:hover': {
      backgroundColor: theme.palette.secondary.$a8,
    },
  },
}));

export default function MiniDrawer({ preview, templateData }) {
  const location = useLocation();
  return (
    <Drawer variant="permanent">
      <List disablePadding>
        {[
          { name: 'Info', icon: InfoIcon },
          { name: 'Edit', icon: EditIcon },
          { name: 'Customizing', icon: CustomizingIcon },
          { name: 'Vars', icon: VarsIcon },
          { name: 'Settings', icon: SettingsIcon },
          { name: 'Flow', icon: FlowIcon },
          { name: 'History', icon: ClockIcon },
        ].filter(({ name }) =>
          preview.isActive || ['sender'].includes(templateData.editorRole)
            ? ['Info', 'Flow'].includes(name)
            : ['creator'].includes(templateData.editorRole)
        ).map((obj) => (
          <Link
            key={obj.name}
            to={`/form-builder/${obj.name.toLowerCase()}`}
          >
            <ListItemButton
              disableRipple
              sx={{
                py: 1,
                minHeight: 40,
                justifyContent: 'center',
                px: 0,

              }}>
              <IconButton
                sx={{
                  backgroundColor: (theme) => `/form-builder/${obj.name.toLowerCase()}` === location.pathname ? theme.palette.secondary.$a8 : 'transparent'
                }}
                aria-label={obj.name}>
                <obj.icon />
              </IconButton>
            </ListItemButton>
          </Link>
        ))}
      </List>
    </Drawer>
  );
}
