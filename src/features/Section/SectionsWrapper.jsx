import React from 'react';
import { Grid } from '@mui/material';

export default function Sections({ children, setNodeRef, isOver, ...props }) {
  return (
    <Grid
      {...props}
      ref={setNodeRef}
      sx={{
        padding: '30px 64px 44px 30px',
        background: (theme) => isOver ? theme.palette.secondary.$a8 : '',
        overflowY: 'auto',
        maxHeight: '100%',
      }}>
      {children}
    </Grid>
  );
}
