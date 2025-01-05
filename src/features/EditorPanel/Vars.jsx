import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
} from '@mui/material';
import { InfoIcon } from '../../icons';

export default function Panel() {
  const [isHintOpen, setIsHintOpen] = useState(true);

  return (
    <Box sx={{
      p: 5,
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Typography variant="caption" color="dark.$80">
        List of variables
      </Typography>
      <Box sx={{
        display: isHintOpen ? 'flex' : 'none',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        mt: 4,
        p: '12px 16px 15px 14px',
        border: (theme) =>`1px solid ${theme.palette.dark.$8}`,
        borderRadius: 2,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, flex: '0 100%' }}>
          <InfoIcon sx={{ mr: 4 }} />
          <Typography variant="body13" lh="rich" color="dark.$60">
            You can use variables to prefill form fields with known values
          </Typography>
        </Box>
        <Button onClick={() => setIsHintOpen((hint) => !hint)} variant="ghost" sx={{ fontSize: 13, color: 'dark.$80' }}>
          Ok, close
        </Button>
      </Box>
    </Box>
  );
}
