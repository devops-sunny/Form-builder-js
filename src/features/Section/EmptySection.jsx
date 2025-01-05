import React from 'react';
import { Typography, Paper } from '@mui/material';
import SectionsWrapper from './SectionsWrapper';

export default function EmptySection() {
  return (
    <SectionsWrapper>
      <Paper sx={{ padding: '24px' }}>
        <Typography variant="body13content">
          Start adding data section from your templates or create a document sections from scratch.
        </Typography>
        <Typography variant="body13content">
          Learn more how to create setups based on candidate categories.
        </Typography>
      </Paper>
    </SectionsWrapper>
  );
}
